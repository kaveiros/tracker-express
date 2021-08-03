const authjwt = require("../midleware/AuthJWT");
module.exports = app => {

    const userController = require('../controller/UserController')
    const route = require('express').Router()

    route.post('/create', userController.create)

    route.post('/signin', userController.singIn)

    route.post("/setRole", [authjwt.verifyToken], userController.setRole)

    app.use('/user', route)
}
