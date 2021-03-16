const {Storage} = require('@google-cloud/storage')
const db = require('../mongo/dbPool')
const AdditionalInfo = db.AdditionalInfo
const File = db.File
const bucketName = "tracker_app_storage"
const path = require('path')
const keyFileName = path.join(__dirname,'../cfg/tracker.json')

module.exports.upload = async (req, res) => {

    let filesArray = []
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
            uniqueVersion: req.body.uniqueVersion,
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

module.exports.downloadFile = async (req, res) => {

    const {filename} = req.body
    const googleStorage = new Storage({keyFilename: keyFileName});
    const options = {
        version: 'v4',
        action: 'read',
        expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    };

    try {
        // Get a v4 signed URL for reading the file
        const [url] = await googleStorage
            .bucket(bucketName)
            .file(filename)
            .getSignedUrl(options);

        return res.status(200).send(url)
    }
    catch (err) {
        return res.status(500).send("Σφάλμα κατά το κατέβασμα αρχείου.")
    }


}