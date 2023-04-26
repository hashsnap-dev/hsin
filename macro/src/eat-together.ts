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
  extraEatTogether,
  getCollection,
  init,
  mongoInited,
} from "../lib/mongodb";
import {
  getXlsx,
  parseMatsDetails,
  syncEatTogether,
  syncMats,
  syncMatsDescription,
  syncMatsToEatTogether,
} from "../lib/xlsx";
init();
const main = async () => {
  await mongoInited.promise;
  await syncEatTogether(); // * 의약품 병용섭취 정보 동기화
  await extraEatTogether();
  process.exit();
};

main();
