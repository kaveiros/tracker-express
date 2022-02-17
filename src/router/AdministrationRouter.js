module.exports = app => {
    const router = require('express').Router()
    const authjwt = require("../midleware/AuthJWT");
    const administrationController = require('../controller/AdministrationController')

    router.post('/create', administrationController.create)

    router.post('/update', administrationController.update)

    router.delete('/delete', authjwt.verifyToken, administrationController.delete)

    router.get('/all', authjwt.verifyToken, administrationController.getAll)

    app.use('/administration', router)
}