/* 3rd party libraries */
const path = require("path");
const { expect } = require("chai");
const request = require("supertest");

/* Local import */
const { app } = require(path.resolve(__dirname + "./../../index"));

describe("GET /reviews/", () => {
    it("should return all reviews", done => {

        request(app)
            .get(`/reviews/`)
            .expect(200)
            .expect( response => {
                expect(response.body).to.be.an('array');
            })
            .end(done);
    });
});