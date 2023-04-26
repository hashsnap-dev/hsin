import {MapFoodMatsToMats} from "hsin";
import {
  syncForeignFoodList,
  syncForeignFoodDetail,
} from "../lib/crawl-foreign-food";
import {
  syncC003,
  syncFunctionalMaterials,
  syncI0030,
  syncIntegrationFoodList,
} from "../lib/foodsafety-api";
import {
  getCollection,
  init,
  mongoInited,
  syncThumbnails,
  syncWarnToFood,
} from "../lib/mongodb";
import {syncEatTogether, syncMatsToEatTogether} from "../lib/xlsx";
init(); 
const main = async () => {
  await mongoInited.promise;

  await syncC003(); // * 국내 건기식 신고사항 현황
  await syncI0030(); // * 국내 건기식 품목제조신고(원재료) 저장

  await syncForeignFoodList(); // * 해외 건기식 리스트 저장
  await syncForeignFoodDetail(); // * 해외 건기식 리스트 상세정보 저장
  await syncFunctionalMaterials(); // * I0030 / _foreign-food-detail  기준으로 기능성원료 분류 후 _domestic-food-materials에 저장

  const mfm = getCollection<MapFoodMatsToMats>("_map-foodMats-to-mats");
  console.log(await mfm.find({no: {$size: 0}}).toArray()); // * 매핑되지 않은 원료이름 확인 후 매핑작업 ⚠

  await syncIntegrationFoodList(); // *
  await syncWarnToFood();
  await syncMatsToEatTogether(); // * 의약품 병용섭취 정보 원료 연결
  process.exit();
};

main();
