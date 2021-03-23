const path = require('path')

module.exports = app => {

    const additionalInfoRouter = require('../controller/AdditionalInfoController')
    const router = require('express').Router()
    const multer = require('multer')
    const uploadsLocation = path.join(__dirname,'../uploads')
    let storage = multer.diskStorage({
        destination: function (request, file, callback) {
            callback(null, uploadsLocation)
        },
        filename: function (request, file, callback) {
            callback(null, file.originalname)
        }
    })
    let upload = multer({ storage : storage }).array('documents',5)

    router.post('/create', upload, additionalInfoRouter.upload)

    router.post('/download-file', upload, additionalInfoRouter.downloadFile)

    router.get('/all/:page*?', additionalInfoRouter.getAll)

    app.use('/additionalInfo', router)
}