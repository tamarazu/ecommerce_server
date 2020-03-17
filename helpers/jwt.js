const PRIVATKEY = process.env.PRIVATKEY
const jwt = require('jsonwebtoken')

module.exports = {
    generateToken: (data) => {
        return jwt.sign(data, PRIVATKEY)
    },
    verifyToken: (token => {
        return jwt.verify(token, PRIVATKEY)
    })
}