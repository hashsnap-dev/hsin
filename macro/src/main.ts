import {
  getFoodDetailHTML,
  getFoodList,
  parseFoodDetailHTML,
  syncFoodDetail,
  syncFoodDetailsByFoodList,
  syncFoodList,
} from "../lib/crawl-domestic-food";
import {
  getC003,
  getI0030,
  getI2790,
  syncC003,
  syncFunctionalMaterials,
  syncI0030,
  syncI0040,
  syncI2790,
  syncIntegrationFoodList,
} from "../lib/foodsafety-api";
import {
  ignoreError,
  parenthesisParse,
  ParenthesisPosition,
  toUnique,
} from "../lib/helper";
import {
  checkDupReportNo,
  extraEatTogether,
  fixIntegrationFoodList,
  getAllCrawlMaterials,
  getAllMaterials,
  getCollection,
  init,
  mongoInited,
  setMapFoodMatsToMats,
  syncIntegrationFoodListText,
  syncMatsCreatedDate,
  syncNutrientFunctionalities,
  syncThumbnails,
  syncWarnToFood,
} from "../lib/mongodb";
import {
  CrawlMaterials,
  DomesticFoodDetail,
  DomesticFoodList,
  FunctionalityMaterials,
  MapFoodMatsToMats,
  I0030,
  ProcessedMaterials,
  Functionalities,
  IntegrationFoodList,
  FoodRawMaterials,
  ForeignFoodDetail,
} from "hsin";

import {promises as fs} from "fs";
import {
  readMaterialMeta,
  getXlsx,
  parseMatsDetails,
  syncMats,
  MaterialMeta,
  preprocessMapFMatsToMats,
  syncMapFMatsToMats,
  syncMatByFiles,
  syncFunctionalitiesByXlsx,
  saveForeignFoodFunctionalityMaterialList,
  getForeignFoodFunctionalityMaterialList,
  syncFunctionalityMaterials2,
  syncFalseAdvertising,
  syncMatWarnIcons,
  checkPP,
  syncEatTogether,
  syncMatsToEatTogether,
  syncMatsDescription,
  syncStopSelling,
  syncWarn,
  syncFunctionalityDetail,
  syncFunctionalMaterialsUnit,
} from "../lib/xlsx";
import {
  getMaterialsList,
  syncMaterialList,
  syncMaterialsListParse,
} from "../lib/crawl-materials";
import {
  syncForeignFoodDetail,
  syncForeignFoodList,
} from "../lib/crawl-foreign-food";
import {
  getForeignBlockFood,
  getForeignReturnFoodList,
  syncForeignBlockFood,
  syncForeignReturnFood,
} from "../lib/crawl-foreign-bad-food";
import {getAllPostList, syncPostList} from "../lib/crawl-post-naver";
import {syncFunctionalityMaterialDescription} from "../lib/xlsx-populate";
import {syncPhotoUploader} from "../lib/sync-photo-uploader";
/*

* 국내 건기식 저장 프로세스
await syncC003(); // * 국내 건기식 신고사항 현황
await syncI0030(); // * 국내 건기식 품목제조신고(원재료) 저장
await syncFunctionalMaterials() // * I0030 기준으로 기능성원료 분류 후 _domestic-food-materials에 저장
setMapFoodMatsToMats(); // * 건기식의 원료이름과 실제 원료 매핑 콜렉션 설정
const mfm = getCollection<MapFoodMatsToMats>('_map-foodMats-to-mats');
console.log(mfm.find({no: {$size: 0}}).toArray()); // * 매핑되지 않은 원료이름 확인 후 매핑작업 ⚠

* _domestic-food-materials의 원료이름 중복없이 파일로 저작
const mats = await getAllMaterials(); 
await fs.writeFile('./fmatname.txt', mats.join('\n'));


* 해외 건기식 저장 프로세스
await syncForeignFoodList(); // * 해외 건기식 리스트 저장
await syncForeignFoodDetail(); // * 해외 건기식 리스트 상세정보 저장
* 해외 기능성원료 매핑
await getForeignFoodFunctionalityMaterialList(); // *해외 기능성원료 리스트 계산 및 합쳐진 기능성원료 분할
await saveForeignFoodFunctionalityMaterialList(); // *해외 기능성원료 리스트 저장
await syncMapFMatsToMatsByForeign(); // *매칭되지않는 원료이름 정리 후 저장
 
* 건기식 가능성 원료 연결 후 통합 저장
await syncIntegrationFoodList();

* 원료 크롤링
await syncMaterialList(); // * 원료 크롤링 및 동기화 _crawl-materials
fs.writeFile('./test.txt', [...new Set(await getAllCrawlMaterials())].sort().join('\n')); // * 원료 크롤링 후 원료 이름만 저장
syncMaterialsListParse // * 원료 파싱 후 동기화
exportMaterialsListParseToXlsx // * 파싱 결과 파일로 저장 -> 기능성 연결작업 필요

* 원료 저장 파일로 동기화
await syncFunctionalityMaterials2()

* 기능성 동기화
await syncFunctionalitiesByXlsx(); // * 기능성 리스트 동기화

* 해외직구 차단 식품 동기화
await syncForeignBlockFood();

* 해외직구 회수 판매중지 동기화
await syncForeignReturnFood();

* 허위과대광고 제품 동기화, 한번만 호출
await syncFalseAdvertising();

*/

init();

const main = async () => {
  try {
    await mongoInited.promise;

    // await saveForeignFoodFunctionalityMaterialList();

    // await syncMatByFiles();
    // await syncMapFMatsToMats(); // * 엑셀로 원료 이름 매핑
    // const mfm = getCollection<MapFoodMatsToMats>('_map-foodMats-to-mats');
    // console.log(await mfm.find({no: {$size: 0}}).toArray());

    // 네이버 포스트 동기화
    // await syncPostList();

    // 섭취시 주의사항 동기화
    // await syncMatWarnIcons(); // * 섭취시 주의사항 내용 동기화
    // await syncWarn();
    // await syncMatWarnIcons();
    // await checkPP();

    // await syncWarnToFood(); // * 섭취시 주의사항 건기식에 동기화
    // await syncThumbnails(); // 썸네일 동기화

    // await syncStopSelling(); // * 판매중지 동기화

    // console.log(await getMaterialsList(1));

    // await fixIntegrationFoodList()
    // console.log(await getFoodList(1).json());
    // console.log(await (await getFoodDetailHTML('20040020071414')).body);

    //
    // await syncNutrientFunctionalities();

    // console.log(await getI2790(1, 1000))

    // await syncFunctionalityDetail();

    // await syncIntegrationFoodListText(); // 건기식 검색정보 동기화 / 사용안함

    // await syncMatsCreatedDate();
    // await checkDupReportNo();

    // await syncFunctionalMaterialsUnit();

    // 시간입력
    // const fm = getCollection<FunctionalityMaterials>('_functionality-materials');
    // for (const item of await fm.find({}).toArray()) {
    //   if (!item.created_date) await fm.updateOne({_id: (item as any)._id}, {$set: {created_date: new Date('2021-03-01')}});
    // }

    // const fm = getCollection<FunctionalityMaterials>('_functionality-materials');
    // await syncFunctionalityMaterialDescription();
    // await checkPP();
    // await syncPhotoUploader();
    process.exit();
  } catch (error: any) {
    throw new Error(error);
  }
};
main();
