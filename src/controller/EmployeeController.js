const db = require('../mongo/dbPool')
const Employee = db.Employee
const AdditionalInfo = db.AdditionalInfo
const mongoose = db.mongoose
const File = db.File
const bucketName = "tracker_app_storage"
const {Storage} = require('@google-cloud/storage')
const path = require('path')
const keyFileName = path.join(__dirname,'../cfg/tracker.json')



module.exports.create = async (req, res, next) => {

    let uniqueVersion = req.body.uniqueVersion
    const infos = await AdditionalInfo.find({'uniqueVersion':uniqueVersion})

    let employee = new Employee({
        aa: req.body.aa,
        code: req.body.code,
        address: req.body.address,
        name: req.body.name1,
        section: req.body.section,
        sector: req.body.sector,
        property: req.body.property,
        expertise: req.body.expertise,
        costOvertime: req.body.costOvertime,
        costPerDay: req.body.costPerDay,
        uniqueVersion:uniqueVersion,
        additionalInfo:infos

    })

    employee.save().then(data=>{
        return res.status(201).send(data)
    }).catch(err => {
        console.log(err)
        return res.status(500).send(err)
    })
}

module.exports.search = async (req, res,next) => {
    let page = req.params.page
    await getEmployees(page, req, res, next)
}


async function getEmployees (page, req, res) {
    let perPage = 20
    if (page === 0){
        page = 1
    }
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

        const count = await Employee.countDocuments(queryObject)
        const employees = await Employee
            .find(queryObject)
            .skip((perPage * page) - perPage).sort({ aa: 1 }).limit(perPage)
        res.status(200).send(
            {
                pages: Math.ceil(count / perPage),
                currentPage: page,
                employees: employees
            })
    }
    catch (error) {
        res.status(500).json({error:error})
    }
}

exports.delete = async (req, res) => {

    console.log(req.params);
    const {employeeId} = req.params
    const employee = await Employee
    .find({_id: employeeId}).populate('additionalInfo')
    if (employee.additionalInfo) {
        console.log(employee.additionalInfo)
    }

    const {_id, additionalInfo} = req.body
    const googleStorage = new Storage({keyFilename: keyFileName});
    try {
        const session = await mongoose.startSession()
        session.startTransaction();

        if (additionalInfo != undefined && additionalInfo.length > 0) {
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
    
        }
        await Employee.findOneAndDelete({_id: _id}).exec()

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

module.exports.getAll = async(req, res) => {

    try {
        const employees = await Employee.find()
        return res.status(200).send(employees);
    }catch (e) {
        return res.status(500).send({message: "Σφάλμα στην ανάπτυξη του προσωπικού."})
    }
    
}
