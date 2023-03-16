const request = require('supertest');
const app = require('../server.js');
const chai = require('chai');
const { response } = require('express');
// let chaiHttp = require("chai-http")
const expect = chai.expect;


describe('Tasks API', () => {

    describe("GET, /api/tasks", () => {
        it("It should GET all the tasks", (done) => {
            chai.request(server)
                .get("/api/tasks")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                done();
                })
        })
    })


})
