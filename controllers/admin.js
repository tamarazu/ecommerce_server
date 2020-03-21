const { Admin } = require('../models')
const { checkPassword  } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class AdminController {
    static register(req, res, next){
        let { email, password } = req.body
        let adminData =  { email, password }
        Admin
            .create(adminData)
            .then(admin => {
                let newAdmin = {
                    id : admin.id,
                    email: admin.email
                }
                res.status(201).json(newAdmin)
            })
            .catch(next)
    }

    static login(req, res, next){
        let { email, password } = req.body
        Admin
            .findOne({
                where : {
                    email : email
                }
            })
            .then(admin => {
                if(admin) {
                    if(checkPassword(password, admin.password) === true) {
                        let adminLogin= {
                            id : admin.id,
                            email: admin.email
                        }
                        let access_token = generateToken(adminLogin)
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
}

module.exports = AdminController