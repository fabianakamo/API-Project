import UserRepository from "../src/repositories/UserRepository";
import request from "supertest";
import app from "../src/server";

describe("Test app server", () => {
  // TESTE 1 - Se a rota de GET retorna "message: "Solutions Lab: Projeto API"" significa que está tudo ok
  it("Should get main route", async () => {
    const res = await request(app).get("/");

    expect(res.body).toHaveProperty("message");
  });

  // Essa maneira modifica o bando de dados, é preciso utilizar o mecanismo de mock.
  // it("should get post (register) route", async () => {
  //   const res = await request(app).post("/api").send({
  //     name: "Jao",
  //     email: "jao@rethink.dev",
  //     password: "Fabiana88@",
  //     confirmPassword: "Fabiana88@",
  //   });

  //   expect(res.statusCode).toEqual(200);
  //   expect(res.body).toHaveProperty("message");
  // });

  it("should get post (register) route", async () => {
    jest.spyOn(UserRepository, "writeData").mockResolvedValue();

    const res = await request(app).post("/api").send({
      name: "Karol",
      email: "karol@rethink.dev",
      password: "Fabiana88@",
      confirmPassword: "Fabiana88@",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message");
  });

  it("email already exists", async () => {
    jest.spyOn(UserRepository, "writeData").mockImplementation(() => {
      throw new Error("Email já existe");
    });
    const res = await request(app).post("/api").send({
      name: "Karol",
      email: "karol@rethink.dev",
      password: "Fabiana88@",
      confirmPassword: "Fabiana88@",
    });
    console.log(res.body);

    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty("Error");
    expect(res.body.Error).toBe("Email já existe");
    expect(res.body).toHaveProperty("stack");
  });
});

//npx jest --coverage
