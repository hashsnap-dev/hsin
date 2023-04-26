import {IntegrationFoodList, MapFoodMatsToMats} from "hsin";
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
import {syncEatTogether, syncMatsToEatTogether} from "../lib/xlsx";
import os from "os";
import path from "path";
import xlsx from "node-xlsx";
import {writeFileSync} from "fs";
import {execSync} from "child_process";
const HOMEDIR = os.homedir();
const HSIN_DB = path.resolve(HOMEDIR, ".hsin-db");

init();
const main = async () => {
  await mongoInited.promise;
  const ifl = await getCollection<IntegrationFoodList>(
    "_integration-food-list"
  );
  const data: [string, string, string, string, number?][] = [
    ["국내/수입", "신고번호", "이름", "제조사", "조회수" as any],
  ];
  let i = 0;
  const cursor = ifl.find({});
  while (await cursor.hasNext()) {
    console.log(++i);
    const {type, report_no, name, company, views} =
      (await cursor.next()) as IntegrationFoodList;
    const t = type === "domestic" ? "국내" : "수입";
    data.push([t, report_no, name, company, views ?? 0]);
  }
  const buffer = xlsx.build([{name: "sheet", data}]);
  writeFileSync(
    path.resolve(HSIN_DB, Date.now() + "_food-export.xlsx"),
    Buffer.from(buffer)
  );
  execSync(`start ${HSIN_DB}`);
  process.exit();
};

main();
