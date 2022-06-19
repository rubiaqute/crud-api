const request = require("supertest");
const { api } = require("./../api.ts");

describe("Get Users", () => {
  it("should return users", async () => {
    const users = require("./../data/users.json");
    const res = await request(api).get("/api/users").send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(users);
  });
});
