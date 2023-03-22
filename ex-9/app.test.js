const supertest = require("supertest");

const createApp = require("./app.js");

const request = supertest(createApp);

test("GET /", async () => {
  const response = await request
    .get("/")
    .expect(200)
    .expect("Content-Type", "text/html");

  expect(response.text).toEqual("<html><body><h1>Welcome to the World Wide Web!</h1></body></html>");
});