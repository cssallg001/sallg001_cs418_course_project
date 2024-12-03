import { expect } from "chai";
import supertest from "supertest";
import app from "../app.js";

describe('Addition Testing', ()=>{

    it('Should Add two numbers',function(){
        var num1=2;
        var num2=5;
        expect(num1+num2).equal(7)
    })

    it('Should Add 3 numbers',function(){
        var num1=2;
        var num2=5;
        var num3=1;
        expect(num1+num2+num3).equal(8)
    })

    it('Should Add 4 numbers',function(){
        var num1=2;
        var num2=5;
        var num3=1;
        var num4=6;
        expect(num1+num2+num3+num4).equal(14)
    })

})

describe('TEST: List All Courses And Prerequisites in Database', ()=>{

    it('Testing Positive Case of Retrieving Courses',async function(){
       
        var response = await supertest(app).get(`/course`).send({
        })

        expect(response.status).equal(200)
    })

    it('Testing Positive Case of Retrieving Prerequisites',async function(){
       
        var response = await supertest(app).get(`/prerequisites`).send({
        })

        expect(response.status).equal(200)
    })

})

describe('TEST: Logging In', ()=>{

    it('Testing Positive Case of Login API',async function(){
       
        var response = await supertest(app).post(`/user/login/test`).send({
             email: "seanallgaier@yahoo.com",
             Password: "password123"
        })

        expect(response.status).equal(200)
    })
})


describe('TEST: Retrieving All Advising Requests Stored in Database', ()=>{

    it('Testing Positive Case of Retrieving Advising Requests',async function(){
       
        var response = await supertest(app).get(`/user_registration/advisingRequests`)

        expect(response.status).equal(200)
    })
})
