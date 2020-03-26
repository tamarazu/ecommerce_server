const { Admin } = require('../models')
const { checkPassword  } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class AdminController {
    static register(req, res, next){
        console.log('MASUK TAU KESINI TEHH')
        console.log(req.body)
        let { email, password } = req.body
        let adminData =  { email, password }
        console.log(adminData)
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
                // console.log(admin.email,'+++++++++++++++++++++++++++++')
                if(admin) {
                    // console.log(password, admin.password)
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
                
                next({
                    status : 404,
                    message: 'email / password wrong!'
                })
            })
        
    }
}

module.exports = AdminController