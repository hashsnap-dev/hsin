import { MapFoodMatsToMats } from "hsin";
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
  syncAllUrl,
  syncAllThumbnails,
} from "../lib/mongodb";
import { syncEatTogether, syncMatsToEatTogether } from "../lib/xlsx";
init();
const main = async () => {
  await mongoInited.promise;
  console.log('thumbnail 동기화');
  await syncAllThumbnails();
  console.log("url 동기화");
  await syncAllUrl();
  process.exit();
};

main();
