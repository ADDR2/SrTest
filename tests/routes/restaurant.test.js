/* 3rd party libraries */
const path = require("path");
const { expect } = require("chai");
const request = require("supertest");

/* Local import */
const { app } = require(path.resolve(__dirname + "./../../index"));

describe("GET /restaurants/", () => {
    it("should return all restaurants", done => {

        request(app)
            .get(`/restaurants/`)
            .expect(200)
            .expect( response => {
                expect(response.body).to.be.an('array');
            })
            .end(done);
    });
});