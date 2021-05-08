module.exports = app => {
    const wareHouseController = require('../controller/WarehouseController')
    const router = require('express').Router()
    const authjwt = require('../midleware/AuthJWT')

    router.post('/create', [authjwt.verifyToken], wareHouseController.create)

    router.post('/search/:page*?', [authjwt.verifyToken], wareHouseController.search)

    router.delete('/delete', [authjwt.verifyToken], wareHouseController.delete)

    router.post('/update',[authjwt.verifyToken], wareHouseController.update)

    app.use('/warehouse', router)

}
