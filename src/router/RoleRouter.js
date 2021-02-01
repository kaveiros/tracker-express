module.exports = app => {

    const roleController = require('../controller/RoleController')
    const router = require('express').Router()

    router.post("/create", roleController.create)

    router.post("/delete", roleController.delete)

    app.use('/role', router)

}