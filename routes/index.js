const express = require('express')
const router = express.Router()
const admins = require('./admins')
const products = require('./products')
const costumers = require ('./costumers')
const cart = require('./cart')
const CostumerControllers = require('../controllers/costumer')

router.use(admins)
router.post('/registerCostumers', CostumerControllers.register)
router.post('/loginCostumers', CostumerControllers.login)
router.use('/costumers', costumers)
router.use('/cart', cart)
router.use('/products', products)

module.exports = router