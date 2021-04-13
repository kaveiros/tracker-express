module.exports = app => {
    const wareHouseController = require('../controller/WarehouseController')
    const router = require('express').Router()

    router.post('/create', wareHouseController.create)

    router.post('/search/:page*?', wareHouseController.search)

    router.delete('/delete', wareHouseController.delete)

    router.post('/update', wareHouseController.update)

    app.use('/warehouse', router)

}
