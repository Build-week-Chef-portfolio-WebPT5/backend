const request = require("supertest");
const server = require("./server.js");
const DB = require("../data/db-config.js");

describe("Chef Authorized Routes", () => {
  let token;
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

  describe("GET request to /api/chefs/1", () => {
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
});
