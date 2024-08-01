const express = require("express")

const { CreateNewUserController } = require("./../controller/User.controller")

const AuthenticationRouter = express.Router()

AuthenticationRouter.post("/signup", CreateNewUserController)

module.exports = AuthenticationRouter