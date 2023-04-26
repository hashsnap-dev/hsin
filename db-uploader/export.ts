import os from "os";
import path from "path";
import fs from "fs";
import {execSync} from "child_process";
import AWS from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();

const HOMEDIR = os.homedir();
const HSIN_DB = path.resolve(HOMEDIR, ".hsin-db");
const HSIN_DUMP = path.resolve(HSIN_DB, "dump");

if (!fs.existsSync(HSIN_DB)) fs.mkdirSync(HSIN_DB);
if (fs.existsSync(HSIN_DUMP)) {
  fs.rmSync(HSIN_DUMP, {recursive: true, force: true});
}
const last_arg = process.argv.pop();
const zipName = process.argv.length > 2 ? last_arg : Date.now() + "";
console.log(zipName);

execSync(`mongodump --db hsin -o ${HSIN_DUMP}`);
execSync(`mongodump --db hsin-food-photo -o ${HSIN_DUMP}`);

try {
  execSync(
    `cd ${HSIN_DB} && zip -r ${path.join(
      HSIN_DB,
      `${zipName}_hsin.zip`
    )} dump/hsin`
  );
} catch {
  console.log("no dump/hsin");
}
try {
  execSync(
    `cd ${HSIN_DB} && zip -r ${path.join(
      HSIN_DB,
      `${zipName}_hsin-food-photo.zip`
    )} dump/hsin-food-photo`
  );
} catch {
  console.log("no dump/hsin-food-photo");
}

try {
  execSync(`start ${HSIN_DB}`);
} catch {}

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESSKEY_ID,
  secretAccessKey: process.env.SECRETACCESSKEY,
  region: process.env.REGION,
});

const main = async () => {
  try {
    await s3
      .upload({
        Bucket: "health-functional-food",
        Key: `data/${zipName}_hsin.zip`,
        Body: fs.createReadStream(path.join(HSIN_DB, `${zipName}_hsin.zip`)),
      })
      .promise();
  } catch (err) {
    console.log(err);
  }

  try {
    await s3
      .upload({
        Bucket: "health-functional-food",
        Key: `data/${zipName}_hsin-food-photo.zip`,
        Body: fs.createReadStream(
          path.join(HSIN_DB, `${zipName}_hsin-food-photo.zip`)
        ),
      })
      .promise();
  } catch (err) {
    console.log(err);
  }
};
main();
