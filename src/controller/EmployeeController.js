const db = require('../mongo/dbPool')
const Employee = db.Employee
const AdditionalInfo = db.AdditionalInfo

module.exports.create = async (req, res) => {

    let uniqueVersion = req.body.uniqueVersion
    const infos = await AdditionalInfo.find({'uniqueVersion':uniqueVersion})

    let employee = new Employee({
        aa: req.body.aa,
        code: req.body.code,
        address: req.body.address,
        name: req.body.name,
        section: req.body.section,
        sector: req.body.sector,
        property: req.body.property,
        specialisedIn: req.body.specialisedIn,
        expertise: req.body.expertise,
        costOvertime: req.body.costOvertime,
        costPerDay: req.body.costPerDay,
        uniqueVersion:uniqueVersion,
        additionalInfo:infos

    })

    employee.save().then(data=>{
        return res.status(201).send(data)
    }).catch(err => {
        return res.status(500).send(err)
    })
}