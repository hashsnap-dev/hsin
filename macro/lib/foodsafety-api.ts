import got from "got/dist/source";
import {ignoreError, splitCustom, toUnique} from "./helper";
import {getCollection, mongoInited} from "./mongodb";
import {
  C003,
  FoodRawMaterials,
  ForeignFoodDetail,
  Functionalities,
  FunctionalityMaterials,
  I0030,
  I0040,
  I2715,
  I2790,
  I2810,
  IntegrationFoodList,
  MapFoodMatsToMats,
} from "hsin";
import {existsSync, readFileSync, writeFileSync} from "fs";
 
const today = new Date();
const nowDate = '20230329';

// 건강기능식품 품목제조 신고사항 현황 https://www.foodsafetykorea.go.kr/api/newDatasetDetail.do
export const getI0030 = (i: number, total: number = 1000) => {
  return got.post(
    `http://openapi.foodsafetykorea.go.kr/api/3fd832dead944041b4de/I0030/json/${
      1 + i * total
    }/${(i + 1) * total}/CHNG_DT=${nowDate}`,
    {
      timeout: {request: 130000},
    }
  );
};
export const syncI0030 = async () => {
  await mongoInited.promise;
  console.log("syncI0030");
  let dupCount = 0;
  const i0030 = getCollection<I0030>("I0030");
  let i = 0;
  while (1) {
    console.log(i);
    let end = false;
    const data = (await getI0030(i++).json()) as any;
    if (!data?.I0030?.row?.length) return (end = true);
    try {
      await i0030.insertMany(data?.I0030?.row, {ordered: false});
    } catch (err: any) {
      console.log(err.message);
      if (++dupCount > 10) {
        console.log(
          "Insert duplicate occurrence 3 times. Probably, all data are entered."
        );
        end = true;
      }
    }
    if (end) break;
  }
};

// 건강기능식품 품목제조신고(원재료) https://www.foodsafetykorea.go.kr/api/newDatasetDetail.do
export const getC003 = (i: number, total: number = 1000) => {
  console.log(
    `http://openapi.foodsafetykorea.go.kr/api/3fd832dead944041b4de/C003/json/${
      1 + i * total
    }/${(i + 1) * total}/CHNG_DT=${nowDate}`
  );
  return got.post(
    `http://openapi.foodsafetykorea.go.kr/api/3fd832dead944041b4de/C003/json/${
      1 + i * total
    }/${(i + 1) * total}/CHNG_DT=${nowDate}`,
    {
      timeout: {request: 30000},
    }
  );
};
export const syncC003 = async () => {
  await mongoInited.promise;
  console.log("syncC003");
  const c003 = getCollection<C003>("C003");
  let i = 0;
  let dupCount = 0;
  while (1) {
    console.log(i);
    let end = false;
    await ignoreError(async () => {
      const data = (await getC003(i).json()) as any;
      if (!data?.C003?.row?.length) return (end = true);
      try {
        i++;
        await c003.insertMany(data?.C003?.row, {ordered: false});
      } catch (err: any) {
        console.log(err.message);
        if (++dupCount > 2) {
          console.log(
            "Insert duplicate occurrence 3 times. Probably, all data are entered."
          );
          end = true;
        }
      }
    });
    if (end) break;
  }
};

// const hideParenthesis = (str: string) => {
//   const save: string[] = [];
//   let r: ReturnType<String['match']> = null;
//   let i = 0;
//   while (r = str.match(/\((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\)/)) {
//     const {index, [0]: target} = r as RegExpMatchArray;
//     const before = str.slice(0, index);
//     const after = str.slice((index as number) + target.length);
//     save.push(target);
//     str = before + '{{save}}' + after;
//   }
//   return {
//     result: str,
//     save,
//   };
// }
/**
 * 기능성 원료 추출
 */
export const syncFunctionalMaterials = async () => {
  await mongoInited.promise;

  const mfm = await getCollection<MapFoodMatsToMats>("_map-foodMats-to-mats");
  const fm = await getCollection<FunctionalityMaterials>(
    "_functionality-materials"
  );
  const i0030 = getCollection<I0030>("I0030");
  const fMats = getCollection<FoodRawMaterials>("_domestic-food-materials");
  const fMatsNo = (await fMats.find({type: "domestic"}).toArray()).map(
    ({report_number}) => report_number
  );

  // const alli0030 = await i0030.find({}).toArray();
  const domesticData = await i0030
    .find({PRDLST_REPORT_NO: {$nin: fMatsNo}})
    .toArray();
  // const i0030No = (await i0030.find({}).toArray()).map(({PRDLST_REPORT_NO}) => PRDLST_REPORT_NO);
  // const noClone = [...new Set(i0030No)];
  // noClone.forEach(n => i0030No.splice(i0030No.indexOf(n), 1));
  // console.log(i0030No);
  // console.log('domesticData', domesticData.length);

  let max = domesticData.length;
  let i = 0;
  for (const item of domesticData) {
    console.log(`${++i}/${max}`);
    const {PRDLST_REPORT_NO, RAWMTRL_NM} = item;
    try {
      await fMats.insertOne({
        type: "domestic",
        report_number: PRDLST_REPORT_NO,
        materials: splitCustom(RAWMTRL_NM, ",").map((str) => str.trim()),
      });
    } catch (err: any) {
      console.log(err.message);
    }
  }

  const ffd = await getCollection<ForeignFoodDetail>("_foreign-food-detail");
  const ffMatsNo = (await fMats.find({type: "foreign"}).toArray()).map(
    ({report_number}) => report_number
  );
  const foreignData = await ffd.find({rcno: {$nin: ffMatsNo}}).toArray();

  max = foreignData.length;
  i = 0;
  for (const item of foreignData) {
    console.log(`${++i}/${max}`);
    const {rcno, itmList} = item;
    try {
      await fMats.insertOne({
        type: "foreign",
        report_number: rcno,
        materials: itmList.map(({itmNm}) => itmNm),
      });
    } catch (err: any) {
      console.log(err.message);
    }
  }
  // console.log('foreignData', foreignData.length);
  if (await existsSync("./all-no-names.txt")) {
    const names = ((await readFileSync("./all-no-names.txt")) + "")
      .split("\n")
      .map((name) => {
        return name.search("\\\\") === -1
          ? false
          : (name.split("\\\\") as [string, string]);
      });

    for (const [name, no] of names.filter((i) => i) as unknown as [
      string,
      string
    ]) {
      const mat = await fm.findOne({no: {$in: [no]}});
      if (mat) await mfm.updateOne({nameInFood: name}, {$set: {no: mat.no}});
      else console.error(new Error(`원료 인정번호가 없음: ${no}`));
    }
  }

  const allFMatsNames = toUnique(
    (
      await fMats
        .find({})
        .map(({materials}) => materials)
        .toArray()
    ).flat()
  ).filter((i) => i);

  for (const name of allFMatsNames) {
    if (!(await mfm.findOne({nameInFood: name})))
      await mfm.insertOne({
        nameInFood: name,
        no: [],
      });
  }
  const noMatsNames1 = toUnique(
    await mfm
      .find({"no.0": {$exists: false}})
      .map(({nameInFood}) => nameInFood)
      .toArray()
  );

  for (const name of noMatsNames1) {
    const mat = await fm.findOne({name});
    if (mat) {
      await mfm.updateOne({nameInFood: name}, {$set: {no: mat.no}});
    }
  }
  const noMatsNames2 = toUnique(
    await mfm
      .find({"no.0": {$exists: false}})
      .map(({nameInFood}) => nameInFood)
      .toArray()
  );
  await writeFileSync("./all-no-names.txt", noMatsNames2.join("\n"));
};

/**
 * 기능성 원료 API (건강기능식품 기능성 원료인정현황) https://www.foodsafetykorea.go.kr/api/newDatasetDetail.do
 * @param i 페이지 넘버
 * @param total 개수, 10개 이상하면 너무 오래걸림
 * @returns
 */
export const getI0040 = (i: number, total: number = 10) => {
  return got.post(
    `http://openapi.foodsafetykorea.go.kr/api/3fd832dead944041b4de/I-0040/json/${
      1 + i * total
    }/${(i + 1) * total}`,
    {
      timeout: {request: 120000},
    }
  );
};
export const syncI0040 = async () => {
  await mongoInited.promise;
  const i0040 = getCollection<I0040>("I0040");

  let i = 0;
  let dupCount = 0;
  while (1) {
    console.log(i);
    let end = false;
    try {
      const data = (await getI0040(i++).json()) as any;
      if (!data?.["I-0040"]?.row?.length) return (end = true);
      try {
        await i0040.insertMany(data?.["I-0040"]?.row, {ordered: false});
      } catch (err: any) {
        console.log(err.message);
        if (++dupCount > 2) {
          // console.log('Insert duplicate occurrence 3 times. Probably, all data are entered.');
          // end = true;
        }
      }
    } catch (err: any) {
      console.log(err.message);
      i--;
    }
    if (end) break;
  }
};

export const syncIntegrationFoodList = async () => {
  const ifl = await getCollection<IntegrationFoodList>("_integration-food-list");
  const mfm = await getCollection<MapFoodMatsToMats>("_map-foodMats-to-mats");
  const fs = await getCollection<Functionalities>("_functionalities");
  const fMats = await getCollection<FoodRawMaterials>("_domestic-food-materials");
  const i0030 = await getCollection<I0030>("I0030");
  const fm = await getCollection<FunctionalityMaterials>("_functionality-materials");

  const iflNumbers = await ifl
    .find({type: "domestic"})
    .map(({report_no}) => report_no)
    .toArray();
  const foodList = await i0030
    .find({PRDLST_REPORT_NO: {$nin: iflNumbers}})
    .toArray();

  let total = foodList.length;
  let i = 0;

  for (const {PRDLST_NM, PRDLST_REPORT_NO, BSSH_NM, PRMS_DT} of foodList) { // 국내 제품
    console.log(`domestic : ${++i}/${total}`);
    const {materials} = (await fMats.findOne({
      type: "domestic",
      report_number: PRDLST_REPORT_NO,
    })) as FoodRawMaterials;
    // console.log(PRDLST_REPORT_NO, materials)
    const matPromise = materials.map(async (str) => {
      const mat = await fm.findOne({name: str});
      return mat ? mat : await mfm.findOne({nameInFood: str});
    });
    const mats = (await Promise.all(matPromise)) as ( | MapFoodMatsToMats | FunctionalityMaterials )[];

    if (mats.some((val) => !val)) {
      continue;
    }
    const matNumbers = toUnique(mats.flatMap(({no}) => no));
    // console.log(matNumbers);
    const materialNames = await fm
      .find({no: {$in: matNumbers}})
      .map(({name}) => name)
      .toArray();

    const funcs = toUnique(
      await (
        await fm
          .find({no: {$in: matNumbers}})
          .map(({functionality}) => functionality)
          .toArray()
      ).flat()
    );
    // return;

    const yyyy = PRMS_DT.substr(0, 4);
    const mm = PRMS_DT.substr(4, 2);
    const dd = PRMS_DT.substr(6, 2);

    const created_date = new Date(`${yyyy}-${mm}-${dd}T09:00+00:00`);

    await ifl.insertOne({
      type: "domestic",
      report_no: PRDLST_REPORT_NO,
      name: PRDLST_NM,
      company: BSSH_NM,
      functionalities: funcs,
      materials: matNumbers,
      materialNames,
      thumbnail: "",
      warn: [],
      created_date,
      hidden: false,
    });
  }

  const fiflNumbers = await ifl
    .find({type: "foreign"})
    .map(({report_no}) => report_no)
    .toArray();
  const ffd = await getCollection<ForeignFoodDetail>("_foreign-food-detail");
  const ffoodList = await ffd.find({rcno: {$nin: fiflNumbers}}).toArray();
  total = ffoodList.length;
  i = 0;

  for (const {rcno, itmList, foodDetailInfo} of ffoodList) { // 해외 제품
    console.log(`foreign : ${++i}/${total}`);
    const {materials} = (await fMats.findOne({ // _domestic-food-materials 국내/수입 식품과 원료 매핑
      type: "foreign",
      report_number: rcno,
    })) as FoodRawMaterials;

    const matPromise = materials.map(async (str) => {
      const mat = await fm.findOne({name: str}); // _functionality-materials 원료 데이터
      return mat ? mat : await mfm.findOne({nameInFood: str}); // _map-foodMats-to-mats 원료이름과 신고번호 매핑
    });
    const mats = (await Promise.all(matPromise)) as (
      | MapFoodMatsToMats
      | FunctionalityMaterials
    )[];
    if (mats.some((val) => !val)) {
      continue;
    }
    const matNumbers = toUnique(mats.flatMap(({no}) => no));
    // console.log(matNumbers);
    const materialNames = await fm
      .find({no: {$in: matNumbers}})
      .map(({name}) => name)
      .toArray();

    const funcs = toUnique(
      await (
        await fm
          .find({no: {$in: matNumbers}})
          .map(({functionality}) => functionality)
          .toArray()
      ).flat()
    );
    // return;

    const created_date = new Date(`${foodDetailInfo.procsDtm}T09:00+00:00`);

    await ifl.insertOne({
      type: "foreign",
      report_no: rcno,
      name: foodDetailInfo.prductNm,
      company: foodDetailInfo.ovsmnfstNm,
      functionalities: funcs,
      materials: matNumbers,
      materialNames,
      thumbnail: "",
      warn: [],
      created_date,
      hidden: false,
    });
  }

  console.log("end");
};

// 식품영양성분DB(NEW) https://www.foodsafetykorea.go.kr/api/openApiInfo.do?menu_grp=MENU_GRP31&menu_no=656&show_cnt=10&start_idx=1&svc_no=I2790
export const getI2790 = (i: number, total: number = 1000) => {
  console.log(i, total);
  return got.post(
    `http://openapi.foodsafetykorea.go.kr/api/3fd832dead944041b4de/I2790/json/${
      1 + i * total
    }/${(i + 1) * total}`,
    {
      timeout: {request: 360000},
    }
  );
};
export const syncI2790 = async () => {
  await mongoInited.promise;
  console.log("syncI2790");
  let dupCount = 0;
  const i2790 = getCollection<I2790>("I2790");
  let i = 0;
  while (1) {
    console.log(i);
    let end = false;
    const data = (await getI2790(i++).json()) as any;
    console.log(data);
    if (!data?.I2790?.row?.length) return (end = true);
    try {
      await i2790.insertMany(data?.I2790?.row, {ordered: false});
    } catch (err: any) {
      console.log(err.message);
      if (++dupCount > 2) {
        console.log(
          "Insert duplicate occurrence 3 times. Probably, all data are entered."
        );
        end = true;
      }
    }
    if (end) break;
  }
};

// 해외직구 위해식품 차단정보 API https://www.foodsafetykorea.go.kr/api/newDatasetDetail.do
export const getI2715 = (i: number, total: number = 1000) => {
  console.log(i, total);
  return got.post(
    `http://openapi.foodsafetykorea.go.kr/api/3fd832dead944041b4de/I2715/json/${
      1 + i * total
    }/${(i + 1) * total}`,
    {
      timeout: {request: 360000},
    }
  );
};
export const syncI2715 = async () => {
  await mongoInited.promise;
  console.log("syncI2715");
  let dupCount = 0;
  const i2715 = getCollection<I2715>("I2715");
  let i = 0;
  while (1) {
    console.log(i);
    let end = false;
    const data = (await getI2715(i++).json()) as any;
    if (!data?.I2715?.row?.length) return (end = true);
    try {
      const row = data?.I2715?.row.map((data: any) => ({...data, hidden: false}));
      await i2715.insertMany(row, {ordered: false});
    } catch (err: any) {
      console.log(err.message);
      if (++dupCount > 2) {
        console.log(
          "Insert duplicate occurrence 3 times. Probably, all data are entered."
        );
        end = true;
      }
    }
    if (end) break;
  }
}

// 해외 위해식품 회수정보 API https://www.foodsafetykorea.go.kr/api/newDatasetDetail.do
export const getI2810 = (i: number, total: number = 1000) => {
  console.log(i, total);
  return got.post(
    `http://openapi.foodsafetykorea.go.kr/api/3fd832dead944041b4de/I2810/json/${
      1 + i * total
    }/${(i + 1) * total}`,
    {
      timeout: {request: 360000},
    }
  );
};
export const syncI2810 = async () => {
  await mongoInited.promise;
  console.log("syncI2810");
  let dupCount = 0;
  const i2810 = getCollection<I2810>("I2810");
  let i = 0;
  while (1) {
    console.log(i);
    let end = false;
    const data = (await getI2810(i++).json()) as any;
    console.log(data);
    if (!data?.I2810?.row?.length) return (end = true);
    try {
      await i2810.insertMany(data?.I2810?.row, {ordered: false});
    } catch (err: any) {
      console.log(err.message);
      if (++dupCount > 2) {
        console.log(
          "Insert duplicate occurrence 3 times. Probably, all data are entered."
        );
        end = true;
      }
    }
    if (end) break;
  }
};
