import { v4 as uuidv4 } from "uuid";
import app from "../http/server";
import request from "supertest";

let createRes: any; // Declarar a variável no escopo superior para que ambos os testes possam acessá-la

describe("testing users module", () => {
  it("should return created user", async () => {
    const createPayload = {
      email: "gabrielscaranoo@unesp.br",
      senha: "1234",
      nome: "Gabriel",
      data_nascimento: new Date("2023-10-23"),
    };

    createRes = await request(app).post("/usuario").send(createPayload);

    expect(createRes.statusCode).toEqual(201);
  });

  it("should return user token", async () => {
    const payload = {
      email: "gabrielscaranoo@unesp.br",
      senha: "1234",
    };

    const res = await request(app).post("/login").send(payload);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it ("should return email not found message", async () => {
    const payload = {
      email: "gabrielscarano1@unesp.br",
      senha: "1234",
    };

    const res = await request(app).post("/login").send(payload);
    expect(res.statusCode).toEqual(404);
  });

  it ("should return wrong password message", async () => {
    const payload = {
      email: "gabrielscaranoo@unesp.br",
      senha: "12345",
    };

    const res = await request(app).post("/login").send(payload);
    expect(res.statusCode).toEqual(401);
  });

  it("should return user already created", async () => {
    const createPayload = {
      email: "gabrielscaranoo@unesp.br",
      nome: "Gabriel",
      senha: "1234",
      data_nascimento: new Date("2023-10-23"),
    };

    const res = await request(app).post("/usuario").send(createPayload);

    console.log(res.body);

    expect(res.statusCode).toEqual(409);
  });

  it("should return updated user", async () => {
    const createdUser = createRes.body;

    const updatePayload = {
      id: createdUser.id,
      nome: createdUser.email,
    };

    const updateRes = await request(app).put("/usuario").send(updatePayload);

    expect(updateRes.statusCode).toBe(200);
  });

  it("should return user not found", async () => {
    const createdUser = createRes.body;
    let idToBeSearched = uuidv4();

    // para garantir que o id que seja gerado não seja igual ao do usuário criado anteriormente
    while (idToBeSearched == createdUser.id) idToBeSearched = uuidv4();

    const updatePayload = {
      id: idToBeSearched,
      nome: createdUser.email,
    };

    const updateRes = await request(app).put("/usuario").send(updatePayload);

    expect(updateRes.statusCode).toBe(404);
  });

  it("should get user", async () => {
    const getRes = await request(app).get(`/usuario/${createRes.body.id}`);

    expect(getRes.statusCode).toBe(200);
  });

  it("should return user not found", async () => {
    const userId = createRes.body.id;
    let idToBeSearched = uuidv4();

    // para garantir que o id que seja gerado não seja igual ao do usuário criado anteriormente
    while (idToBeSearched == userId) idToBeSearched = uuidv4();

    const getRes = await request(app).get(`/usuario/${idToBeSearched}`);

    expect(getRes.statusCode).toBe(404);
  });

  it("should return user not found", async () => {
    const userId = createRes.body.id;
    let idToBeSearched = uuidv4();

    // para garantir que o id que seja gerado não seja igual ao do usuário criado anteriormente
    while (idToBeSearched == userId) idToBeSearched = uuidv4();

    const deleteRes = await request(app).delete(`/usuario/${idToBeSearched}`);

    expect(deleteRes.statusCode).toBe(404);
  });

  it("should delete user", async () => {
    const deleteRes = await request(app).delete(
      `/usuario/${createRes.body.id}`
    );

    expect(deleteRes.statusCode).toBe(200);
  });
});
