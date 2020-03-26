let { verifyToken } = require('../helpers/jwt')
let { Costumer } = require('../models')


module.exports=(req, res, next) => {
    let access_token = req.headers.access_token
    try {
        let decoded = verifyToken(access_token)
        Costumer
            .findOne({
                where : {
                    email : decoded.email
                }
            })
            .then(costumer => {
                if(costumer) {
                    req.currentUserId = costumer.id
                    next()
                } else {
                    console.log('Tertrolak')
                    next({
                        status : 401,
                        message: 'Authorize denied'
                    })
                }
            })
            .catch(err => {
                next({
                    status : 401,
                    message: 'Authorize denied'
                })
            })
        // next()
    } catch (error) {
        next({
            status : 401,
            message: 'Authorize denied'
        })
    }
}