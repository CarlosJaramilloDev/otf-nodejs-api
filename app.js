const express = require('express')
const cors = require('cors');
const cmsRouter = require('./routers/cms')

const app = express()
app.use(express.json())

app.use(cors({
    origin: '*'
}));

app.use(cmsRouter)

module.exports = app
