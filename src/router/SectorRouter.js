module.exports = app => {

    const sectorController = require('../controller/SectorController')
    const router = require('express').Router()

    router.post("/create", sectorController.create)

    router.post("/delete", sectorController.delete)

    router.get("/all", sectorController.getAll)

    app.use('/sector', router)
}