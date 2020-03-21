const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { Admin } = require('../models')


describe('Admin Routes',() => {
    afterAll((done) => {
        Admin
            .destroy({
                where : {}
            })
            .then(response => {
                done()
            })
            .catch(err => done(err))
    })

    describe('Admin Registration Test', () => {

        describe('Admin Registration Success', () => {
            test('it should return new object and status 201', (done) => {
                request(app)
                    .post('/register')
                    .send({
                        email: "mama@mail.com",
                        password: "123456"
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.body).toHaveProperty('id', expect.any(Number))
                        expect(response.body).toHaveProperty('email', expect.any(String))
                        expect(response.status).toBe(201)
                        done()
                    })
            }) 
        })

        describe('Admin Regitsration Error', () => {
            test('it should return array of errors and status 400 with error Email is required and password is required', (done) => {
                request(app)
                    .post('/register')
                    .send({
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.body).toHaveProperty('errors')
                        expect(response.body.errors.length).toBeGreaterThan(0)
                        expect(response.body.errors).toContain("Email is required")
                        // expect(response.body.errors).toContain("Invalid email format!")
                        expect(response.body.errors).toContain("Password is required")
                        // expect(response.body.errors).toContain("Password length must between 6 and 14")
                        expect(response.status).toBe(400)
                        done()
                    })
            }) 
        })


        describe('Admin Regitsration Error', () => {
            const errors =  ["Email is required", "Invalid email format!", "Password is required", "Password length must between 6 and 14"]
            test('it should return array of errors and status 400', (done) => {
                request(app)
                    .post('/register')
                    .send({
                        email: 'maka@n',
                        password: 'a'
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.body).toHaveProperty('errors')
                        expect(response.body.errors.length).toBeGreaterThan(0)
                        // expect(response.body.errors).toContain("Email is required")
                        expect(response.body.errors).toContain("Invalid email format (mail@mail.com)")
                        // expect(response.body.errors).toContain("Password is required")
                        expect(response.body.errors).toContain("Password length must between 6 and 14")
                        expect(response.status).toBe(400)
                        done()
                    })
            }) 
        })

        describe('Admin Regitsration Error', () => {
            test('it should return array of errors and status 400 with error Email must be unique', (done) => {
                request(app)
                    .post('/register')
                    .send({
                        email: "mama@mail.com",
                        password: "123456"
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.body).toHaveProperty('errors')
                        expect(response.body.errors.length).toBeGreaterThan(0)
                        expect(response.body.errors).toContain("email must be unique")
                        expect(response.status).toBe(400)
                        done()
                    })
            }) 
        })
    })
    
    describe('Admin Login Test', () => {

        describe('Admin Login Success', () => {
            test('it should return new object and status 200', () => {
                request(app)
                    .post('/login')
                    .send({
                        email: 'mara@mail.com',
                        password: '123456'
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(200)
                        expect(response.body).toHaveProperty('access_token')
                        expect(response.body.access_token).toBe(expect.any(String))
                        done()
                    })
            }) 
        })

        describe('Admin Login Error', () => {
            test('it should return object and status 404', () => {
                request(app)
                    .post('/register')
                    .send({
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('error')
                        expect(response.body.error).toBe("email / password invalid")
                        done()
                    })
            }) 
        })
    })
})

