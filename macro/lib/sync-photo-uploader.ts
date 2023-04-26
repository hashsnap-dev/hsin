import { IntegrationFoodList } from "hsin";
import { client, getCollection } from "./mongodb";

export const syncPhotoUploader = async () => {
  const db = client.db("hsin-food-photo");
  const ifl = await getCollection<IntegrationFoodList>(
    "_integration-food-list"
  );
  const tmbList = await db.collection<any>("IntegrationFoodThumbnailList");

  const list = await ifl.find().toArray();

  const total = list.length;
  let i = 0;
  for (const item of list) {
    console.log(`${i++}/${total}`);
    const { type, report_no, name, company } = item;
    const food = await tmbList.findOne({ type, report_no });
    if (!food) {
      await tmbList.insertOne({
        type,
        report_no,
        name,
        company,
        thumbnails: [],
        url: "",
      });
    }
  }
  console.log("end");
};
