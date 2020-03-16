if('NODE_ENV===develpment'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const PORT = process.env.PORT
const cors = require('cors')

app.use(express.urlencoded({extended : false }))
app.use(express.json())
app.use(cors())



app.listen(PORT, () => {
    console.log('This app is running on port:', PORT)
})