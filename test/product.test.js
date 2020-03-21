const app = require('../app')
const request = require('supertest')
const { Product } = require('../models')


describe('Product Routes', () => {
    let productId
    const product = {
        name : "Bottle",
        image_url : "image.jpg",
        price: 12000,
        stock: 8
    }

    beforeAll((done) => {
        Product
            .create(product)
            .then(product => {
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
            test('it should return new object and status 201', () => {
                request(app)
                    .get('/products')
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
            test('it should return array of errors and status 400', () => {
                request(app)
                    .get('/products')
                    .send({
                        name : "",
                        image_url : ""
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.body).toHaveProperty('errors')
                        expect(response.body.errors.length).toBeGreaterThan(0)
                        // expect(response.body.errors).toContain("Email is required")
                        expect(response.body.errors).toContain("Name is required")
                        expect(response.body.errors).toContain( "Image Url is required")
                        expect(response.body.errors).toContain("Price is required")
                        expect(response.body.errors).toContain("Stock is required")
                        expect(response.status).toBe(400)
                        done()
                    })
            }) 
        })

        describe('Product Create Error', () => {
            let errors = ["Name is required",  "Image Url is required" ,"Price is required", "Price must greater than 0",  "Stock is required","Stock must be greater than 0", "Stock is not allowed with decimal value"]
            test('it should return array of errors and status 400', () => {
                request(app)
                    .get('/products')
                    .send({
                        name : "Lipbalm",
                        image_url : "image.jpg",
                        price: -12000,
                        stock: 8.6
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.body).toHaveProperty('errors')
                        expect(response.body.errors.length).toBeGreaterThan(0)
                        // expect(response.body.errors).toContain("Email is required")
                        // expect(response.body.errors).toContain("Name is required")
                        // expect(response.body.errors).toContain( "Image Url is required")
                        expect(response.body.errors).toContain("Price must greater than 0")
                        expect(response.body.errors).toContain("Stock is not allowed with decimal value")
                        expect(response.status).toBe(400)
                        done()
                    })
            }) 
        })
    })

    describe('Product Find All Test', () => {
        describe('Product Find All Success', () => {
            test('it should return array of object and status 200', () => {
                request(app)
                    .get('/products')
                    .end((err, response) => {
                        expect(err).toBe(null)

                        expect(response.body).toBe(expect.any(Array))
                        expect(response.status).toBe(200)
                        // expect(response.body).toBe(expect.arrayContaining({
                        //     name : "Bottle",
                        //     image_url : "image.jpg",
                        //     price: 12000,
                        //     stock: 8
                        // }))
                        done()
                    })
            }) 
        })

        describe('Product Find All Error', () => {
            test('it should return object and status 404', () => {
                request(app)
                    .get('/products')
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.body).toHaveProperty('errors')
                        expect(response.body.errors.length).toBeGreaterThan(0)
                        // expect(response.body.errors).toEqual(expect.arrayContaining(errors))
                        expect(response.status).toBe(400)
                        done()
                    })
            }) 
        })
    })

    describe('Product Find One Test', () => {
        describe('Product Find One Success', () => {
            test('it should return object and status 200', () => {
                request(app)
                    .get(`/products/${productId}`)
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.body).toBe(expect.any(Array))
                        expect(response.status).toBe(200)
                        expect(response.body.id).toBe(expect.any(Number))
                        expect(response.body.name).toBe(expect.any(String))
                        expect(response.body.image_url).toBe(expect.any(String))
                        expect(response.body.price).toBe(expect.any(Number))
                        expect(response.body.stock).toBe(expect.any(Number))
                        done()
                    })
            }) 
        })

        describe('Product Find One Error', () => {
            test('it should return object and status 404', () => {
                request(app)
                    .get(`/products/1029`)
                    .end((err, response) => {
                        expect(err).toBe(null)

                        expect(response.body).toHaveProperty('error')
                        expect(response.body.error).toBe("Product not found")
                        // expect(response.body.errors).toEqual(expect.arrayContaining(errors))
                        expect(response.status).toBe(404)
                        done()
                    })
            }) 
        })
    })

    describe('Product Update Test', () => {
        describe('Product Update Success', () => {
            test('it should return object and status 200', () => {
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
            test('it should return object and status 400', () => {
                request(app)
                    .put(`/products/${productId}`)
                    .send({
                        name: '',
                        price: -12000,
                        stock: 0
                    })
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(400)
                        expect(response.body).toHaveProperty('errors')
                        expect(response.body.errors).toContain("Price must greater than 0")
                        expect(response.body.errors).toContain("Stock must greater than 0")
                        expect(response.body.errors).toBeGreaterThan(0)
                        done()
                    })
            }) 
        })

        describe('Product Update Error', () => {
            let errors = ["Price must greater than 0", "Stock must greater than 0", "Stock not allowed with decimal value"]
            test('it should return object and status 400', () => {
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
                        expect(response.body.errors).toContain("Price must greater than 0")
                        expect(response.body.errors).toContain("Stock not allowed with decimal value")
                        expect(response.body.errors).toBeGreaterThan(0)
                        done()
                    })
            }) 
        })
    })

    describe('Product Delete Test', () => {

        describe('Product Delete Success', () => {
            test('it should return object and status 200', () => {
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
            test('it should return object and status 404', () => {
                request(app)
                    .delete(`/products/${productId}`)
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(response.status).toBe(404)
                        expect(response.body).toHaveProperty('error')
                        expect(response.body.error).toBe("Product not found")
                        done()
                    })
            }) 
        })
    })
})
