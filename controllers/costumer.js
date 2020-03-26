const { Costumer } = require('../models')
const { checkPassword  } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')


class CostumerController{
    static register(req, res, next){
        let { email, password } = req.body
        let costumerData =  { email, password }
        console.log(costumerData)
        Costumer
            .create(costumerData)
            .then(costumer => {
                let newcostumer = {
                    id : costumer.id,
                    email: costumer.email
                }
                res.status(201).json(newcostumer)
            })
            .catch(next)
    }

    static login(req, res, next){
        console.log('KE HIT KESINIIII')
        let { email, password } = req.body
        console.log(email)
        Costumer
            .findOne({
                where : {
                    email : email
                }
            })
            .then(costumer => {
                console.log(costumer,'+++++++++++++++++++++++++++++')
                if(costumer) {
                    // console.log(password, costumer.password)
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
                        console.log('LARI KESINIII ================================================')
                        next({
                            status : 404,
                            message: 'email / password wrong!'
                        })
                    }
                } else {
                    console.log('LARI KESINIII ATAU GAAAAA+++++++++++++++++++++++++++++++++++++')
                    next({
                        status : 404,
                        message: 'email / password wrong!'
                    })
                }
            })
            .catch(err => {
                console.log(err)
                next({
                    status : 404,
                    message: 'email / password wrong!'
                })
            })
    }

    static findOne(req, res, next){
        console.log('LARI KE FIND ONE NIH')
        Costumer
            .findOne({
                where : {
                    id: req.currentUserId
                }
            })
            .then(costumer => {
                // console.log(costumer.email,'+++++++++++++++++++++++++++++')
                if(costumer) {
                    res.status(200).json(costumer)
                } else {
                    console.log('LARI KESINIII ATAU GAAAAA+++++++++++++++++++++++++++++++++++++')
                    next({
                        status : 401,
                        message: 'Authorize denied'
                    })
                }
            })
            .catch(err => {
                console.log('INI NIH ERRRORNYAAAA')
                console.log(err)
                console.log('ITU TU ERRORRNYAAA')
                next({
                    status : 401,
                    message: 'Authorize denied'
                })
            })
    }


    static update(req, res, next){
        const { name, balance, phone, email, password} = req.body
        console.log('INI NIH DATANYAA',{ name, balance, phone, email, password} )
        Costumer
            .findOne({
                where : {
                    id: req.currentUserId
                }
            })
            .then(costumer => {
                console.log(costumer.email,'+++++++++++++++\++++++++++++++')
                if(costumer) {
                    return Costumer.update({ name, balance, phone, email, password}, {
                        where: {
                            id: req.currentUserId
                        }
                    })
                } else {
                    console.log('LARI KESINIII ATAU GAAAAA+++++++++++++++++++++++++++++++++++++')
                    next({
                        status : 401,
                        message: 'Authorize denied'
                    })
                }
            })
            .then(costumer => {
                res.status(200).json(costumer)
            })
            .catch(err => {
                next({
                    status : 401,
                    message: 'Authorize denied'
                })
            })
    }
}

module.exports = CostumerController