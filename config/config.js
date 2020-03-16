
const env = process.env.NODE_ENV || 'development'

switch (env) {
    case 'develpment': 
        require('dotenv').config({path: process.cwd + '/.env'})
        break
    case 'test' : 
        require('dotenv').config({path: process.cwd() + '/.env.test'})
}

module.exports={
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_USERNAME,
    "database": process.env.DB_USERNAME,
    "host": process.env.DB_USERNAME,
    "dialect": process.env.DB_USERNAME
}

