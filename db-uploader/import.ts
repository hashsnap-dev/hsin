import os from "os";
import path from "path";
import fs from "fs";
import {execSync} from "child_process";
import AWS from "aws-sdk";
import dotenv from "dotenv";
import {MongoClient} from "mongodb";

const osPaths = require("os-paths");
dotenv.config();
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

const HOMEDIR = osPaths.home();
// const HOMEDIR = os.homedir();
const HSIN_DB = path.join(HOMEDIR, ".hsin-db").replace(/\\/g, "\\\\");
const HSIN_DUMP = path.join(HSIN_DB, "dump").replace(/\\/g, "\\\\");

if (!fs.existsSync(HSIN_DB)) fs.mkdirSync(HSIN_DB);
if (fs.existsSync(HSIN_DUMP)) {
  fs.rmSync(HSIN_DUMP, {recursive: true, force: true});
}

const last_arg = process.argv.pop();
if (process.argv.length === 1) throw "Need argument!";
const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESSKEY_ID,
  secretAccessKey: process.env.SECRETACCESSKEY,
  region: process.env.REGION,
});
console.log("HSIN_DB", HSIN_DB);
const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));
const main = async () => {
  const promise = new Promise((res, rej) => {
    s3.getObject(
      {
        Bucket: "health-functional-food",
        Key: `data/${last_arg}`,
      },
      (err, data) => {
        if (err) rej(err);
        fs.writeFileSync(`${HSIN_DB}/${last_arg}`, data.Body as any);
        res(null);
      }
    );
  });
  await promise;
  await sleep(1000);
  execSync(`cd ${HSIN_DB} && unzip ${last_arg}`);
  await client.connect();

  await client
    .db(last_arg?.split(".").shift()?.split("_").pop() ?? "")
    .dropDatabase();

  execSync(`mongorestore ${HSIN_DUMP}`);

  process.exit();
};
main();
