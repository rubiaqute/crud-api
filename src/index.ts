import * as dotenv from "dotenv";
dotenv.config({ path: "./.env.js" });
import * as http from "http";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "./controls/userControls";

const PORT = process.env.PORT;

const api = http.createServer((req, res) => {
  if (req.url === "/api/users" && req.method === "GET") {
    getUsers(req, res);
  } else if (
    req.url.match(/\/api\/users\/([0-9a-z-]+)/) &&
    req.method === "GET"
  ) {
    const id = req.url.split("/")[3];
    getUser(req, res, id);
  } else if (req.url === "/api/users" && req.method === "POST") {
    createUser(req, res);
  } else if (
    req.url.match(/\/api\/users\/([0-9a-z-]+)/) &&
    req.method === "PUT"
  ) {
    const id = req.url.split("/")[3];
    updateUser(req, res, id);
  } else if (
    req.url.match(/\/api\/users\/([0-9a-z-]+)/) &&
    req.method === "DELETE"
  ) {
    const id = req.url.split("/")[3];
    deleteUser(req, res, id);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Rote not found" }));
  }
});
api.listen(PORT, () => console.log(`Your port is ${PORT}`));
