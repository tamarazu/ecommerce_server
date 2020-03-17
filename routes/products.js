const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/product')

router.post('/', ProductController.create)
router.get('/', ProductController.findAll)
router.get('/:id', ProductController.findOne)
router.put('/:id', ProductController.findOne)
router.delete(':id', ProductController.remove)

module.exports = router 