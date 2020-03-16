const app = require('../app')
const request = require('supertest')


describe('Product Routes', () => {
    const product = {
        name : "Bottle",
        img_url : "image.jpg",
        price: 12000,
        stock: 8
    }

    describe('Product Create Test', () => {
        describe('Product Create Success', () => {
            test('it should return new object and status 201', () => {
                request(app)
                    .get('/products')
                    .send(product)
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(status).toBe(201)
                        expect('id').toBe(expect.any(Number))
                        expect('name').toBe("Bottle")
                        expect('price').toBe(12000)
                        expect('stock').toBe(8)
                        done()
                    })
            }) 
        })

        describe('Product Create Error', () => {
            let errors = ["Name is required", "Price must greater than 0", "Stock must be greater than 0", "Stock is not allowed with decimal value"]
            test('it should return array of errors and status 400', () => {
                request(app)
                    .get('/products')
                    .send({
                        name : "",
                        img_url : "image.jpg",
                        price: -12000,
                        stock: 8.6
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

    describe('Product Find All Test', () => {
        describe('Product Find All Success', () => {
            test('it should return array of object and status 200', () => {
                request(app)
                    .get('/products')
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(status).toBe(200)
                        expect(response).toBe(expect.any(Array))
                        expect(response).toBe(expect.arrayContaining({
                            name : "Bottle",
                            img_url : "image.jpg",
                            price: 12000,
                            stock: 8
                        }))
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
                        expect(status).toBe(404)
                        expect('error').toBe("Product not found")
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
                        expect(status).toBe(200)
                        expect('id').toBe(expect.any(Number))
                        expect('name').toBe(expect.any(String))
                        expect('img_url').toBe(expect.any(String))
                        expect('price').toBe(expect.any(Number))
                        expect('stock').toBe(expect.any(Number))
                        done()
                    })
            }) 
        })

        describe('Product Find One Error', () => {
            test('it should return object and status 404', () => {
                request(app)
                    .get(`/products/${productId}`)
                    .end((err, response) => {
                        expect(err).toBe(null)
                        expect(status).toBe(404)
                        expect('error').toBe("Product not found")
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
                        expect(status).toBe(200)
                        expect('id').toBe(productId)
                        expect('name').toBe("Sauce Bottle")
                        expect('img_url').toBe(expect.any(String))
                        expect('price').toBe(expect.any(Number))
                        expect('stock').toBe(expect.any(Number))
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
                        expect(status).toBe(400)
                        expect('errors').toBe(errors)
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
                        expect(status).toBe(200)
                        expect('id').toBe(productId)
                        expect('name').toBe(expect.any(String))
                        expect('img_url').toBe(expect.any(String))
                        expect('price').toBe(expect.any(Number))
                        expect('stock').toBe(expect.any(Number))
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
                        expect(status).toBe(404)
                        expect('error').toBe("Internal Server Error")
                        done()
                    })
            }) 
        })
    })
})
