import * as cheerio from 'cheerio';
import FormData from 'form-data';
import fs from 'fs/promises';
import got from 'got/dist/source';
import ProgressBar from 'progress';
import { sleep } from './helper';
import { getCollection } from './mongodb';
import { ForeignFoodDetail, ForeignFoodList } from 'hsin';
 
export const syncForeignFoodList = async () => {
  const obj2Fd = (obj: {[key: string]: any}) => {
    const fd = new FormData();
    Object.keys(obj).map(key => fd.append(key, obj[key]));
    return fd;
  };
  
  let i = 1;
  let dupCount = 0;
  while (1) {
    const body = obj2Fd({
      page: i.toString(),
      limit: '1000',
      // totalCnt: '',
      dclPrductSeCd: '7',
      // prductNm: '',
      // srchNtncd: '',
      // srchHistNo: '',
      // rpsntItmNm: '',
      rpsntItmCd: '',
      // bsshNm: '',
      // ovsmnfstNm: '',
      srchStrtDt: '2014-01-01',
      // srchStrtDt: '2021-08-01',
      srchEndDt: `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${(new Date().getDate()).toString().padStart(2, '0')}`,
    });
    const res = await got.post('https://impfood.mfds.go.kr/CFCCC01F01/getList', {
      body,
      headers: {
        ...body.getHeaders(),
        'Content-Length': ''+body.getLengthSync(),
      }
    });

    const $ = cheerio.load(res.body, null, false);
    const texts = $('.board_list.auto_title tr').slice(1).map((idx, el) => {
      const as = $(el).children().children('a');
      const a = as.first();

      const [,bsnOfcName,prductKoreanNm,prductNm,ovsmnfstNm,procsDtm,mnfNtnnm,xportNtnnm] = as.map((i, el) => $(el).text());
      return {
        rcno: a?.attr('href')?.match(/\('(.+?)'\)/)?.[1],
        bsnOfcName,
        prductKoreanNm,
        prductNm,
        ovsmnfstNm,
        procsDtm,
        mnfNtnnm,
        xportNtnnm,
      };
    });
    // console.log(`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${(new Date().getDate()).toString().padStart(2, '0')}`);
    const list = [...texts] as ForeignFoodList[];
    
    if (!list?.[0]?.rcno) break;

    const collecton = await getCollection<ForeignFoodList>('_foreign-food-list');
    try {
      await collecton.insertMany(list, {ordered: false});
    } catch(err: any) {
      console.log(err.message);
      if (++dupCount > 10) {
        console.log('Insert duplicate occurrence 3 times. Probably, all data are entered.');
        break;
      }
    }
    console.log(i++, list.length);
  }
}; 

export const syncForeignFoodDetail = async () => {

  const ffl = getCollection<ForeignFoodList>('_foreign-food-list');
  const ffd = getCollection<ForeignFoodDetail>('_foreign-food-detail');
  const detailData = await ffd.find({}).toArray();
  
  const reportNoList = detailData.map(({rcno}) => rcno);
  const listData = await ffl.find({rcno: {$nin: reportNoList}}).toArray();
  const total = listData.length;

  const p = new ProgressBar('Sync [:bar] (:current/:total) :rate/bps :percent :etas', {
    complete: '=',
    incomplete: ' ',
    width: 20,
    total,
  });
  let dupCount = 0;
  while (listData.length) {
    try {

      const item = listData.shift() as ForeignFoodList;
      if (!item.rcno) continue;
      p.tick();
      const res = await got.get(`https://impfood.mfds.go.kr/CFCCC01F03?rcno=${item.rcno}`, {timeout: {request: 5000}}).json<ForeignFoodDetail>();
      await ffd.insertOne({...res, rcno: item.rcno});
    } catch (err: any) {
      console.log(err.message);
      if (++dupCount > 2) {
        console.log('Insert duplicate occurrence 3 times. Probably, all data are entered.');
        break;
      }
    }
  }
};