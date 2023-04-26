import {readFile} from "fs/promises";
import xlsx from "node-xlsx";
import fs from "fs/promises";
import {getCollection, mongoInited} from "./mongodb";
import {
  DomesticFoodList,
  EatTogether,
  FalseAdvertising,
  FoodRawMaterials,
  FoodWarn,
  ForeignFoodDetail,
  Functionalities,
  FunctionalityMaterials,
  I0030,
  IntegrationFoodList,
  MapFoodMatsToMats,
  ProcessedMaterials,
  StopSelling,
} from "hsin";
import {splitCustom} from "./helper";

export const getXlsx = (dir: string) => {
  return xlsx.parse(`${process.cwd()}/${dir}`);
};
 
export const parseMatsDetails = (matsXlsx: any): FunctionalityMaterials[] => {
  const data = matsXlsx[0].data.slice(1);
  const mats = [];
  let target: any;
  for (const [
    no,
    ,
    name,
    type,
    ,
    company,
    functionality,
    amount,
    warn,
  ] of data) {
    if (name) {
      target = {
        name: name?.trim() ?? "",
        type: type?.trim() ?? "",
        company: company?.trim() ?? "",
        functionality: [functionality?.trim() ?? ""],
        amount: amount?.trim() ?? "",
        warn: [warn?.trim() ?? ""],
      };
      mats.push(target);
    } else {
      functionality && target.functionality.push(functionality?.trim() ?? "");
      warn && target.warn.push(warn?.trim() ?? "");
    }
  }
  return mats;
};

/**
 * @example
 * await syncMats(parseMatsDetails(getXlsx('data/mats.xlsx')));
 * */
export const syncMats = async (data: FunctionalityMaterials[]) => {
  await mongoInited.promise;

  const fm = getCollection<FunctionalityMaterials>("_functionality-materials");
  await fm.insertMany(data);
};

export type MaterialMeta = {
  type: string;
  name: string;
  no: string[];
  company: string;
  abolished: boolean;
  canceled: boolean;
};

export const readMaterialMeta = async () => {
  await mongoInited.promise;

  const matsRawList = (await readFile("data/computed.txt"))
    .toString()
    .split("\n");
  const computed = matsRawList.flatMap<MaterialMeta>((str) => {
    const [type, name, ext] = str.split("\\");
    let abolished = !!name.match(/^\[인정취소\]/);
    let canceled = !!name.match(/^\[인정폐지\]/);

    if (type === "고시형원료-기능성원료" || type === "고시형원료-영양소") {
      return {
        type,
        name,
        no: [ext.replace(/[^0-9\-]/g, "")],
        company: "",
        abolished,
        canceled,
      };
    } else if (type === "사용불가원료") {
      return {type, name, no: [], company: "", abolished, canceled};
    } else if (type === "개별인정원료") {
      const oneCompanyText = ext.match(
        /제?\d{4}-\d{1,}호, ?(제?\d{4}-\d{1,}호,?){1,}/
      );
      // 하나회사에 인정번호 여러개
      if (oneCompanyText) {
        const company = ext.slice(0, ext.indexOf(oneCompanyText[0]));
        // console.log(name.replace(/^\[인정(취소|폐지)\]/,'').trim().replace(/(^, )|(, $)/g, ''))
        return {
          type,
          name: name
            .replace(/^\[인정(취소|폐지)\]/, "")
            .trim()
            .replace(/(^, )|(, $)/g, ""),
          no: oneCompanyText[0]
            .split(",")
            .map((str) => str.trim().replace(/[^0-9\-]/g, "")),
          company: company.replace(/(^, )|(, $)/g, ""),
          abolished,
          canceled,
        };
        // 여러 회사에 인정번호 여러개
      } else {
        const numbers = ext.match(/제?\d{4}-\d{1,}호/g) as string[];
        return numbers
          .map((number, i, arr) => {
            if (i === 0)
              return [
                number,
                ext.slice(0, ext.indexOf(number)).replace(/^(, )|(, )$/g, ""),
              ];
            else
              return [
                number,
                ext
                  .slice(
                    ext.indexOf(arr[i - 1]) + arr[i - 1].length,
                    ext.indexOf(number)
                  )
                  .replace(/^(, )|(, )$/g, ""),
              ];
          })
          .map(([number, company]) => {
            return {
              type,
              name: name.replace(/^\[인정(취소|폐지)\]/, ""),
              no: [number.replace(/[^0-9\-]/g, "")],
              company,
              abolished,
              canceled,
            };
          });
      }
    }
    return {
      type: "",
      name: "",
      no: [],
      company: "",
      abolished: false,
      canceled: false,
    };
  });

  return computed;
};

export const syncAbolishedNCanceled = async () => {
  const mats = await readMaterialMeta();

  const abolishedMats = mats
    .filter(({abolished}) => abolished)
    .flatMap(({no}) => no);
  const canceledMats = mats
    .filter(({canceled}) => canceled)
    .flatMap(({no}) => no);
  const fm = getCollection<FunctionalityMaterials>("_functionality-materials");
  for (const item of await fm.find().toArray()) {
    const abolished = abolishedMats.includes(item.no[0]);
    const canceled = canceledMats.includes(item.no[0]);
    await fm.updateOne({_id: (item as any)._id}, {$set: {abolished, canceled}});
  }
};
/**
 * 기능성 원료 가공 및 저장
 */
export const syncMatByFiles = async () => {
  const fm = getCollection<FunctionalityMaterials>("_functionality-materials");

  const matMeta = await readMaterialMeta();
  const matDetails = parseMatsDetails(getXlsx("data/mats.xlsx"));

  const r = [];

  while (matMeta.length) {
    const meta = matMeta.shift() as MaterialMeta;
    const details = matDetails.filter(
      ({name, company}) => name === meta.name && company === meta.company
    );
    if (details.length === 1 || meta.type === "사용불가원료") {
      const dup = await fm.findOne(
        meta.type === "사용불가원료" ? {name: meta.name} : {no: {$in: meta.no}}
      );
      !dup && (await fm.insertOne(Object.assign(meta, details?.[0] ?? {})));
    } else {
      if (details.length > 1) console.log(JSON.stringify(details)); // 중복기입
      if (!details.length) r.push(`${meta.name}\\${meta.company}`); // 이름이 다른경우
    }
  }

  console.log(r);
  fs.writeFile("./data/invalid-mat-name-list.txt", r.join("\n"));
};

export const preprocessMapFMatsToMats = (): MapFoodMatsToMats[] => {
  const data = getXlsx("data/mapFMatsToMats.xlsx");

  return (data[0].data as string[][]).slice(1).map(([fname, ...mnames]) => {
    return {
      nameInFood: fname,
      no: [...mnames.join(",").matchAll(/[^\d]*?(\d+?-\d+?)[^\d]+?/g)].map(
        ([_, n]) => n
      ),
    };
  });
};

export const syncMapFMatsToMats = async () => {
  const mfm = getCollection<MapFoodMatsToMats>("_map-foodMats-to-mats");
  const data = preprocessMapFMatsToMats();

  await mfm.insertMany(preprocessMapFMatsToMats(), {ordered: false});
};

export const syncFunctionalitiesByXlsx = async () => {
  const fs = getCollection<Functionalities>("_functionalities");

  const data = getXlsx("data/$functionalities.xlsx");
  const computed = (data[0].data as string[][]).slice(1);
  const result = computed.map(([idParent, type, id, functionality]) => ({
    type,
    id:
      (type === "질병발생위험감소기능"
        ? 1
        : type === "영양소 기능"
        ? 2
        : type === "생리활성기능"
        ? 3
        : null) +
      "-" +
      id,
    functionality,
  })) as Functionalities[];
  try {
    await fs.insertMany(result, {ordered: false});
  } catch (err: any) {
    console.log(err.message);
  }
};

export const getForeignFoodFunctionalityMaterialList = async () => {
  await mongoInited.promise;

  const ffd = getCollection<ForeignFoodDetail>("_foreign-food-detail");

  const invalidMatList = await ffd
    .find({
      itmList: {
        $elemMatch: {itmNm: {$regex: "^영양소,기능성복합제품\\("}},
      },
    })
    .toArray();
  let total = invalidMatList.length;
  let i = 0;
  for (const item of invalidMatList) {
    console.log(`${++i}/${total}`);
    const targets = item.itmList.filter(({itmNm}) =>
      /^영양소,기능성복합제품\(/.test(itmNm)
    );
    const nonTargets = item.itmList.filter(
      ({itmNm}) => !/^영양소,기능성복합제품\(/.test(itmNm)
    );
    const splitedTarget = targets.flatMap(({itmNm}) =>
      itmNm
        .replace(/^영양소,기능성복합제품\(/, "")
        .slice(0, -1)
        .split("/")
        .map((itmNm) => ({sn: 1, itmCd: "", itmNm: itmNm.trim()}))
    );

    await ffd.updateOne(item, {
      $set: {itmList: [...splitedTarget, ...nonTargets]},
    });
  }
  const invalidMatList2 = await ffd
    .find({
      itmList: {$elemMatch: {itmNm: {$regex: "^복합기능성제품\\("}}},
    })
    .toArray();

  total = invalidMatList2.length;
  i = 0;
  for (const item of invalidMatList2) {
    console.log(`${++i}/${total}`);
    const targets = item.itmList.filter(({itmNm}) =>
      /^복합기능성제품\(/.test(itmNm)
    );
    const nonTargets = item.itmList.filter(
      ({itmNm}) => !/^복합기능성제품\(/.test(itmNm)
    );
    const splitedTarget = targets.flatMap(({itmNm}) =>
      itmNm
        .replace(/^복합기능성제품\(/, "")
        .slice(0, -1)
        .split("/")
        .map((itmNm) => ({sn: 1, itmCd: "", itmNm: itmNm.trim()}))
    );

    await ffd.updateOne(item, {
      $set: {itmList: [...splitedTarget, ...nonTargets]},
    });
  }
  const invalidMatList3 = await ffd
    .find({
      itmList: {$elemMatch: {itmNm: {$regex: "^복합영양소제품\\("}}},
    })
    .toArray();

  total = invalidMatList3.length;
  i = 0;
  for (const item of invalidMatList3) {
    console.log(`${++i}/${total}`);
    const targets = item.itmList.filter(({itmNm}) =>
      /^복합영양소제품\(/.test(itmNm)
    );
    const nonTargets = item.itmList.filter(
      ({itmNm}) => !/^복합영양소제품\(/.test(itmNm)
    );
    const splitedTarget = targets.flatMap(({itmNm}) =>
      itmNm
        .replace(/^복합영양소제품\(/, "")
        .slice(0, -1)
        .split("/")
        .map((itmNm) => ({sn: 1, itmCd: "", itmNm: itmNm.trim()}))
    );

    await ffd.updateOne(item, {
      $set: {itmList: [...splitedTarget, ...nonTargets]},
    });
  }
  const matList = await ffd
    .find({})
    .map(({itmList}) => itmList.map(({itmNm}) => itmNm))
    .toArray();
  return [...new Set(matList.flat())].sort().filter((i) => i);
};

export const saveNoMatNameList = async () => {
  const ffmats = await getForeignFoodFunctionalityMaterialList();
  const fm = getCollection<FunctionalityMaterials>("_functionality-materials");
  const r = [];
  for (const name of ffmats) {
    if (!(await fm.findOne({name}))) r.push(name);
  }
  await fs.writeFile("./foreign-food-not-saved-mats.txt", r.sort().join("\n"));
};

// export const syncMapFMatsToMatsByForeign = async () => {
//   await mongoInited.promise;
//   const ffmats = await getForeignFoodFunctionalityMaterialList();
//   const mfm = getCollection<MapFoodMatsToMats>("_map-foodMats-to-mats");
//   const saved = await mfm.find({ nameInFood: { $in: ffmats } }).toArray();

//   const savedNames = saved.map(({ nameInFood }) => nameInFood);
//   const notSavedNames = ffmats.filter((name) => !savedNames.includes(name));

//   const fm = getCollection<FunctionalityMaterials>("_functionality-materials");
//   const r = [];
//   for (const name of notSavedNames) {
//     if (!(await fm.findOne({ name }))) {
//       r.push(name);
//       await mfm.insertOne({
//         nameInFood: name,
//         no: [],
//       });
//     }
//   }

//   await fs.writeFile(
//     "./foreign-food-not-saved-mats.txt",
//     r
//       .map((name) => name.trim())
//       .sort()
//       .join("\n")
//   );
// };

export const saveForeignFoodFunctionalityMaterialList = async () => {
  await mongoInited.promise;

  const ffd = getCollection<ForeignFoodDetail>("_foreign-food-detail");
  const matList = await ffd
    .find({})
    .map(({itmList}) => itmList.map(({itmNm}) => itmNm.trim()))
    .toArray();
  await fs.writeFile(
    "./foreign-food-mats.txt",
    [...new Set(matList.flat())].sort().join("\n")
  );
};

//  "type": "영양소",
//  "name": "비타민 A",
//  "no": ["1-1"],
//  "company": "",
//  "abolished": false,
//  "canceled": false,
//  "functionality": ["어두운 곳에서 시각 적응을 위해 필요", "피부와 점막을 형성하고 기능을 유지하는데 필요", "상피세포의 성장과 발달에 필요"],
//  "amount": "",
//  "warn": [""]

/**
 * 섭취시 주의사항 완료된 후 작업완료 가능
 */
export const syncFunctionalityMaterials2 = async () => {
  await mongoInited.promise;
  const fm = getCollection<FunctionalityMaterials>("_functionality-materials");
  const pm = getCollection<ProcessedMaterials>("_processed-materials");

  const {data} = getXlsx("./data/$mat-number-to-functionalities.xlsx")[0];
  let i = 0;
  for (const item of data.slice(1)) {
    console.log(++i);
    const [, type, rawFunctionalitise, company, rawNo, name] = item as string[];
    if (!(await fm.findOne({type, company, name}))) {
      const {no, abolished, canceled} = (
        type === "사용불가원료"
          ? await pm.findOne({type, titl: name})
          : await pm.findOne({
              no: {$in: rawNo.split(",").map((str) => str.trim())},
            })
      ) as ProcessedMaterials;
      await fm.insertOne({
        type,
        company,
        name,
        no,
        functionality:
          rawFunctionalitise?.split(",").map((str) => str.trim()) ?? [],
        amount: "",
        warn: [],
        abolished,
        canceled,
        eatTogether: "",
        description: "",
        requirements: "",
      });
    }
  }
};

/**
 * 한번만 호출
 */
export const syncFalseAdvertising = async () => {
  const fa = getCollection<FalseAdvertising>("_false_advertising");
  const {data} = getXlsx("./data/$false_advertising.xlsx")[0] as {
    data: string[][];
  };
  const items = data
    .slice(1)
    .filter((i) => i.length)
    .map(
      ([
        thumbnail,
        category,
        title,
        violation_category,
        violation_contents,
        media,
        phrase,
        result,
      ]: string[]) => ({
        thumbnail,
        category,
        title,
        violation_category,
        violation_contents,
        media,
        phrase,
        result,
      })
    );

  await fa.insertMany(items);
};

export const changeMatWarnIcons = async () => {
  const data = getXlsx("data/$mat-warn-icons.xlsx");

  const icons = data[1].data as [number, string][];
  const mapWarnToIcons = new Map(icons);

  const r: string[][] = [];
  for (const [type, fn, comp, no, name, icons] of data[0].data as string[][]) {
    if (!icons) continue;
    String(icons)
      .split(",")
      .map((str) => mapWarnToIcons.get(Number(str)))
      .forEach((warn, i) => {
        if (!i) {
          r.push([type, fn, comp, no, name, warn ?? ""]);
        } else {
          r.push(["", "", "", "", "", warn ?? ""]);
        }
      });
  }

  const ab = xlsx.build([{name: "computed", data: r}]);
  await fs.writeFile(
    "./mat_warn_to_icons.xlsx",
    Buffer.from(new Uint8Array(ab))
  );
};

// 기능성 원료 섭취시 주의사항 동기화
export const syncMatWarnIcons = async () => {
  const data = getXlsx("data/$mat-warn-icons.xlsx");
  const fm = getCollection<FunctionalityMaterials>("_functionality-materials");
  const total = (data[0].data.slice(1) as string[][]).length;
  let i = 0;
  for (const [type, func, company, no, name, warns] of data[0].data.slice(
    1
  ) as string[][]) {
    console.log(`${++i}/${total}`);
    const targetNumber = no.split(",").shift() as string;
    await fm.updateOne(
      {no: {$in: [targetNumber]}},
      {
        $set: {
          warn:
            warns === "-"
              ? []
              : warns
                  ?.split?.(",")
                  .filter((i) => i)
                  .map((str) => str.trim()) ?? [],
        },
      }
    );
  }
  console.log(data[0].data);
};

// 섭취시 주의사항 동기화
export const syncWarn = async () => {
  const fw = await getCollection<FoodWarn>("_food-warn");
  const data = getXlsx("data/$mat-warn-icons.xlsx");
  const list = data[1].data.slice(1);
  for (const [id, description] of list) {
    await fw.insertOne({
      id: id as number,
      description: description as string,
      icon: `https://health-functional-food.s3.ap-northeast-2.amazonaws.com/warns/HSIN_Icon_caution_64x64-${(
        id as number
      )
        .toString()
        .padStart(2, "0")}.svg`,
    });
  }

  // const total = (data[0].data.slice(1) as string[][]).length;
  // let i = 0;
  // for (const [type, func, company, no, name, warns] of data[0].data.slice(1) as string[][]) {
  //   console.log(`${++i}/${total}`);
  //   const targetNumber = no.split(',').shift() as string;
  //   await fm.updateOne({no: {$in: [targetNumber]}}, {$set: {warn: warns === '-' ? [] : warns?.split?.(',').filter(i=>i).map(str=>str.trim()) ?? []}});
  // }
  // console.log(data[0].data);
};

export const checkPP = async () => {
  const ifl = await getCollection<IntegrationFoodList>(
    "_integration-food-list"
  );

  const data = getXlsx("data/$production_perfomance.xlsx");
  let drcno = data
    .flatMap(({data}: any) => {
      return data.map(([n, cno, name, rcno]: string[]) => rcno);
    })
    .concat(
      await ifl
        .find({
          type: "domestic",
          created_date: {$gt: new Date("2021-01-01T09:00:00.000+00:00")},
        })
        .map(({report_no}) => report_no)
        .toArray()
    );
  drcno = [...new Set(drcno.slice(1))];
  const orcno = await ifl
    .find({
      type: "foreign",
      created_date: {$gt: new Date("2018-01-01T09:00:00.000+00:00")},
    })
    .map(({report_no}) => report_no)
    .toArray();

  // console.log(drcno);
  const total = await ifl.countDocuments();
  const size = 100;
  let page = 1;

  let count = 0;
  while (1) {
    const chunk = await ifl
      .find({})
      .skip(size * (page - 1))
      .limit(size)
      .toArray();
    if (!chunk.length) break;
    await Promise.all(
      chunk.map(({type, report_no}) => {
        console.log(`${++count}/${total}`);
        if (type === "domestic")
          return ifl.updateOne(
            {type: "domestic", report_no},
            {$set: {hidden: !drcno.includes(report_no)}}
          );
        else if (type === "foreign")
          return ifl.updateOne(
            {type: "foreign", report_no},
            {$set: {hidden: !orcno.includes(report_no)}}
          );
        return null;
      })
    );

    page++;
  }
};
export const syncEatTogether = async () => {
  const et = getCollection<EatTogether>("_eat_together");
  await et.deleteMany({});
  const [data] = getXlsx("data/$eat-together-details.xlsx");

  const r: any = [];
  let target: any;
  let targetDescription: any;
  for (const [
    name,
    name_eng,
    description,
    title,
    ingredient,
    names,
    category,
    type,
    thumbnail,
  ] of data.data.slice(1) as string[][]) {
    if (
      !name?.trim() &&
      !name_eng?.trim() &&
      !description?.trim() &&
      !title?.trim() &&
      !ingredient?.trim() &&
      !names?.trim() &&
      !category?.trim() &&
      !type?.trim()
    )
      continue;
    if (name)
      r.push(
        (target = {
          name,
          name_eng,
          thumbnail: "",
          descriptions: [],
        })
      );

    if (description) {
      target.descriptions.push(
        (targetDescription = {
          body: description,
          title: title ?? "",
          medicines: [],
        })
      );
    }

    if (ingredient || names) {
      const specialized = type === "전문의약품";
      if (ingredient) {
        targetDescription.medicines.push({
          ingredient,
          names,
          category,
          type,
          specialized,
        });
      } else {
        const ingredient = targetDescription.medicines[
          targetDescription.medicines.length - 1
        ].ingredient as any;
        targetDescription.medicines.push({
          ingredient,
          names,
          category,
          type,
          specialized,
        });
      }
    }
  }
  try {
    await et.insertMany(r, {ordered: false});
  } catch (err: any) {
    console.error(err);
  }
};

export const syncMatsToEatTogether = async () => {
  const fm = getCollection<FunctionalityMaterials>("_functionality-materials");

  const eatTogetherList = ((await fs.readFile("./data/$eat-together.txt")) + "")
    .split("\n")
    .filter((i) => i)
    .map((str) => str.split("\\"));

  const mats = await fm.find({}).toArray();
  const updatePromises = mats.map((mat) => {
    const targetNames = eatTogetherList.find((strs) => {
      return strs.some((str) => mat.name.indexOf(str) !== -1);
    });
    if (!targetNames) return fm.updateOne(mat, {$set: {eatTogether: ""}});
    const targetName = targetNames[targetNames.length - 1];
    return fm.updateOne(mat, {$set: {eatTogether: targetName}});
  });
  try {
    await Promise.all(updatePromises);
  } catch (err: any) {
    throw new Error(err);
  }
};

// 원료 설명 동기화
export const syncMatsDescription = async () => {
  const [{data}] = getXlsx("data/$mat-description.xlsx");

  const cData = (data as string[][])
    .slice(1)
    .filter(([type]) => type !== "사용불가원료")
    .map(([type, company, nos, name, description, requirements]) => {
      return {
        no: (nos.split(",").shift() as string).trim(),
        description,
        requirements,
      };
    });

  const fm = getCollection<FunctionalityMaterials>("_functionality-materials");

  const total = cData.length;
  let i = 0;

  for (const {no, description, requirements} of cData) {
    process.stdout.write(`\x1Bc\r${++i}/${total}`);
    await fm.updateOne({no: {$in: [no]}}, {$set: {description, requirements}});
  }
};

// 판매중지 제품, 한번만 실행
export const syncStopSelling = async () => {
  const [{data}] = getXlsx("data/$stop_selling.xlsx");

  const ss = getCollection<StopSelling>("_stop-selling");
  await ss.deleteMany({});
  const total = await ss.find({}).count();
  if (total) throw new Error("한번만 입력할 수 있습니다.");

  const cData = (data as string[][])
    .slice(1)
    .reverse()
    .filter(([name]) => name)
    .map(
      (
        [
          no,
          name,
          company,
          level,
          reason,
          createdDate,
          expirationDate,
          registrationNumber,
          address,
          barcode,
          unit,
          howToRespond,
          details,
          ...thumbnails
        ],
        i
      ) => {
        return {
          id: i,
          name: name?.trim(),
          company: company?.trim(),
          level: level?.trim(),
          reason: reason?.trim(),
          expirationDate: expirationDate?.trim(),
          registrationNumber: (registrationNumber + "")?.trim(),
          address: address?.trim(),
          barcode: barcode?.trim(),
          unit: unit?.trim(),
          howToRespond: howToRespond?.trim(),
          details: details?.trim(),
          thumbnails: thumbnails?.map((str) => str?.trim()),
        };
      }
    );
  // console.log(cData);
  await ss.insertMany(cData, {ordered: false});
};

export const syncFunctionalityDetail = async () => {
  const [{data}] = getXlsx("data/$functionality_details.xlsx");
  // console.log(data.slice(1));
  const result = {} as any;
  let lastId: string = "";
  for (const [id, type, label, contentType, content] of data.slice(1)) {
    if (id) {
      lastId = id as string;
      result[lastId] = [] as [string, string][];
    }

    if (contentType === "제목") {
      result[lastId].push([content]);
    } else if (contentType === "내용") {
      const target = result[lastId];
      target[target.length - 1][1] = content;
    }
  }
  // console.log(result);

  for (const id in result) {
    const fs = await getCollection<Functionalities>("_functionalities");
    await fs.updateOne({id}, {$set: {content: result[id]}});
  }
};

export const syncFunctionalMaterialsUnit = async () => {
  const [{data}] = getXlsx("data/$mat-unit.xlsx");
  const fm = getCollection<FunctionalityMaterials>("_functionality-materials");

  for (const [type, func, unit, company, no, name, warn] of data.slice(
    1
  ) as string[][]) {
    if (!no) continue;
    const matNo = no?.split(",").shift() ?? "";
    console.log(matNo, unit);
    await fm.updateOne({no: {$in: [matNo]}}, {$set: {unit}});
    // break;
  }
};
