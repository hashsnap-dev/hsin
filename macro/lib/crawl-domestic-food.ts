import got from 'got/dist/source';
import {fdBody, ignoreError, mkFunc} from './helper';
import { getCollection, mongoInited } from './mongodb';
import { DomesticFoodDetail, DomesticFoodList } from 'hsin';


export const getFoodList = (i: number, total = 100) => {
  return got.post('https://www.foodsafetykorea.go.kr/portal/healthyfoodlife/searchHomeHFProc.do', {
    body: fdBody({
      menu_no: '2823',
      menu_grp: "MENU_NEW01",
      search_code: '01',
      search_word: "",
      start_idx: i,
      show_cnt: total,
    }),
    timeout : {request : 5000},
  });
};
/**
 * @deprecated
 */
export const syncFoodList = mkFunc(async () => {
  await mongoInited.promise;
  let i = 1;
  while (1) {
    const res = await getFoodList(i++, 10000).json() as DomesticFoodList[];
    const collecton = getCollection<DomesticFoodList>('_domestic-food-list');
    try {
      await collecton.insertMany(res, {ordered: false});
    } catch(err: any) {
      // console.log(err.message);
    }
    if (!res.length) break;
  }
  console.log('end');
});
/**
 * @deprecated 
 */
export const getFoodDetailHTML = (reportNo: string) => {
  return got.post('https://www.foodsafetykorea.go.kr/portal/healthyfoodlife/searchHomeHFDetail.do', {
    body: fdBody({
      prdlstReportLedgNo: reportNo,
      search_word: "",
      search_code: "01",
      start_idx: "1",
      menu_no: "2823",
      menu_grp: "MENU_NEW01",
    }),
    timeout : {request : 5000},
  });
};

export const parseFoodDetailHTML = (html: string) => {
  const table = html.match(/<\/tr>[\t\r\n]+?<\/thead>[\t\r\n]+?<tbody>[\t\r\n]+?<tr>([^]+?$)/)?.[0]
  .match(/<th scope="row">([^]+?)<\/th>[^]+?<td>([^]*?)<\/td>/g)?.map((str) =>
    str.match(/<th scope="row">([^]+?)<\/th>[^]+?<td>([^]*?)<\/td>/)?.slice(1)
    .map(str => str.replace(/<br ?\/?>/g, '\n').trim())
  ) as string[][];
  const prdlst_report_no = html.match(
    /id="prdlst_report_no".+?value="(\d+)"/
  )?.[1] as string;

  if (table.length !== 12) {
    const data = table.splice(9, 1);
    table.splice(9, 0, [data[0] as any, data[1] as any], [data[4] as any, data[5] as any]);
  }
  
  const defaultData: DomesticFoodDetail & {prdlst_report_no: string} = {
    maker: table[0][1],
    food_name: table[1][1],
    report_number: table[2][1],
    registration_date: table[3][1],
    expiration: table[4][1],
    properties: table[5][1],
    how_to_eat: table[6][1],
    package: table[7][1],
    storage_precautions: table[8][1],
    ingestion_precautions: table[9][1],
    functionality: table[10][1],
    standard: table[11][1],
    prdlst_report_no,
  };
  return defaultData;
};
export const syncFoodDetail = async (data: DomesticFoodDetail) => {
  await mongoInited.promise;
  const collecton = getCollection<DomesticFoodDetail>('_domestic-food-detail');
  await collecton.insertOne(data);
};

export const syncFoodDetailsByFoodList = async (size: number = 100) => {
  await mongoInited.promise;

  const dfl = getCollection<DomesticFoodList>('_domestic-food-list');
  const dfd = getCollection<DomesticFoodDetail>('_domestic-food-detail');
  const detailData = await dfd.find({}).toArray();
  
  const reportNoList = detailData.map(({report_number}) => report_number);
  const listData = await dfl.find({prdlst_report_no: {$nin: reportNoList}}).toArray();
  
  const max = listData.length;
  let i = 0;

  const worker = async (wid: number) => {
    while (listData.length) {
      const {prdlst_report_ledg_no} = listData.shift() as DomesticFoodList;
      console.log(`[worker ${wid}]: ${++i}/${max}`);
      await ignoreError(async () => {
        const body = (await getFoodDetailHTML(prdlst_report_ledg_no)).body;
        const obj = parseFoodDetailHTML(body);
        await syncFoodDetail(obj);
      });
    }
  }
  await Promise.all(Array.from({length: size}, (_, i) => worker(i)));
}