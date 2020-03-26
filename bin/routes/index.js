const express = require('express')
const router = express.Router()
const admins = require('./admins')
const products = require('./products')

router.use(admins)
router.use('/products', products)

module.exports = router