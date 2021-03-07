const {Storage} = require('@google-cloud/storage')

const path = require('path')

module.exports.upload = async (req, res) => {

    const keyFileName = path.join(__dirname,'../cfg/tracker.json')
    const bucketName = "tracker_app_storage"
    const googleStorage = new Storage({keyFilename: keyFileName});
    let documents = req.files
    for (let doc of documents) {
        googleStorage.bucket(bucketName).upload(doc.path).then((data) => {
            console.log(data)

        }).catch((err)=>{
            console.log(err)
        })
    }
    console.log(documents)


    return res.status(201).send("done")

}