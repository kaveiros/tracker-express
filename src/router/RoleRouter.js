module.exports = app => {

    const roleController = require('../controller/RoleController')
    const router = require('express').Router()
    const authjwt = require('../midleware/AuthJWT')


    router.post("/create", [authjwt.verifyToken], roleController.create)

    router.post("/delete", [authjwt.verifyToken], roleController.delete)

    router.get("/all", roleController.getAll)

    app.use('/role', router)

}
