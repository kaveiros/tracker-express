const db = require('../mongo/dbPool')
const Warehouse = db.Warehouse
const mongoose = db.mongoose
const AdditionalInfo = db.AdditionalInfo
const File = db.File
const bucketName = "tracker_app_storage"
const {Storage} = require('@google-cloud/storage')
const path = require('path')
const keyFileName = path.join(__dirname,'../cfg/tracker.json')


module.exports.create = async (req, res) => {

    console.log(req)
    let {uniqueVersion, aa, code, kind, description, quantity,
        section, sector, nameOfPersonAccepted } = req.body
    const infos = await AdditionalInfo.find({'uniqueVersion': uniqueVersion})

    let wareHouse = new Warehouse({
        aa:aa,
        code:code,
        kind:kind,
        description:description,
        quantity:quantity,
        section:section,
        sector:sector,
        nameOfPersonAccepted:nameOfPersonAccepted,
        uniqueVersion:uniqueVersion,
        additionalInfo:infos
    })

    wareHouse.save().then(data => {
        return res.status(201).send(data)
    }).catch(err => {
        return res.status(500).send(err)
    })
}


module.exports.search = async (req, res) => {

    let page = req.params.page || 1
    await getMaterials(page, req, res)
}


async function getMaterials (page, req, res) {
    let perPage = 20
    let dropDownValue = req.body.dropDownValue
    let searchTerm = req.body.searchTerm
    let queryObject = {}
    //search for name
    if (dropDownValue === "name") {
        queryObject = {name: {$regex:searchTerm}}
    }
    //search for section
    else if (dropDownValue === "section"){
        queryObject = {section:Number(searchTerm)}
    }
    //search for sector
    else if (dropDownValue === "sector"){
        queryObject = {sector:Number(searchTerm)}
    }
    try {

        const count = await Warehouse.countDocuments(queryObject)
        const materials = await Warehouse
            .find(queryObject)
            .skip((perPage * page) - perPage).sort({ aa: 1 }).limit(perPage)
        res.status(200).send(
            {
                pages: Math.ceil(count / perPage),
                currentPage: page,
                materials: materials
            })
    }
    catch (error) {
        res.status(500).send(error)
    }
}

module.exports.delete = async (req, res) => {

    const {_id, additionalInfo} = req.body
    const googleStorage = new Storage({keyFilename: keyFileName});
    const session = await mongoose.startSession()
    try {
        await session.startTransaction();

        for (let infoId of additionalInfo){
            const additionalInfo = await AdditionalInfo.findOne({_id:infoId}).populate('files').exec()
            let additionalFiles = additionalInfo.files
            console.log(additionalFiles)
            if (additionalFiles.length !== 0){
                for (let doc of additionalFiles) {
                    let document = await File.findOne({_id:doc})
                    await googleStorage.bucket(bucketName).file(document.name).delete()
                    await File.findOneAndDelete({_id:doc}).exec()
                }
            }
            await AdditionalInfo.findOneAndDelete({_id:infoId}).exec()
        }
        await Warehouse.findOneAndDelete({_id: _id}).exec()

        await session.commitTransaction();
        session.endSession();
    }
    catch (err) {

        await session.abortTransaction()
        session.endSession()
        console.log(err)
        return res.status(500).send({message: "Σφάλμα κατά τη διαγραφή του εργαζομένου"})
    }

    res.status(204).send()
}


exports.update = async (req, res) => {
    console.log(req.body)

    let {uniqueVersion, _id, aa, code, kind, description, quantity,
        section, sector, nameOfPersonAccepted } = req.body
    const infos = await AdditionalInfo.find({'uniqueVersion': uniqueVersion})
    let warehouseItem = await Warehouse.findByIdAndUpdate({_id:_id})
        warehouseItem.aa = aa,
        warehouseItem.code = code,
        warehouseItem.kind = kind,
        warehouseItem.description = description,
        warehouseItem.quantity = quantity,
        warehouseItem.section = section,
        warehouseItem.additionalInfo = infos
        warehouseItem.sector = sector,
        warehouseItem.nameOfPersonAccepted = nameOfPersonAccepted
    warehouseItem.save()
    console.log("FOUND!!!!")
    console.log(warehouseItem)

    return res.status(204).send({message:"Ενημερώθηκε"})

}
    

