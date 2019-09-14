const request = require("supertest");
const server = require("../api/server.js");
const DB = require("../data/db-config.js");
// const chefModel = require("./chefsModel.js");

describe("Chef Authorized Routes", () => {
  let token;
  // it creates a fresh user for each test
  // if the beforeEach fails, unless err says otherwise its
  // likely the /register endpoint post request malfunctioning
  beforeEach(async done => {
    // clears DB so /api/chefs/1 has matching data
    await DB("chefs").truncate();
    // retrieves token before each restricted route
    request(server)
      .post("/api/chefs/register")
      .send({
        username: "user",
        password: "pw",
        name: "chef",
        city: "city",
        state: "state",
        email: "email@email.com"
      })
      .end((err, response) => {
        token = response.body.token;
        done();
      });
  });

  describe("GET request to /api/chefs/:id", () => {
    //should refer to the same row every time because of beforeEach
    it("should return status 401 without JWT", () => {
      return request(server)
        .get("/api/chefs/1")
        .then(res => {
          expect(res.statusCode).toBe(401);
        });
    });
    it("should return status 200 with JWT", () => {
      return request(server)
        .post("/api/chefs/1")
        .set("authorization", `${token}`)
        .then(res => {
          expect(res.statusCode).toBe(200);
        });
    });
  });

  describe("POST request to /api/chefs/login", () => {
    it("should return status 401 without valid user info", () => {
      return request(server)
        .post("/api/chefs/login")
        .send({
          username: "fakeusername",
          password: "fakepass"
        })
        .expect(401);
    });
    it("should return status 200 with valid user info", () => {
      return request(server)
        .post("/api/chefs/login")
        .send({
          username: "user",
          password: "pw"
        })
        .expect(200);
    });
    it("should return a JSON object", () => {
      return request(server)
        .post("/api/chefs/login")
        .send({
          username: "user",
          password: "pw"
        })
        .expect("Content-Type", /json/);
    });
  });
  describe("PUT request to /api/chefs/:id", () => {
    // it("should return status 400 without updated info", () => {
    //   return (
    //     request(server)
    //       .put("/api/chefs/1")
    //       .send({

    //       })
    //       //returns count of rows updated "0"
    //       .expect(200, "0")
    //   );
    // });
    it("should return status 200 changed content", () => {
      return (
        request(server)
          .put("/api/chefs/1")
          .send({
            username: "updated"
          })
          //returns count of rows updated "1"
          .expect(200, "1")
      );
    });
  });
  describe("DELETE request to /api/chefs/:id", () => {
    it("should return status 404 with invalid id param", async () => {
      return request(server)
        .delete("/api/chefs/:1")
        .expect(204);
    });
  });
});
