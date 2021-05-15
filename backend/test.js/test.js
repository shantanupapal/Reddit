var assert = require("chai").assert;
var app = require("../index");

var chai = require("chai");
chai.use(require("chai-http"));
var expect = require("chai").expect;

var agent = require("chai").request.agent(app);

describe("Reddit - Group12", function () {
  describe("Login Test", function () {
    it("Incorrect Password", () => {
      agent
        .post("/api/login")
        .send({ email: "bob@gmail.com", password: "abcd" })
        .then(function (res) {
          expect(res.text).to.equal("INCORRECT_PASSWORD");
        })
        .catch((error) => {
          console.log(error);
        });
    });

    it("Invalid User", () => {
      agent
        .post("/api/login")
        .send({ email: "bob1@gmail.com", password: "bob" })
        .then(function (res) {
          expect(res.text).to.equal("NO_USER");
        })
        .catch((error) => {
          console.log(error);
        });
    });

    it("Successful Login", () => {
      agent
        .post("/api/login")
        .send({ email: "bob@gmail.com", password: "bob" })
        .then(function (res) {
          expect(res.status).to.equal(200);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  });
});

describe("User Signup Test", () => {
  it("User Exists", () => {
    agent
      .post("/api/signup")
      .send({
        userName: "bob",
        email: "bob@gmail.com",
        password: "bob",
      })
      .then(function (res) {
        expect(res.text).to.equal("USER_EXISTS");
      })
      .catch((error) => {
        console.log(error);
      });
  });

  it("Successful User Signup", () => {
    agent
      .post("/api/signup")
      .send({
        userName: "tom",
        email: "tom@gmail.com",
        password: "tom",
      })
      .then(function (res) {
        expect(res.status).to.equal(200);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

describe("User Profile Test", () => {
  it("Fetch user Name from user id", function () {
    agent
      .get("/api/profile/609efddc8693217bbc094ec4")
      .then(function (res) {
        expect(JSON.parse(res.text)[0].userName).to.equal("Andy");
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
describe(" Create Community Test", () => {
  it("Create community", () => {
    agent
      .post("/api/createcommunity")
      .send({
        communityName: "Test",
        topics: "Art",
        description: "New Community",
      })
      .then(function (res) {
        expect(res.status).to.equal(200);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

describe("get My community Details", () => {
  it("Fetch all community detils", function () {
    agent
      .get("/api/mycommunity/getCommunityDetails")
      .then(function (res) {
        expect(res.status).to.equal(200);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

describe("get all communities user is part of", () => {
  it("fetch the communities the user is part of", function () {
    agent
      .get("/api/moderation/getAllCommunities/609efddc8693217bbc094ec4")
      .then(function (res) {
        expect(res.status).to.equal(200);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

describe("Dashboard ", () => {
  it("fetch the dashboard details", function () {
    agent
      .get("/dashboard")
      .then(function (res) {
        expect(res.status).to.equal(200);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

describe("View Profile ", () => {
  it("fetch the user profile details", function () {
    agent
      .get("/api/viewprofile/609efddc8693217bbc094ec4")
      .then(function (res) {
        expect(res.status).to.equal(200);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

describe("All community Details for Community search page", () => {
  it("fetch the communities the user is part of", function () {
    agent
      .get("/api/search/getAllCommunities/")
      .then(function (res) {
        expect(res.status).to.equal(200);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
