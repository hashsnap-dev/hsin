import got from 'got/dist/source';
import { fdBody, ignoreError, parenthesisParse, ParenthesisPosition } from './helper';
import { getCollection, mongoInited } from './mongodb';
import { CrawlMaterials, ProcessedMaterials } from 'hsin';
import xlsx from 'node-xlsx';
import {promises as fs} from 'fs';
 
export const getMaterialsList = (i: number, total: number = 100) => {
  return got.post('https://www.foodsafetykorea.go.kr/portal/board/boardList.do', {
    body: fdBody({
      menu_no: '2660',
      menu_grp: 'MENU_NEW01',
      copyUrl: 'https://www.foodsafetykorea.go.kr:443/portal/board/board.do?menu_grp=MENU_NEW01&menu_no=2660',
      bbs_no: 'bbs987',
      ntctxt_no: '',
      ctgry_no: '',
      hrnk_ctgryno: '',
      keywrd: '',
      start_idx: i,
      first_idx: '',
      nticmatr_yn: 'N',
      bbs_type_cd: '01',
      ans_yn: 'N',
      paramType: '',
      idx_1: '',
      idx_2: '',
      ctgType: '',
      ctgryno: '',
      hrnkCtgryno: '',
      order_type: '01',
      ctgry_type_cd: 'CTG_TYPE01',
      list_img_use_yn: 'N',
      atch_file_posbl_yn: 'Y',
      cmt_yn: 'N',
      kword_use_yn: 'N',
      natn_cd_use_yn: 'N',
      tag_use_yn: 'N',
      meta_use_yn: 'N',
      search_type: 'title',
      search_keyword: '',
      show_cnt: total,
      filePath: '',
      fileName: '',
      orgFileName: '',
      file_type_cd: '',
      ecm_file_no: '',
    }),
    timeout : {request : 50000},
  });
};

export const syncMaterialList = async () => {
  await mongoInited.promise;
  
  let end = false;
  let i = 0;
  let dupCount = 0;
  while (!end) {
    console.log(++i);
    await ignoreError(async () => {
      const {list} = await getMaterialsList(i, 100).json() as any;
      // console.log(list)
      if (!list.length) end = true;
      
      const cm = getCollection<CrawlMaterials>('_crawl-materials');
      try {
        await cm.insertMany(list, {ordered: false});
      } catch (err: any) {
        console.log(err.message);
        if (++dupCount > 2) {
          console.log('Insert duplicate occurrence 3 times. Probably, all data are entered.');
          end = true;
        }
      }
    });
  }
}

export const syncMaterialsListParse = async () => {
  await mongoInited.promise;

  // 크롤링한 원료 리스트 신고번호, 이름, 회사, 카테고리 정리
  const cm = getCollection<CrawlMaterials>('_crawl-materials');
  const pm = getCollection<ProcessedMaterials>('_processed-materials');
  const insertedNumbers = await pm.find({}).map(({ntctxt_no}) => ntctxt_no).toArray();
  const materials = await cm.find({ntctxt_no: {$nin: insertedNumbers}}).toArray();

  const prefixTitlMap = (titl: string) => {
    const incorrectTitls = `
    로즈마리자몽추출복합물((Nutroxsun)((주)네추럴에프앤피, 제2019-25호)\\로즈마리자몽추출복합물(Nutroxsun)((주)네추럴에프앤피, 제2019-25호)
    Lactobacillus acidophilus YT1(HU038)(주)휴온스내츄럴, 제2019-22호)\\Lactobacillus acidophilus YT1(HU038)((주)휴온스내츄럴, 제2019-22호)
    연어이리추출물(PRP연어핵산)(주)파마리서치프로덕트, 제2019-5호)\\연어이리추출물(PRP연어핵산)((주)파마리서치프로덕트, 제2019-5호)
    피엘에이지(PLAG, 1-palmitoyl-2-linoleoyl-3-acetyl-rac-glycerol)(㈜엔지켐생명과학, 제2013-35호))\\피엘에이지(PLAG, 1-palmitoyl-2-linoleoyl-3-acetyl-rac-glycerol)(㈜엔지켐생명과학, 제2013-35호)
    창녕양파추출액(우포의 아침㈜), 제2010-38호)\\창녕양파추출액(우포의 아침㈜, 제2010-38호)
    B. breve IDCC 4401(BBR4401) 열처리배양건조물[일동제약(주)안성공장, 제2021-5호]\\B. breve IDCC 4401(BBR4401) 열처리배양건조물(일동제약(주)안성공장, 제2021-5호)
    원화(？花)\\원화(芫花)
    천초근(？草根)\\천초근(茜草根)
    빈랑자(檳？子)\\빈랑자(檳榔子)
    [인정폐지]프로바이오틱스 ATP(㈜쎌바이오텍 1,2공장, 제2014-16호)\\[인정폐지]프로바이오틱스 ATP(㈜쎌바이오텍 1·2공장, 제2014-16호)`;
    const titlMap: {[key: string]: string} = Object.fromEntries(incorrectTitls.trim().split('\n').map(str => str.trim().split('\\')));
    return titlMap[titl] ?? titl;
  };
  const resultMaterials = materials.flatMap<ProcessedMaterials>(({titl, ctgrynm, ntctxt_no}) => {
    titl = prefixTitlMap(titl).trim();

    if (ctgrynm === '영양소') {
      const no = titl.match(/^(\d+?-\d+?) /)?.[1] as string;
      return {ntctxt_no, no: [no], type: '고시형원료-영양소', titl: titl.replace(/^\d+?-\d+? /, ''), company: '', abolished: false, canceled: false};
    } else if (ctgrynm === '기능성 원료') {
      const no = titl.match(/^(\d+?-\d+?) /)?.[1] as string;
      return {ntctxt_no, no: [no], type: '고시형원료-기능성원료', titl: titl.replace(/^\d+?-\d+? /, ''), company: '', abolished: false, canceled: false};
    } else if (ctgrynm === '개별인정원료') {
      try {
        let abolished = false;
        let canceled = false;
        const [start, end] = parenthesisParse(titl).pop() as ParenthesisPosition;
        const result = titl.substring(start + 1, end);
        if (result.length < 4) throw new Error('Something invalid!');
        const splitedResult = result.split(',').map(str => str.trim());
        const reportNumberForCompany = splitedResult.reduce(([map, lastKey]: any, val) => {
          if (/^[^0-9\-]?\d{4}-\d{1,2}[^0-9\-]?$/.test(val)) { // 신고번호인 경우
            map[lastKey].push(val.replace(/[^0-9\-]/g, ''));
          } else { // 키인 경우
            lastKey = val;
            map[lastKey] = [];
          }

          return [map, lastKey];
        }, [{}, ''] as [{[key: string]: string[]}, string]);
        titl = titl.slice(0, start).trim();

        if (/^\[(인정폐지)|(인정취소)\]/.test(titl)) {
          titl = titl.slice(6).trim();
          if (titl.indexOf('[인정폐지]') === 0) abolished = true;
          else if (titl.indexOf('[인정취소]') === 0) canceled = true;
        }

        const reportNumberForCompanyEntries: [string, string[]][] = Object.entries(reportNumberForCompany[0]);
        return reportNumberForCompanyEntries.map(([company, no]) => {
          return {ntctxt_no, no, type: '개별인정원료', titl, company, abolished, canceled};
        });
      } catch (err) {
        console.log(titl);
      }
      return {ntctxt_no, no: [], type: '개별인정원료', titl: '', company: '', abolished: false, canceled: false};
    } else if (ctgrynm === '사용불가 원료') {
      return {ntctxt_no, no: [], type: '사용불가원료', titl, company: '', abolished: false, canceled: false};
    } else {
      throw new Error('잘못된 타입');
      return {ntctxt_no, no: [], type: '개별인정원료', titl, company: '', abolished: false, canceled: false};
    }
    
  });

  await pm.insertMany(resultMaterials);
};

export const exportMaterialsListParseToXlsx = async () => {
  await mongoInited.promise;
  const pm = getCollection<ProcessedMaterials>('_processed-materials');
  const mats = await pm.find({}).toArray();
  const data = [['카테고리', '제조사', '신고번호', '이름'], ...mats.map(({type, company, titl, no}) => [type, company, no.join(','), titl])];
  const ab = xlsx.build([{name: 'default', data}]);
  await fs.writeFile('./mats_details.xlsx', Buffer.from(new Uint8Array(ab)));
};