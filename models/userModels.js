import { readFile } from "fs/promises";
import { v4 as uuid } from "uuid";
import { writeToFile } from "../helper.js";

let users = JSON.parse(
  await readFile(new URL("./../data/users.json", import.meta.url))
);

export const findAll = async () => {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
};

export const findById = async (id) => {
  return new Promise((resolve, reject) => {
    const user = users.find((el) => el.id === id);
    resolve(user);
  });
};

export const create = async (user) => {
  return new Promise((resolve, reject) => {
    const newUser = { id: uuid(), ...user };
    users.push(newUser);
    writeToFile("./data/users.json", users);
    resolve(newUser);
  });
};

export const update = async (id, user) => {
  return new Promise((resolve, reject) => {
    const index = users.findIndex((el) => el.id === id);
    users[index] = { id, ...user };
    writeToFile("./data/users.json", users);
    resolve(users[index]);
  });
};

export const remove = async (id) => {
  return new Promise((resolve, reject) => {
    users = users.filter((el) => el.id !== id);
    writeToFile("./data/users.json", users);
    resolve("");
  });
};
