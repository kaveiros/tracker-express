module.exports = app => {

    const sectorController = require('../controller/SectorController')
    const router = require('express').Router()
    const authjwt = require('../midleware/AuthJWT')


    router.post("/create", [authjwt.verifyToken], sectorController.create)

    router.post('/search/:page*?', [authjwt.verifyToken], sectorController.search)

    router.get("/all", [authjwt.verifyToken], sectorController.getAll)

    router.post('/update', [authjwt.verifyToken], sectorController.update)

    router.delete('/delete', [authjwt.verifyToken], sectorController.delete)

    app.use('/sector', router)
}
