const db = require('../mongo/dbPool')
const Section = db.Section

module.exports.create = async (req, res) => {

    let {section} = req.body

    let sectionModel = new Section({
        section:section
    })

    sectionModel.save().then(data => {
        return res.status(201).send(data)
    }).catch(err => {
        return res.status(500).send({message: "Σφάλμα κατά την αποθήκευση τομέα."})
    })
}

module.exports.getAll = async (req, res) => {
    try {
        const sections = await Section.find()
        return res.status(200).send(sections)
    }
    catch (exp) {
        return res.status(500).send({message: "Σφάλμα κατά την ανάκτηση των τμημάτων."})
    }
}

module.exports.search = async (req, res) => {

    let page = req.params.page || 1
    await getSections(page, req, res)

}

module.exports.delete = async (req, res) => {
    const {sectionId} = req.params
    try {
        await Section.findByIdAndDelete({_id:sectionId}).exec()
        return res.status(202).send({message: 'Το τμήμα διεγράφηκε'})
    }
    catch (e) {
        return res.status(500).send({message:"Σφάλμα κατά τη διαγραφή του τμήματος."})
    }
}

async function getSections (page, req, res) {

    let perPage = 20
    try {
        const count = await Section.countDocuments({})
        const sections = await Section
            .find({})
            .skip((perPage * page) - perPage)
            .limit(perPage)
        return res.status(200).send({
            pages: Math.ceil(count/perPage),
            currentPage: page,
            sections:sections
        })
    }
    catch (err) {
        return res.status(500).send({message: "Σφάλμα κατά την αναζήτηση των τμημάτων."})
    }
}

module.exports.update = async (req, res) => {
    const {_id, section}  = req.body

    try {
        let sectionObj = await Section.findByIdAndUpdate({_id:_id})
        sectionObj.sector = section
        sectionObj.save()
        return res.status(201).json({message:"Ενημερώθηκε."})
    }
    catch (err) {
        return res.status(500).json({message: "Σφάλμα κατά την ενημέρωση του τμήματος."})
    }
}
