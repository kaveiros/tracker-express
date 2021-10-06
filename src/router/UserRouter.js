const authjwt = require("../midleware/AuthJWT");
const employeeController = require("../controller/EmployeeController");
module.exports = app => {

    const userController = require('../controller/UserController')
    const route = require('express').Router()

    route.post('/create', userController.create)

    route.post('/signin', userController.singIn)

    route.post("/setRole", [authjwt.verifyToken], userController.setRole)

    route.get("/all",[authjwt.verifyToken], userController.getAll)

    route.post("/search/:page*?",[authjwt.verifyToken], userController.search)

    app.use('/user', route)
}
