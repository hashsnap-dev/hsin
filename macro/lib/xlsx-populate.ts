import { FunctionalityMaterials } from "hsin";
import { getCollection } from "./mongodb";

const XlsxPopulate = require("xlsx-populate");

type TextItem = {
  value: string;
  superscript: boolean;
};
export const syncFunctionalityMaterialDescription = async () => {
  const workbook = await XlsxPopulate.fromFileAsync("data/$mat-description.xlsx");

  const value = workbook.sheet(0).usedRange().value();

  const mats = value.filter(([a, b, c]: any) => c);

  const result: [string, TextItem[]][] = [];
  for (const [a, b, no, name, description] of mats) {
    const text: TextItem[] = [];
    if (typeof description === "string") {
      text.push({ value: description, superscript: false });
    } else {
      for (let i = 0; i < description.length; i++) {
        const fragment = description.get(i);
        const value = fragment.value();
        const { superscript } = fragment.style(["superscript", "subscript"]);
        text.push({
          value,
          superscript,
        });
      }
    }
 
    result.push([no, text]);
  }
  // console.log(result[1][1]);
  const fm = getCollection<FunctionalityMaterials>("_functionality-materials");

  const total = result.length;
  let i = 0;
  for (const [no, description] of result) {
    console.log(`${i++}/${total}`);
    await fm.updateOne({ no: { $in: [no] } }, { $set: { description } });
  }
};
