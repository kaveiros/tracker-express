module.exports = app => {

    const sectionController = require('../controller/SectionController')
    const router = require('express').Router()
    const authjwt = require('../midleware/AuthJWT')


    router.post('/create', [authjwt.verifyToken], sectionController.create)

    router.post('/search/:page*?', [authjwt.verifyToken], sectionController.search)

    router.get('/all', [authjwt.verifyToken], sectionController.getAll)

    router.post('/update', [authjwt.verifyToken], sectionController.update)

    router.post('/delete', [authjwt.verifyToken], sectionController.delete)

    app.use('/section', router)
}
