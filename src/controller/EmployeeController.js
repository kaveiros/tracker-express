const db = require('../mongo/dbPool')
const Employee = db.Employee

module.exports.create = async (req, res) => {

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

    })

    employee.save().then(data=>{
        return res.status(201).send(data)
    }).catch(err => {
        return res.status(500).send(err)
    })
}