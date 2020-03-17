const bcrypt = require('bcrypt')
const SALT = process.env.SALT

module.exports= {
    hashingPassword: (password) => {
        let salt = bcrypt.genSaltSync(SALT)
        return bcrypt.hashSync(password, salt)
    },
    checkPassword: (inputPassword, passwordDB) => {
        return bcrypt.compareSync(inputPassword, passwordDB)
    }
}