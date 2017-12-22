/* 3rd party libraries */
const path = require("path");
const { expect } = require("chai");
const request = require("supertest");

/* Local import */
const { app } = require(path.resolve(__dirname + "./../../index"));

describe("GET /sms/", () => {
    it("should return all sms", done => {

        request(app)
            .get(`/sms/`)
            .expect(200)
            .expect( response => {
                expect(response.body).to.be.an('array');
            })
            .end(done);
    });
});