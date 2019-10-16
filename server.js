const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
require('dotenv').config()
// console.log('secret!', process.env.JWT_SECRET);
const userRouter = require('./user/user-router.js')
const server = express();

server.use(express.json())
server.use(helmet())
server.use(cors())
server.use('/api', userRouter)

server.get('/', (req,res) => {
    res.send('Hello! TOKENS!!!')
})

module.exports = server

