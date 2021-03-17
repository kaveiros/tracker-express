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

module.exports.search = async (req, res) => {

    let page = req.params.page
    await getEmployees(page, req, res)
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
        res.status(500).send(error)
    }
}