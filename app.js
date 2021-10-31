require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const router = require('./routers/index')
const { connect } = require('./config/mongodb')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)

connect()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`gogogo to http://localhost:${PORT}`);
        })
    })