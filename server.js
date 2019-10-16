const express = require('express')
const server = express();
const jwt = require('jsonwebtoken')
const helmet = require('helmet')

const userRouter = require('./user/user-router.js')


server.use(express.json())
server.use(helmet())
server.use(cors())
server.use('/api', userRouter)

server.get('/', (req,res) => {
    res.send('Hello! TOKENS!!!')
})

module.exports = server

