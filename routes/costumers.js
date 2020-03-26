const express = require('express')
const router = express.Router()
const authenticationCostumers = require('../middlewares/authenticationCostumer')
const CostumerController = require('../controllers/costumer')

router.use(authenticationCostumers)
router.get('/', CostumerController.findOne)
router.put('/', CostumerController.update)

module.exports = router