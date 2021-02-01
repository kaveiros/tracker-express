module.exports = app => {

    const userController = require('../controller/UserController')
    const route = require('express').Router()

    route.post('/create', userController.create)

    route.post('/signin', userController.singIn)

    app.use('/user', route)
}
