import { syncI2715 } from "../lib/foodsafety-api";
import { init, mongoInited } from "../lib/mongodb";
import { syncStopSelling, } from "../lib/xlsx";
init(); 
const main = async () => {
  await mongoInited.promise;
  await syncStopSelling();
  await syncI2715();
  // await syncI2810();
  process.exit();
};

main();
