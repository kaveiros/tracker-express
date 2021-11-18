module.exports = app => {

    const roleController = require('../controller/RoleController')
    const router = require('express').Router()
    const authjwt = require('../midleware/AuthJWT')


    router.post("/create", [authjwt.verifyToken], roleController.create)

    router.delete("/delete", [authjwt.verifyToken], roleController.delete)

    router.post('/search/:page*?', [authjwt.verifyToken], roleController.search)

    router.get("/all", roleController.getAll)

    app.use('/role', router)

}
