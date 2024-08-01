const express = require("express")
require('dotenv').config()
require('./src/db/connect')

const CityRouter = require("./src/router/City.Router");

const AdventureRouter = require("./src/router/Adventure.Router");

const AdventureDetailRouter = require("./src/router/AdventureDetail.Router")

const AuthenticationRouter = require("./src/router/Authentication.Router")

const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV

const server = express()

server.use(express.json())

server.use("/auth", AuthenticationRouter)

server.use("/adventures", AdventureRouter);

server.use("/adventures/detail", AdventureDetailRouter)

server.use("/cities", CityRouter);

server.use("*", (request, response)=>{
    response.status(404).json({
        success : false,
        message : "API ENDPOINT not found "
    })
})

server.listen(PORT, ()=>{
    console.log(`Server started successfully in ${NODE_ENV} at PORT - ${PORT}`)
})