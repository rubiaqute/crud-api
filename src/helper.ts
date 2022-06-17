import * as fs from "fs";
import path from "path"
import * as url from "url";

export const writeToFile = (filename, content) => {
  fs.writeFile(
    path.resolve(__dirname, "data", "users.json"),
    JSON.stringify(content),
    "utf-8",
    (error) => {
      if (error) console.log(error);
    }
  );
};
