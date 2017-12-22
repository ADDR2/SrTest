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

    it("should return all restaurants filtered by min when min passed in params", done => {
        const min = 2;
        request(app)
            .get(`/restaurants?min=${min}`)
            .expect(200)
            .expect( response => {
                expect(response.body).to.be.an('array');

                response.body.forEach(restaurant => {
                    expect(restaurant.rating).to.be.at.least(min);
                    expect(restaurant.rating).to.be.at.most(5);
                });
            })
            .end(done);
    });

    it("should return all restaurants filtered by max when max passed in params", done => {
        const max = 4;
        request(app)
            .get(`/restaurants?max=${max}`)
            .expect(200)
            .expect( response => {
                expect(response.body).to.be.an('array');

                response.body.forEach(restaurant => {
                    expect(restaurant.rating).to.be.at.least(1);
                    expect(restaurant.rating).to.be.at.most(max);
                });
            })
            .end(done);
    });

    it("should return all restaurants filtered by  min and max when min and max passed in params", done => {
        const max = 4;
        const min = 2;
        request(app)
            .get(`/restaurants?min=${min}&max=${max}`)
            .expect(200)
            .expect( response => {
                expect(response.body).to.be.an('array');

                response.body.forEach(restaurant => {
                    expect(restaurant.rating).to.be.at.least(min);
                    expect(restaurant.rating).to.be.at.most(max);
                });
            })
            .end(done);
    });

    it("should return 400 when non-number passed as min", done => {
        const min = "r";
        request(app)
            .get(`/restaurants?min=${min}`)
            .expect(400)
            .end(done);
    });

    it("should return 400 when non-number passed as max", done => {
        const max = true;
        request(app)
            .get(`/restaurants?max=${max}`)
            .expect(400)
            .end(done);
    });
});

describe("POST /restaurants/", () => {
    it("should return restaurant created", done => {
        const newRestaurant = {
            "id": "800",
            "logo": "logo.png",
            "commercialName": "Zume",
            "legalName": "Zume Pizza a.c",
            "commercialEmail": "zume@zume.com",
            "adminNumber": "3",
            "address": "California",
            "rating": 2,
            "Location": {
                "type": "Point",
                "coordinates": [41.43206,-81.38992]
            }
        };

        request(app)
            .post("/restaurants/")
            .send(newRestaurant)
            .expect(201)
            .expect( response => {
                expect(response.body).to.eql(newRestaurant)
            })
            .end( (error, response) => {
                if(error) return done(error);

                done();
            })
    });

    it("should return 500 when bad data sent", done => {
        const newRestaurant = {
            "id": "800",
            "logo": "logo.png",
            "commercialName": "Zume",
            "legalName": "Zume Pizza a.c",
            "commercialEmail": "zume@zume.com",
            "adminNumber": "3",
            "address": 543654,
            "rating": "WRONG",
            "Location": "WRONG"
        } ;

        request(app)
            .post("/restaurants/")
            .send(newRestaurant)
            .expect(500)
            .end(done)
    });
});

describe("DELETE /restaurants/:id", () => {
    it("should remove restaurant", done => {
        request(app)
            .delete("/restaurants/200")
            .expect(200)
            .end(done)
    });

    it("should return 400 when id not found", done => {
        request(app)
            .delete("/restaurants/30")
            .expect(400)
            .end(done)
    });
});