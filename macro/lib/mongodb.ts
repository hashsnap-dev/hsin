import { MongoClient } from "mongodb";
import {
  C003,
  CrawlMaterials,
  DomesticFoodDetail,
  DomesticFoodList,
  FoodRawMaterials,
  EatTogether,
  FoodWarn,
  ForeignBlockFoodList,
  ForeignFoodDetail,
  ForeignFoodList,
  ForeignReturnFoodList,
  Functionalities,
  FunctionalityMaterials,
  I0030,
  I0040,
  I2790,
  IntegrationFoodList,
  MapFoodMatsToMats,
  NaverPosts as NaverPosts,
  ProcessedMaterials,
  StopSelling,
  I2810,
  I2715,
} from "hsin";
import { toUnique } from "./helper";
import { getXlsx } from "./xlsx";
const url = "mongodb://127.0.0.1:27017";
export const client = new MongoClient(url);
const db = client.db("hsin");

const NO_INIT = Symbol();

export const init = async () => {
  let resolve: any;
  mongoInited.promise = new Promise((res) => (resolve = res));
  const connection = await client.connect();
  const ifl = await getCollection<IntegrationFoodList>(
    "_integration-food-list"
  );
  const dfl = await getCollection<DomesticFoodList>("_domestic-food-list");
  const dfd = await getCollection<DomesticFoodDetail>("_domestic-food-detail");
  const ffl = await getCollection<ForeignFoodList>("_foreign-food-list");
  const ffd = await getCollection<ForeignFoodDetail>("_foreign-food-detail");
  const fbfl = await getCollection<ForeignBlockFoodList>(
    "_foreign-block-food-list"
  );
  const frfl = await getCollection<ForeignReturnFoodList>(
    "_foreign-return-food-list"
  );
  const i0030 = await getCollection<I0030>("I0030");
  const i0040 = await getCollection<I0040>("I0040");
  const i2790 = await getCollection<I2790>("I2790");
  const c003 = await getCollection<C003>("C003");

  const i2810 = await getCollection<I2810>("I2810");
  const i2715 = await getCollection<I2715>("I2715");

  const fMats = await getCollection<FoodRawMaterials>(
    "_domestic-food-materials"
  );
  const fm = await getCollection<FunctionalityMaterials>(
    "_functionality-materials"
  );
  const cm = await getCollection<CrawlMaterials>("_crawl-materials");
  const pm = await getCollection<ProcessedMaterials>("_processed-materials");
  const mfm = await getCollection<MapFoodMatsToMats>("_map-foodMats-to-mats");
  const fs = await getCollection<Functionalities>("_functionalities");
  const np = await getCollection<NaverPosts>("_naver_posts");
  const et = await getCollection<EatTogether>("_eat_together");
  const ss = getCollection<StopSelling>("_stop-selling");
  const fw = await getCollection<FoodWarn>("_food-warn");

  await Promise.all([
    dfl.createIndex({ prdlst_report_ledg_no: 1 }, { unique: true }),
    dfd.createIndex({ report_number: 1 }, { unique: true }),
    ffl.createIndex({ rcno: 1 }, { unique: true }),
    ffd.createIndex({ rcno: 1 }, { unique: true }),
    fbfl.createIndex({ cntntsSn: 1 }, { unique: true }),
    frfl.createIndex({ cntntsSn: 1 }, { unique: true }),
    i0030.createIndex({ PRDLST_REPORT_NO: 1 }, { unique: true }),
    i0040.createIndex({ HF_FNCLTY_MTRAL_RCOGN_NO: 1 }, { unique: true }),
    i2790.createIndex({ NUM: 1 }, { unique: true }),
    // i2810.createIndex({ NTCTXT: 1 }, { unique: true }),
    i2715.createIndex({ SELF_IMPORT_SEQ: 1 }, { unique: true }),
    c003.createIndex({ PRDLST_REPORT_NO: 1 }, { unique: true }),
    // fMats.createIndex({report_number: 1}, {unique: true}),
    // fm.createIndex({
    //   name: 'text',
    //   company: 'text',
    // }, {default_language : 'ngram'}),
    cm.createIndex({ ntctxt_no: 1 }, { unique: true }),
    mfm.createIndex({ nameInFood: 1 }, { unique: true }),
    fs.createIndex({ id: 1 }, { unique: true }),
    np.createIndex({ volumeNo: 1 }, { unique: true }),
    et.createIndex({ name: 1 }, { unique: true }),
    fw.createIndex({ id: 1 }, { unique: true }),
    // ss.createIndex({registrationNumber: 1}, {unique: true}),
  ]);
  // fm.createIndex({matId: 1}, {unique: true});
  resolve?.();
  return {
    connection,
    dfl,
    dfd,
  };
};
export const mongoInited = {
  promise: NO_INIT as unknown as Promise<any>,
};
export const checkInit = () => {
  if ((mongoInited.promise as any) === NO_INIT)
    throw new Error("Not inited MongoClient");
};

export interface IntegrationDomesticFood {}
export interface IntegrationForeginFood {}
export type ItegrationFoodList =
  | ({ type: "domestic" } & IntegrationDomesticFood)
  | ({ type: "foreign" } & IntegrationForeginFood);

export const getCollection = <T>(name: string) => db.collection<T>(name);

export const getAllMaterials = async () => {
  await mongoInited.promise;
  const dfm = getCollection<FoodRawMaterials>("_domestic-food-materials");

  const mats = (await dfm.find({}).toArray())
    .map(({ materials }) => {
      return materials;
    })
    .flat();
  // FIXME: 잘못 기재된 원료 - 원료이름 : 70202050, 신고번호 : 20040020007863

  return [...new Set(mats.filter((i) => i))].sort();
};
export const setMapFoodMatsToMats = async () => {
  const fmats = await getAllMaterials();
  const mfm = getCollection<MapFoodMatsToMats>("_map-foodMats-to-mats");
  const mfmNames = await mfm
    .find({})
    .map(({ nameInFood }) => nameInFood)
    .toArray();
  const noNames = fmats.filter((name) => !mfmNames.includes(name));

  if (noNames.length)
    await mfm.insertMany(
      noNames.map((name) => ({
        nameInFood: name,
        no: [],
      })),
      { ordered: false }
    );
};

export const getAllCrawlMaterials = async () => {
  await mongoInited.promise;
  const cm = getCollection<CrawlMaterials>("_crawl-materials");

  const mats = (await cm.find({}).toArray()).map(({ titl }) => titl).flat();
  // FIXME: 잘못 기재된 원료 - 원료이름 : 70202050, 신고번호 : 20040020007863
  return mats;
};

export const fixIntegrationFoodList = async () => {
  const ifl = await getCollection<IntegrationFoodList>(
    "_integration-food-list"
  );
  const list = await ifl.find({}).toArray();

  let i = 0;
  for (const item of list) {
    console.log(i++);
    const func = (item as any).functionalities;

    // delete (item as any).functionalities;
    // item.functionalities = func;
    // console.log(item);
    await ifl.updateOne(
      { _id: (item as any)._id },
      { $set: { functionalities: func } }
    );
  }
  await ifl.updateMany({}, { $unset: { functionalities: 1 } });
  // console.log((list[0] as any)._id);
};

// 영양소 기능성에만 해당 원료 연결
export const syncNutrientFunctionalities = async () => {
  const fm = await getCollection<FunctionalityMaterials>(
    "_functionality-materials"
  );
  const fs = await getCollection<Functionalities>("_functionalities");

  const list = await fs.find({ type: "영양소 기능" }).toArray();

  for (const item of list) {
    const mats = await fm.find({ functionality: { $in: [item.id] } }).toArray();

    await fs.updateOne(
      { _id: (item as any)._id },
      { $set: { materials: toUnique(mats.flatMap(({ name }) => name)).sort() } }
    );
  }
};

// 병용섭취 텍스트 검색용 필드 생성
export const extraEatTogether = async () => {
  const et = await getCollection<EatTogether>("_eat_together");
  const list = await et.find({}).toArray();

  for (const item of list) {
    const { name, name_eng, descriptions } = item;
    const s = descriptions
      .map(({ title, body, medicines }) => {
        const s =
          medicines
            ?.map(({ ingredient, names, category, type }) =>
              [ingredient, names, category, type].join(" ")
            )
            .join(" ") ?? "";
        return [title, body, s].join(" ");
      })
      .join(" ");
    const r = [name, name_eng, s].join(" ");
    await et.updateOne({ _id: (item as any)._id }, { $set: { query: r } });
  }
};

// 식품에 섭취시 주의사항 동기화
export const syncWarnToFood = async () => {
  const fm = await getCollection<FunctionalityMaterials>(
    "_functionality-materials"
  );
  const ifl = await getCollection<IntegrationFoodList>(
    "_integration-food-list"
  );

  const list = await ifl.find({ "warn.0": { $exists: false } }).toArray();

  const total = list.length;
  let i = 0;

  for (const item of list) {
    console.log(`${++i}/${total}`);
    const mats = await fm
      .find({
        no: { $in: item.materials },
      })
      .toArray();
    const warn = mats.flatMap(({ warn }) => warn);
    if (!warn.length) continue;
    await ifl.updateOne(
      { _id: (item as any)._id },
      { $set: { warn: toUnique(mats.flatMap(({ warn }) => warn)) } }
    );

    process.stdout.clearLine(1);
    process.stdout.cursorTo(0);
  }
};

// 썸네일 등록된 제품만
export const syncThumbnails = async () => {
  const db = client.db("hsin-food-photo");

  const ifl = await getCollection<IntegrationFoodList>(
    "_integration-food-list"
  );
  const tmbList = await db.collection<any>("IntegrationFoodThumbnailList");

  const list = await tmbList
    .find({ "thumbnails.0": { $exists: true } })
    .toArray();
  const total = list.length;
  let i = 0;
  for (const { report_no, thumbnails, type } of list) {
    console.log(`${++i}/${total}`);
    // console.log(await ifl.findOne({ report_no, type }), thumbnails);
    await ifl.updateOne({ report_no, type }, { $set: { thumbnails } });
    // break;
    process.stdout.clearLine(1);
    process.stdout.cursorTo(0);
  }
};
// 모든 제품 썸네일
export const syncAllThumbnails = async () => {
  const db = client.db("hsin-food-photo");

  const ifl = await getCollection<IntegrationFoodList>(
    "_integration-food-list"
  );
  const tmbList = await db.collection<any>("IntegrationFoodThumbnailList");

  const list = await tmbList
    .find({ "thumbnails.0": { $exists: false } })
    .toArray();
  const total = list.length;
  let i = 0;
  for (const { report_no, thumbnails, type } of list) {
    console.log(`${++i}/${total}`);
    await ifl.updateOne({ report_no, type }, { $set: { thumbnails } });
    // break;
    process.stdout.clearLine(1);
    process.stdout.cursorTo(0);
  }
};

// url 등록된 제품만
export const syncIncludeUrl = async () => {
  const db = client.db("hsin-food-photo");

  const ifl = await getCollection<IntegrationFoodList>(
    "_integration-food-list"
  );
  const tmbList = await db.collection<any>("IntegrationFoodThumbnailList");

  const list = await tmbList
    .find({ url: { $exists: true, $ne: "" } })
    .toArray();
  const total = list.length;
  let i = 0;
  for (const { report_no, url, type } of list) {
    console.log(`${++i}/${total}`);
    // console.log(await ifl.findOne({ report_no, type }), thumbnails);
    await ifl.updateOne({ report_no, type }, { $set: { url } });
    // break;
    process.stdout.clearLine(1);
    process.stdout.cursorTo(0);
  }
};
// 모든 제품 url 동기화
export const syncAllUrl = async () => {
  const db = client.db("hsin-food-photo");

  const ifl = await getCollection<IntegrationFoodList>(
    "_integration-food-list"
  );
  const tmbList = await db.collection<any>("IntegrationFoodThumbnailList");

  const list = await tmbList.find({ url: { $exists: true } }).toArray();
  const total = list.length;
  let i = 0;
  for (const { report_no, url, type } of list) {
    console.log(`${++i}/${total}`);
    // console.log(await ifl.findOne({ report_no, type }), thumbnails);
    await ifl.updateOne({ report_no, type }, { $set: { url } });
    // break;
    process.stdout.clearLine(1);
    process.stdout.cursorTo(0);
  }
};

// 검색용 텍스트 동기화 <> 사용하지 않음
export const syncIntegrationFoodListText = async () => {
  const i0030 = await getCollection<I0030>("I0030");
  const ifl = await getCollection<IntegrationFoodList>(
    "_integration-food-list"
  );

  const list = await i0030.find().toArray();
  const total = list.length;
  let i = 0;

  for (const item of list) {
    console.log(`${++i}/${total}`);
    const text = Object.values(item)
      .filter((i) => i)
      .join(" ");
    await ifl.updateOne(
      { report_no: item.PRDLST_REPORT_NO },
      { $set: { text } }
    );
    console.clear();
  }

  const ffd = await getCollection<ForeignFoodDetail>("_foreign-food-detail");
  const fList = await ffd.find().toArray();
  const fTotal = fList.length;
  i = 0;
  for (const item of fList) {
    console.log(`${++i}/${fTotal}`);
    let text = Object.values(item.foodDetailInfo)
      .filter((i) => i)
      .join(" ");
    text +=
      " " +
      [...item.itmList, ...item.irdntList]
        .flatMap(({ koreanNm, engNm, itmNm }: any) => [koreanNm, engNm, itmNm])
        .filter((i) => i)
        .join(" ");
    await ifl.updateOne({ report_no: item.rcno }, { $set: { text } });
  }
};

// export const syncIntegrationFoodListCreatedDate = async () => {
//   const i0030 = await getCollection<I0030>('I0030');
//   const ifl = await getCollection<IntegrationFoodList>('_integration-food-list');

//   const list = await i0030.find({}).toArray();
//   const total = list.length;
//   let i = 0;

//   const domesticList = await ifl.find({type: 'domestic', created_date: {$exists: false}}).toArray();

//   for (const {PRDLST_REPORT_NO, PRMS_DT} of list) {
//     console.log(`${++i}/${total}`);
//     const yyyy = PRMS_DT.substr(0, 4);
//     const mm = PRMS_DT.substr(4, 2);
//     const dd = PRMS_DT.substr(6, 2);

//     const date = new Date(`${yyyy}-${mm}-${dd}T09:00+00:00`);
//     await ifl.updateOne({type: 'domestic', report_no: PRDLST_REPORT_NO}, {$set: {created_date: date}});
//   }

//   const ffd = await getCollection<ForeignFoodDetail>('_foreign-food-detail');
//   const fList = await ffd.find().toArray();
//   const fTotal = fList.length;
//   i = 0;
//   for (const {rcno, foodDetailInfo} of fList) {
//     console.log(`${++i}/${fTotal}`);
//     const date = new Date(`${foodDetailInfo.procsDtm}T09:00+00:00`);
//     await ifl.updateOne({type: 'foreign', report_no: rcno}, {$set: {created_date: date}});
//   }
// };

export const syncMatsCreatedDate = async () => {
  const fm = await getCollection<FunctionalityMaterials>(
    "_functionality-materials"
  );
  const i0040 = await getCollection<I0040>("I0040");

  const list = await i0040.find({}).toArray();

  for (const { PRMS_DT, HF_FNCLTY_MTRAL_RCOGN_NO } of list) {
    const yyyy = PRMS_DT.substr(0, 4);
    const mm = PRMS_DT.substr(4, 2);
    const dd = PRMS_DT.substr(6, 2);
    const date = new Date(`${yyyy}-${mm}-${dd}T09:00+00:00`);
    // break;
    await fm.updateOne(
      { no: { $in: [HF_FNCLTY_MTRAL_RCOGN_NO] } },
      { $set: { created_date: date } }
    );
  }
};

export const checkDupReportNo = async () => {
  const ifl = await getCollection<IntegrationFoodList>(
    "_integration-food-list"
  );
  const list = await ifl.find({}).toArray();

  const dup: string[] = [];

  for (const { report_no } of list) {
    if (dup.includes(report_no)) console.log("report_no", report_no);
    else dup.push(report_no);
  }
};
