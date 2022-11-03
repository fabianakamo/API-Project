import request from "supertest";
import app from "../src/server";

describe("Test app server", () => {
  it("should get main route", async () => {
    const res = await request(app).post("/");

    // console.log(res);
    expect(res.body).toHaveProperty("message");
  });
});
