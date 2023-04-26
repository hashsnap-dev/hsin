import { MapFoodMatsToMats } from "hsin";
import {
  syncForeignFoodList,
  syncForeignFoodDetail,
} from "../lib/crawl-foreign-food";
import {
  syncC003,
  syncFunctionalMaterials,
  syncI0030,
  syncI2790,
  syncIntegrationFoodList,
} from "../lib/foodsafety-api";
import { getCollection, init, mongoInited } from "../lib/mongodb";
import {
  syncEatTogether,
  syncFunctionalitiesByXlsx,
  syncFunctionalityDetail,
  syncMatsToEatTogether,
} from "../lib/xlsx";
init(); 
const main = async () => {
  await mongoInited.promise;
  await syncFunctionalitiesByXlsx();
  await syncFunctionalityDetail();

  process.exit();
};

main();
