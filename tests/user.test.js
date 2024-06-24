import request from "supertest";
import app from "..";
import mongoose from "mongoose";
import User from "../src/models/user.model";
import jwt from 'jsonwebtoken';

let token;
let testUser;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await User.deleteMany();

  testUser = await User.create({
    email: "test_user@example.com",
    name: "Test User",
    age: 30,
    city: "Test City",
    zipCode: "12345",
  });

  token = jwt.sign({ id: testUser._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("User API", () => {
  test("POST /api/worko/user should create a user", async () => {
    const res = await request(app)
      .post("/api/worko/user")
      .send({
        email: "newuser@example.com",
        name: "New User",
        age: 25,
        city: "New City",
        zipCode: "54321",
      })
      .set("Authorization", `Bearer ${token}`);

    console.log(res.body); 
    expect(res.statusCode).toEqual(201);
    expect(res.body.email).toEqual("newuser@example.com");
  });

  test("GET /api/worko/user should list users", async () => {
    const res = await request(app)
      .get("/api/worko/user")
      .set("Authorization", `Bearer ${token}`);

    console.log(res.body); 
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  test("GET /api/worko/user/:userId should get user details", async () => {
    const res = await request(app)
      .get(`/api/worko/user/${testUser._id}`)
      .set("Authorization", `Bearer ${token}`);

    console.log(res.body); 
    expect(res.statusCode).toEqual(200);
    expect(res.body.email).toEqual(testUser.email);
  });

  test("PUT /api/worko/user/:userId should update user details", async () => {
    const res = await request(app)
      .put(`/api/worko/user/${testUser._id}`)
      .send({ name: "Updated User", age: 31 })
      .set("Authorization", `Bearer ${token}`);

    console.log(res.body); 
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual("Updated User");
  });

  test("PATCH /api/worko/user/:userId should partially update user details", async () => {
    const res = await request(app)
      .patch(`/api/worko/user/${testUser._id}`)
      .send({ city: "Updated City" })
      .set("Authorization", `Bearer ${token}`);

    console.log(res.body); 
    expect(res.statusCode).toEqual(200);
    expect(res.body.city).toEqual("Updated City");
  });

  test("DELETE /api/worko/user/:userId should soft delete user", async () => {
    const res = await request(app)
      .delete(`/api/worko/user/${testUser._id}`)
      .set("Authorization", `Bearer ${token}`);

    console.log(res.body); 
    expect(res.statusCode).toEqual(200);
    const deletedUser = await User.findById(testUser._id);
    expect(deletedUser.isDeleted).toEqual(true); 
  });
});
