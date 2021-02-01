module.exports = app => {

    const userController = require('../controller/UserController')
    const route = require('express').Router()

    route.post('/create', userController.create)

    app.use('/user', route)
}
