import * as fs from "fs";

export const writeToFile = (filename, content) => {
  fs.writeFile(
    "./data/users.json",
    JSON.stringify(content),
    "utf-8",
    (error) => {
      if (error) console.log(error);
    }
  );
};
