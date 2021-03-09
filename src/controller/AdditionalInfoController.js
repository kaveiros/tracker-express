const {Storage} = require('@google-cloud/storage')
const db = require('../mongo/dbPool')
const AdditionalInfo = db.AdditionalInfo
const File = db.File

const path = require('path')

module.exports.upload = async (req, res) => {

    let filesArray = []
    const keyFileName = path.join(__dirname,'../cfg/tracker.json')
    const bucketName = "tracker_app_storage"
    const googleStorage = new Storage({keyFilename: keyFileName});
    let documents = req.files
    try {
        for (let doc of documents) {
            let data = await googleStorage.bucket(bucketName).upload(doc.path)
            let fileToStore = new File({
                id: data[0].metadata.id,
                selfLink: data[0].metadata.selfLink,
                mediaLink: data[0].metadata.mediaLink,
                name: data[0].metadata.name,
                bucket: data[0].metadata.bucket,
                contentType: data[0].metadata.contentType,
                size: data[0].metadata.size,
                timeCreated: data[0].metadata.timeCreated,
                updated: data[0].metadata.updated,
            })
            fileToStore.save()
            filesArray.push(fileToStore)
    }

        let additionalInfo = new AdditionalInfo({
            fromSector: req.body.fromSector,
            toSector: req.body.toSector,
            description: req.body.description,
            files: filesArray
        })
        additionalInfo.save()
    } catch
    (err) {
        console.log(err)
    }



    return res.status(201).send("done")
}