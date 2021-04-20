module.exports = app => {

    const sectorController = require('../controller/SectorController')
    const router = require('express').Router()

    router.post("/create", sectorController.create)

    router.post('/search/:page*?', sectorController.search)

    router.get("/all", sectorController.getAll)

    router.post('/update', sectorController.update)

    router.delete('/delete', sectorController.delete)

    app.use('/sector', router)
}
