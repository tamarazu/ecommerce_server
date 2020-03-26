const express = require('express')
const router = express.Router()
const authenticationCostumer = require('../middlewares/authenticationCostumer')
const CartController = require('../controllers/cart')

router.use(authenticationCostumer)
router.post('/', CartController.create)
router.get('/', CartController.findAll)
router.get('/:id', CartController.findOne)
// router.put('/:id', CartController.update)
router.get('/:id/increase', CartController.increase)
router.get('/:id/decrease', CartController.decrease)
router.get('/:id/transaction', CartController.transaction)
router.delete('/:id', CartController.remove)
 

module.exports = router