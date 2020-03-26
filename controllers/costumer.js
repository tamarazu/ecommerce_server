const { Costumer } = require('../models')
const { checkPassword  } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class CostumerController{
    static register(req, res, next){
        let { email, password } = req.body
        let costumerData =  { email, password }
        Costumer
            .create(costumerData)
            .then(costumer => {
                let newCostumer = {
                    id : costumer.id,
                    email: costumer.email
                }
                res.status(201).json(newCostumer)
            })
            .catch(next)
    }

    static login(req, res, next){
        let { email, password } = req.body
        Costumer
            .findOne({
                where : {
                    email : email
                }
            })
            .then(costumer => {
                if(costumer) {
                    if(checkPassword(password, costumer.password) === true) {
                        let costumerLogin= {
                            id : costumer.id,
                            email: costumer.email
                        }
                        let access_token = generateToken(costumerLogin)
                        res.status(200).json({
                            access_token
                        })
                    } else {
                        next({
                            status : 404,
                            message: 'email / password wrong!'
                        })
                    }
                } else {
                    next({
                        status : 404,
                        message: 'email / password wrong!'
                    })
                }
            })
            .catch(err => {
                next({
                    status : 404,
                    message: 'email / password wrong!'
                })
            })
    }

    static findOne(req, res, next){
        // let { email, password } = req.body
        console.log(req.currentUserId);
        
        Costumer
            .findOne({
                where : {
                    id : req.currentUserId
                }
            })
            .then(costumer => {
                res.status(200).json(costumer)
            })
            .catch(err => {
                next({
                    status : 404,
                    message: 'email / password wrong!'
                })
            })
        
    }

    static update(req, res, next){
        let { name, balance, phone, email, password } = req.body
        let updateData = { name, balance, phone, email, password }
        Costumer
            .update(updateData, {
                where : {
                    id: req.currentUserId
                }
            })
            .then(costumer => {
                return Costumer.findOne({
                    where: {
                        id : req.currentUserId
                    }
                })
            })
            .then(costumer => {
                res.status(200).json(costumer)
            })
            .catch(next)
    }
}

module.exports = CostumerController