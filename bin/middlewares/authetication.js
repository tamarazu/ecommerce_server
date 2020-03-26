let { verifyToken } = require('../helpers/jwt')
let { Admin } = require('../models')


module.exports=(req, res, next) => {
    let access_token = req.headers.access_token
    try {
        let decoded = verifyToken(access_token)
        Admin
            .findOne({
                where : {
                    email : decoded.email
                }
            })
            .then(admin => {
                if(admin) {
                    next()
                } else {
                    next({
                        status : 404,
                        message: 'You not have any access to products'
                    })
                }
            })
            .catch(err => {
                next({
                    status : 404,
                    message: 'You not have any access to products'
                })
            })
        // next()
    } catch (error) {
        next({
            status : 404,
            message: 'You not have any access to products'
        })
    }
}