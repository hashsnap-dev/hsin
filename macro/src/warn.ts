import {FoodWarn, FunctionalityMaterials, MapFoodMatsToMats} from "hsin";
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
import {getCollection, init, mongoInited} from "../lib/mongodb";
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
  const fw = getCollection<FoodWarn>("_food-warn");

  const [{data}] = getXlsx("data/$warns.xlsx");
  const warns = data.slice(1) as [string, string, string][];
  for (const [id, description, icon] of warns) {
    try {
      await fw.insertOne({
        id: +id,
        description,
        icon,
      });
    } catch (err) {
      console.log(err);
    }
  }
  process.exit();
};

main();
