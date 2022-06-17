const request = require("supertest");
const { api } = require("./../api.ts");
let id;
const user = {
  username: "Jest Jestovich",
  age: 12,
  hobbies: ["testing"],
};
describe("Create User", () => {
  it("should create user", async () => {
    const res = await request(api)
      .post("/api/users")
      .send({
        username: "Jest Jestovich",
        age: 12,
        hobbies: ["testing"],
      });
    id = res.body.id;
    expect(res.statusCode).toEqual(201);
    expect(res.body.username).toEqual(user.username);
    expect(res.body.age).toEqual(user.age);
    expect(res.body.hobbies).toEqual(user.hobbies);
  });
});

describe("Get User", () => {
  it("should Get user", async () => {
    const res = await request(api).get(`/api/users/${id}`).send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.username).toEqual(user.username);
    expect(res.body.age).toEqual(user.age);
    expect(res.body.hobbies).toEqual(user.hobbies);
  });
});
