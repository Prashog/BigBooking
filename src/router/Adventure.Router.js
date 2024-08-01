const express = require("express");
const { CreateNewAdventureController, GetAllAdventuresInACityController} = require("./../controller/Adventure.controller")

const AdventureRouter = express.Router();

AdventureRouter.post("/add", CreateNewAdventureController)
                                         
AdventureRouter.get("/all", GetAllAdventuresInACityController)

module.exports = AdventureRouter;