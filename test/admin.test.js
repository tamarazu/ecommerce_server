const request = require('supertest')
const app = require('../app')


describe('Admin Routes', () => {

    describe('Admin Registration Test', () => {

        describe('Admin Registration Success', () => {
            test('it should return new object and status 201', () => {
                request(app)
                    .post('/register')
                    .send({
                        email: 'mara@mail.com',
                        password: '123456'
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(status).toBe(201)
                        expect('id').toBe(expect.any(Number))
                        expect('email').toBe('mara@mail.com')
                        done()
                    })
            }) 
        })

        describe('Admin Regitsration Error', () => {
            const errors =  ["Email is required", "Invalid email format!", "Password is required", "Password length must between 6 and 14"]
            test('it should return array of errors and status 400', () => {
                request(app)
                    .post('/register')
                    .send({
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(status).toBe(400)
                        expect('errors').toBe(expect.any(Array))
                        expect('errors').toBe(expect.arrayContaining(errors))
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
                        expect(status).toBe(200)
                        expect('access_token').toBe(expect.any(String))
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
                        expect(status).toBe(404)
                        expect('error').toBe("email / password invalid")
                        done()
                    })
            }) 
        })
    })
})
