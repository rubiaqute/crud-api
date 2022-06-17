import { readFile } from "fs/promises";
import { v4 as uuid } from "uuid";
import { writeToFile } from "./../helper";


export interface IUser {
  id?: string,
  username: string,
  age: number,
  hobbies: string[]
}
let users: IUser[] = require("./../data/users.json")

export const findAll = async () => {
  return new Promise((resolve, reject) => {
    resolve(users);
  });
};

export const findById = async (id: string): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    const user = users.find((el: IUser) => el.id === id);
    resolve(user);
  });
};

export const create = async (user: IUser) => {
  return new Promise((resolve, reject) => {
    const newUser = { id: uuid(), ...user };
    users.push(newUser);
    writeToFile("./data/users.json", users);
    resolve(newUser);
  });
};

export const update = async (id: string, user: IUser) => {
  return new Promise((resolve, reject) => {
    const index = users.findIndex((el: IUser) => el.id === id);
    users[index] = { id, ...user };
    writeToFile("./data/users.json", users);
    resolve(users[index]);
  });
};

export const remove = async (id: string) => {
  return new Promise((resolve, reject) => {
    users = users.filter((el: IUser) => el.id !== id);
    writeToFile("./data/users.json", users);
    resolve("");
  });
};
