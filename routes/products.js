const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/product')
const authentication = require('../middlewares/authetication')


// router.use(authentication)
router.post('/', ProductController.create)
router.get('/', ProductController.findAll)
router.get('/:id', ProductController.findOne)
router.put('/:id', ProductController.update)
router.delete('/:id', ProductController.remove)
 
module.exports = router 