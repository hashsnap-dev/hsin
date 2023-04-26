import got, { CancelableRequest } from 'got/dist/source'
import { ForeignBlockFoodList, ForeignReturnFoodList } from 'hsin';
import { getCollection } from './mongodb';
 
interface ForeignBlockFoodListResponse {
  list: {
    fileName: string; // 파일 이름
    fileExt: string; // 파일 확장자
    appGroup: string;
    servFileName: null;
    appKeys: string;
    iemCtntNm9: null;
    iemCtntNm7: null;
    svrFileName: null;
    iemCtntNm8: null;
    inqireCcnt: number;
    alfrescoKey: null;
    iemCtntNm20: null;
    cntcKyval: string;
    registDtm: number; // 등록일 now
    rownum: number;
    iemCtntNm5: null;
    iemCtntNm6: null;
    iemCtntNm3: string; // 검출 성분
    iemCtntNm4: string; 
    iemCtntNm1: string; // 제조국가
    rn: 1;
    iemCtntNm2: string; // 제조회사
    servFilePath: string; // 이미지 주소
    iemCtntNm12: null;
    iemCtntNm13: null;
    iemCtntNm14: null;
    iemCtntNm15: null;
    registDtmYmd: string; // 등록일 포멧
    iemCtntNm16: null;
    iemCtntNm17: null;
    atcflSeKey: null;
    iemCtnt9: null;
    iemCtntNm18: null;
    iemCtnt8: null;
    iemCtntNm19: null;
    iemCtnt19: null;
    fileSeq: number;
    atcflKey: null;
    iemCtntNm10: null;
    iemCtntNm11: null;
    cntntsCtnt: null;
    iemCtnt13: null;
    iemCtnt14: null;
    iemCtnt11: null;
    iemCtnt12: null;
    iemCtnt17: null;
    iemCtnt18: null;
    iemCtnt15: null;
    iemCtnt16: null;
    iemCtnt7: null;
    cntntsMngId: string;
    iemCtnt6: null;
    cntntsUpperSn: null;
    iemCtnt5: null;
    iemCtnt4: string;
    iemCtnt3: string;
    iemCtnt2: string; // 제조회사
    iemCtnt10: null;
    iemCtnt1: string; // 제조국가
    cntntsSj: string; // 제품 이름
    wrterNm: null;
    cntntsSn: number; // 아이디로 추정됨
    length: number;
    imageIncode: string; // 이미지 주소
    othbcYn: string;
    updtDtm: number;
    iemCtnt20: null;
  }[];
}
export const getForeignBlockFood = (i: number, limit: number = 100) => {
  // console.log(`https://impfood.mfds.go.kr/CFCBB02F01/getCntntsList?page=${i}&limit=${limit}&cntntsSn=&searchCondition=all&searchInpText=`);
  
  return got.get(`https://impfood.mfds.go.kr/CFCBB02F01/getCntntsList?page=${i}&limit=${limit}&cntntsSn=&searchCondition=all&searchInpText=`, {
    headers: {
      Accept: 'application/json',
    },
    timeout : {request : 5000},
  }).json() as CancelableRequest<ForeignBlockFoodListResponse>;
};

export const syncForeignBlockFood = async () => {
  const collecton = await getCollection<ForeignBlockFoodList>('_foreign-block-food-list');
  let i = 1;
  while (1) {
    try {
      const {list} = await getForeignBlockFood(i, 1000);
      if (!list.length) break;
      try {
        await collecton.insertMany(list, {ordered: false});
      } catch (err: any) {console.log(err.message);}
      i++;
    } catch (err: any) {
      console.log(err.message);
    }
  }
};


export interface ForeignReturnFoodListResponse {
  list: {
    fileName: string; // 파일이름
    fileExt: string; // 확장자
    appGroup: string;
    servFileName: null;
    appKeys: string;
    iemCtntNm9: string;
    iemCtntNm7: string; // 회수 방법
    svrFileName: null;
    iemCtntNm8: string; // 사람이름.. 회수자일듯?
    inqireCcnt: number;
    alfrescoKey: null;
    iemCtntNm20: null;
    cntcKyval: string;
    registDtm: number; // 등록일자 now
    rownum: number;
    iemCtntNm5: string; // 유통기한
    iemCtntNm6: string; // 회수 사유
    iemCtntNm3: string; // 유통기한
    iemCtntNm4: null,
    iemCtntNm1: '건강기능식품'; // 식품분류
    rn: number,
    iemCtntNm2: string; // 제조사
    servFilePath: string; // 이미지 주소
    iemCtntNm12: string; // 포장단위
    iemCtntNm13: string; // 회수등급
    iemCtntNm14: string;
    iemCtntNm15: string; // 유통기한
    registDtmYmd: string; // 등록일자
    iemCtntNm16: string; // 등록일자
    iemCtntNm17: string;
    atcflSeKey: null;
    iemCtnt9: string; // 영업등록번호
    iemCtntNm18: null;
    iemCtnt8: string; // 사람이름, 회수담당자?
    iemCtntNm19: null;
    iemCtnt19: null;
    fileSeq: number;
    atcflKey: null;
    iemCtntNm10: string; // 영업자주소
    iemCtntNm11: string; // 바코드 번호
    cntntsCtnt: null,
    iemCtnt13: string;
    iemCtnt14: string;
    iemCtnt11: string; // 바코드 번호
    iemCtnt12: string; // 포장단위
    iemCtnt17: string; // 회수 등급
    iemCtnt18: null;
    iemCtnt15: string; // 유통기한
    iemCtnt16: string; // 등록일자
    iemCtnt7: string; // 회수방법
    cntntsMngId: string;
    iemCtnt6: string; // 회수사유
    cntntsUpperSn: null;
    iemCtnt5: string; // 유통기한
    iemCtnt4: null;
    iemCtnt3: string; // 유통기한
    iemCtnt2: string; // 회수 영업자
    iemCtnt10: string; // 영업자 주소
    iemCtnt1: string;
    cntntsSj: string; // 제품명
    wrterNm: string; // 담당부서
    cntntsSn: number; // 상세정보 링크
    length: number;
    imageIncode: string; // 이미지 링크
    othbcYn: string;
    updtDtm: number; // 업데이트 날짜 now
    iemCtnt20: null;
  }[];
}
export const getForeignReturnFoodList = (i: number, limit: number = 100) => {
  return got.get(`https://impfood.mfds.go.kr/CFCFF01F01/getCntntsList?cntntsSn=&page=${i}&limit=${limit}&gbn=N&searchCondition=fdClass&searchInpText=%EA%B1%B4%EA%B0%95%EA%B8%B0%EB%8A%A5%EC%8B%9D%ED%92%88&btnSearch=`, {
    headers: {
      Accept: 'application/json',
    },
    timeout : {request : 5000},
  }).json() as CancelableRequest<ForeignReturnFoodListResponse>;
};

export const syncForeignReturnFood = async () => {
  const collecton = await getCollection<ForeignReturnFoodList>('_foreign-return-food-list');
  let i = 1;
  while (1) {
    try {
      const {list} = await getForeignReturnFoodList(i, 100);
      if (!list.length) break;
      try {
        await collecton.insertMany(list, {ordered: false});
      } catch (err: any) {console.log(err.message);}
      i++;
    } catch (err: any) {
      console.log(err.message);
    }
  }
};