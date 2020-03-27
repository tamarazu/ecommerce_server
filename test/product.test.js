const app = require('../app')
const request = require('supertest')
const { Admin, Product } = require('../models')
const { checkPassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')


describe('Product Routes', () => {
    let productId
    let access_token
    const product = {
        name : "Bottle",
        image_url : "image.jpg",
        price: 12000,
        stock: 8
    }
    const adminDummy = {
        email: 'mara@mara.com',
        password: '123456'
    }

    beforeAll((done) => {
        Product
            .create(product)
            .then(product => {
                // console.log(product, '++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
                productId = product.id
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    afterAll((done) => {
        Product
            .destroy({
                where : {}
            })
            .then(response => {
                done()
            })
            .catch(err => done(err))
    })

    describe('Product Create Test', () => {
        describe('Product Create Success', () => {
            test('it should return new object and status 201', (done) => {
                request(app)
                    .post('/products')
                    .send(product)
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.body).toHaveProperty('id', expect.any(Number))
                        expect(response.body).toHaveProperty('name', expect.any(String))
                        expect(response.body).toHaveProperty('price', expect.any(Number))
                        expect(response.body).toHaveProperty('stock', expect.any(Number))
                        expect(response.status).toBe(201)
                        done()
                    })
            }) 
        })

        describe('Product Create Error', () => {
            let errors = ["Name is required",  "Image Url is required" ,"Price is required", "Price must greater than 0",  "Stock is required","Stock must be greater than 0", "Stock is not allowed with decimal value"]
            test('it should return array of errors for invalid format and status 400', (done) => {
                request(app)
                    .post('/products')
                    .send({
                        name : "",
                        image_url : "image.jpg",
                        price: -12000
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.body).toHaveProperty('errors')
                        expect(response.body.errors.length).toBeGreaterThan(0)
                        expect(response.body.errors).toContain("Name is required")
                        expect(response.body.errors).toContain("Price must greater than 0")
                        expect(response.status).toBe(400)
                        done()
                    })
            }) 
        })

        describe('Product Create Error', () => {
            let errors = ["Name is required",  "Image Url is required" ,"Price is required", "Price must greater than 0",  "Stock is required","Stock must be greater than 0", "Stock is not allowed with decimal value"]
            test('it should return array of errors about null value and status 400', (done) => {
                request(app)
                    .post('/products')
                    .send({
                        name : "",
                        image_url : "",
                        price: "",
                        stock: ""
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.body).toHaveProperty('errors')
                        expect(response.body.errors.length).toBeGreaterThan(0)
                        expect(response.body.errors).toContain("Name is required")
                        expect(response.body.errors).toContain("Image Url is required")
                        expect(response.body.errors).toContain("Price is required")
                        expect(response.body.errors).toContain("Stock is required")
                        expect(response.status).toBe(400)
                        done()
                    })
            }) 
        })
    })

    describe('Product Find All Test', () => {
        describe('Product Find All Success', () => {
            test('it should return array of find All object and status 200', (done) => {
                request(app)
                    .get('/products')
                    .end((err, response) => {
                        expect(err).toBe(null)
                        // expect(response.body).any(Array))
                        expect(response.status).toBe(200)
                        done()
                    })
            }) 
        })

        describe('Product Find All Error', () => {
            test('it should return object and status 404', (done) => {
                request(app)
                    .get('/product')
                    .end((err, response) => {
                        expect(err).toBe(null)
                        // expect(response.body).toHaveProperty('errors')
                        // expect(response.body.errors.length).toBeGreaterThan(0)
                        // expect(response.body.errors).toEqual(expect.arrayContaining(errors))
                        expect(response.status).toBe(404)
                        done()
                    })
            }) 
        })
    })

    describe('Product Find One Test', () => {
        describe('Product Find One Success', () => {
            test('it should return object  of product and status 200', (done) => {
                request(app)
                    .get(`/products/${productId}`)
                    .end((err, response) => {
                        expect(err).toBe(null)
                        // expect(response.body).toBe(expect.any(Array))
                        expect(response.status).toBe(200)
                        expect(response.body).toHaveProperty('id', expect.any(Number))
                        expect(response.body).toHaveProperty('name',expect.any(String))
                        expect(response.body).toHaveProperty('image_url',expect.any(String))
                        expect(response.body).toHaveProperty('price',expect.any(Number))
                        expect(response.body).toHaveProperty('stock',expect.any(Number))
                        done()
                    })
            }) 
        })

        describe('Product Find One Error', () => {
            test('it should return object and status 404', (done) => {
                request(app)
                    .get(`/products/1029`)
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.body).toHaveProperty('error')
                        expect(response.body.error).toContain("Product not found!")
                        // expect(response.body.errors).toEqual(expect.arrayContaining(errors))
                        expect(response.status).toBe(404)
                        done()
                    })
            }) 
        })
    })

    describe('Product Update Test', () => {
        describe('Product Update Success', () => {
            test('it should return object update and status 200', (done) => {
                request(app)
                    .put(`/products/${productId}`)
                    .send({
                        name : "Sauce Bottle"
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(200)
                        expect(response.body).toHaveProperty('id', expect.any(Number))
                        expect(response.body).toHaveProperty('name', expect.any(String))
                        expect(response.body).toHaveProperty('image_url', expect.any(String))
                        expect(response.body).toHaveProperty('price', expect.any(Number))
                        expect(response.body).toHaveProperty('stock', expect.any(Number))
                        done()
                    })
            }) 
        })

        describe('Product Update Error', () => {
            let errors = ["Price must greater than 0", "Stock must greater than 0", "Stock not allowed with decimal value"]
            test('it should return object because wrong format and status 400', (done) => {
                request(app)
                    .put(`/products/${productId}`)
                    .send({
                        name: '',
                        price: -12000,
                        stock: 2.5
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('errors')
                        expect(response.body.errors.length).toBeGreaterThan(0)
                        expect(response.body.errors).toContain("Name is required")
                        expect(response.body.errors).toContain("Price must greater than 0")
                        done()
                    })
            }) 
        })
    })

    describe('Product Delete Test', () => {


        describe('Product Delete Success', () => {
            test('it should return object and status 200', (done) => {
                request(app)
                    .delete(`/products/${productId}`)
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(200)
                        expect(response.body).toHaveProperty('id', expect.any(Number))
                        expect(response.body).toHaveProperty('name', expect.any(String))
                        expect(response.body).toHaveProperty('image_url', expect.any(String))
                        expect(response.body).toHaveProperty('price', expect.any(Number))
                        expect(response.body).toHaveProperty('stock', expect.any(Number))
                        done()
                    })
            }) 
        })

        describe('Product Delete Error', () => {
            test('it should return object and status 404', (done) => {
                request(app)
                    .delete(`/products/349`)
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(200)
                        // expect(response.body).toHaveProperty('error')
                        // expect(response.body.error).toBe("Product not found")
                        done()
                    })
            }) 
        })
    })
})
