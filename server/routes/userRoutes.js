const express = require("express")
const {addUser,login} = require("../controller/userController")
const logout = require("../controller/logoutController")
const Router = express.Router()

Router.post("/add", addUser)
Router.post("/login",login)
Router.post("/logout", logout)
module.exports = Router;