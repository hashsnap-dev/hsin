import { FunctionalityMaterials, MapFoodMatsToMats } from "hsin";
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
import { getCollection, init, mongoInited } from "../lib/mongodb";
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
  const fm = getCollection<FunctionalityMaterials>("_functionality-materials");

  const [{ data }] = getXlsx("data/$materials.xlsx");
  const mats = data.slice(1) as [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ][];
  // 카테고리, 기능성번호, 제조사, 신고번호, 이름, 일일섭취량, 섭취시주의사항 번호, 인정폐지 (1), 인정취소 (1), 병용섭취 주의
  for (const [
    category,
    funcString,
    company,
    noString,
    name,
    unit,
    warnString,
    abolished,
    canceled,
    eatTogether,
    createdDate
  ] of mats) {
    const no = noString?.split(",") ??[];
    const func = funcString?.split(",")??[];
    const warn = warnString?.split(",")??[];


    if (category === "사용불가원료") {
      const item = await fm.findOne({ name });
      if (!item)
        await fm.insertOne({
          type: category,
          name,
          company,
          no: [],
          functionality: [],
          amount: "",
          warn: [],
          abolished: false,
          canceled: false,
          eatTogether: "",
          created_date: new Date(0),
          description: "",
          requirements: "",
        });
    } else {
      const item = await fm.findOne({ no: { $in: [no] } });
      if (!item)
        await fm.insertOne({
          type: category,
          name,
          company,
          no,
          functionality: func,
          amount: '',
          warn,
          abolished: !!abolished,
          canceled: !!canceled,
          eatTogether,
          created_date: new Date(createdDate),
          description: "",
          requirements: "",
          unit,
        });
    }
  }
  await syncMatsDescription();
  process.exit();
};

main();
