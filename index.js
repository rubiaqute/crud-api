import * as dotenv from "dotenv";
dotenv.config({ path: "./.env.js" });
import * as http from "http";
import { readFile } from "fs/promises";

const PORT = process.env.PORT;
const users = JSON.parse(
  await readFile(new URL("./data/users.json", import.meta.url))
);
const api = http.createServer((req, res) => {
  if (req.url === "/api/users") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(users));
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Rote not found" }));
  }
});
api.listen(PORT, () => console.log(`Your port is ${PORT}`));
