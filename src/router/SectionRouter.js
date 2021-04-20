module.exports = app => {

    const sectionController = require('../controller/SectionController')
    const router = require('express').Router()

    router.post('/create', sectionController.create)

    router.post('/search/:page*?', sectionController.search)

    router.get('/all', sectionController.getAll)

    router.post('/update', sectionController.update)

    router.post('/delete', sectionController.delete)

    app.use('/section', router)
}
