const express = require("express")

const Router = express.Router()

Router.get("/", (req, res) => {
    res.send("Your are Authorized!!! \n Hello World from todo")
})


module.exports = Router;