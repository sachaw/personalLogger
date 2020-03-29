// import {} from "./typeLoader";
import csv from "csv-parser";
import { createReadStream, writeFileSync } from "fs";

const entries = [];

createReadStream("PersonalSheet.csv")
  .pipe(csv())
  .on("data", data => entries.push(data))
  .on("end", () => {
    // entries.forEach(entry => {
    //   console.log(entry);
    // });
    writeFileSync("output.json", JSON.stringify(entries));
  });
