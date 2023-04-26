import {ForeignFoodDetail, ForeignFoodList, FunctionalityMaterials} from "hsin";
import {
  syncFunctionalMaterials,
  syncIntegrationFoodList,
} from "../lib/foodsafety-api";
import {getCollection, init, mongoInited, syncWarnToFood} from "../lib/mongodb";
import {getXlsx, syncMatsToEatTogether} from "../lib/xlsx";
init();
const main = async () => {
  await mongoInited.promise;
  const ffl = getCollection<ForeignFoodList>("_foreign-food-list");
  const ffd = getCollection<ForeignFoodDetail>("_foreign-food-detail");
  const fm = await getCollection<FunctionalityMaterials>(
    "_functionality-materials"
  ); 
  // 신고번호, 수입업체, 제품명(한글), 제품명(영문), 제조/작업/수출업소, 신고필증발급일자(YYYY-MM-DD), 제조국, 수출국, 유통기한 시작(YYYY-MM-DD), 유통기한 종료(YYYY-MM-DD), 기능성 원료(신고번호로 \\로 구분), 기타 원료(\\로 구분)
  const [{data}] = getXlsx("data/$foreign-food.xlsx");
  const foods = data.slice(1) as [
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
    string
  ][];
  const {length} = data;
  let i = 0;
  for (const item of foods) {
    const [
      rcno,
      bsnOfcName,
      prductKoreanNm,
      prductNm,
      ovsmnfstNm,
      ceimdecDtm,
      mnfNtnnm,
      xportNtnnm,
      expirdeBeginDtm,
      expirdeEndDtm,
      itmList,
      irdntList,
    ] = item.map((i) => i + "");

    try {
      console.log(`${++i}/${length - 1}`);
      if (!rcno.trim()) continue;
      if (!(await ffl.findOne({rcno}))) {
        const fflItem: ForeignFoodList = {
          rcno,
          bsnOfcName,
          prductKoreanNm,
          prductNm,
          ovsmnfstNm: "",
          procsDtm: "",
          mnfNtnnm: "",
          xportNtnnm: "",
        };
        await ffl.insertOne(fflItem);
      }

      if (!(await ffd.findOne({rcno}))) {
        const mats = await fm
          .find({no: {$in: itmList.split("\\\\")}})
          .toArray();

        const ffdItem: ForeignFoodDetail = {
          rcno,
          rtrvldsuseList: [],
          foodHistInfo: {histNo: "", histCnt: 0, histList: []},
          itmList: mats.map(({name}, i) => {
            return {
              sn: i + 1,
              itmCd: "",
              itmNm: name,
            };
          }),
          irdntList: irdntList.split("\\\\").map((name, i) => {
            return {
              sn: i + 1,
              koreanNm: name,
              rcno: "",
              irdntCd: "",
              engNm: "",
            };
          }),
          refrigcnvrsList: [],
          foodDetailInfo: {
            rpsntItmNm: "",
            ovsmnfstCd: "",
            prductKoreanNm,
            ovsmnfstNm,
            expirdeBeginDtm,
            ovsmnfstAddr: "",
            rcno,
            jdgmntManagtSeCd: "",
            xportNtncd: "",
            ceimdecDtm,
            prcssEndDtm: "",
            ovsmnfstAreaNm: null,
            prductNm,
            expirdeEndDtm,
            rpsntItmCd: "",
            dclPrductSeNm: "",
            impOwrLcsno: "",
            xportNtnnm,
            dclPrductSeCd: "",
            mnfNtncd: "",
            procsDtm: ceimdecDtm,
            impdclProgrsSttusCd: "",
            ovsmnfstCmpnyNm: ovsmnfstNm,
            mnfNtnnm,
          },
        };

        await ffd.insertOne(ffdItem);
      }
    } catch (err) {
      console.log(`[${rcno}]: error`);
      console.log(err);
    }
  }
  await syncFunctionalMaterials(); // * I0030 / _foreign-food-detail  기준으로 기능성원료 분류 후 _domestic-food-materials에 저장
  await syncIntegrationFoodList();
  // await syncWarnToFood();
  // await syncMatsToEatTogether(); // * 의약품 병용섭취 정보 원료 연결
  process.exit();
};

main();
