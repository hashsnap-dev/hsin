import { MapFoodMatsToMats } from "hsin";
import { syncForeignFoodList, syncForeignFoodDetail } from "../lib/crawl-foreign-food";
import { syncC003, syncFunctionalMaterials, syncI0030, syncI2790, syncIntegrationFoodList } from "../lib/foodsafety-api";
import { getCollection, init, mongoInited } from "../lib/mongodb";
import { syncEatTogether, syncMatsToEatTogether } from "../lib/xlsx";
init()
const  main = async () => {
    await mongoInited.promise;
    await syncI2790();

    process.exit();
}

main(); 