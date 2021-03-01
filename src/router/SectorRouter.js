module.exports = app => {

    const sectorController = require('../controller/SectorController')
    const router = require('express').Router()

    router.post("/create", sectorController.create)

    router.post("/delete", sectorController.delete)

    app.use('/sector', router)
}