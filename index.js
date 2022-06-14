import * as dotenv from "dotenv";
dotenv.config({ path: "./.env.js" });
import * as http from "http";
import { getUsers, getUser, createUser } from "./controls/userControls.js";

const PORT = process.env.PORT;

const api = http.createServer((req, res) => {
  if (req.url === "/api/users" && req.method === "GET") {
    getUsers(req, res);
  } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === "GET") {
    const id = req.url.split("/")[3];
    getUser(req, res, id);
  } else if (req.url === "/api/users" && req.method === "POST") {
    createUser(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Rote not found" }));
  }
});
api.listen(PORT, () => console.log(`Your port is ${PORT}`));
