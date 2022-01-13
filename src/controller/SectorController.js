const db = require('../mongo/dbPool')
const Sector = db.Sector

module.exports.create = async (req, res) => {

    Sector.exists({'sector': req.body.sector}, (err, result) =>{
        if(err) {
            return res.status(500).send({message: err})
        }

        if (result === true) {
            return res.status(200).send({message: "Ο τομέας υπάρχει ήδη"})
        }
        else {
            let sectorData = new Sector({
                sector:req.body.sector
            })

            sectorData.save().then(data => {
                return res.status(201).send(data)

            }).catch(err => {
                return res.status(500).send({message: "Σφάλμα στην αποθήκευση του τομέα."})
            })
        }

    })
}


module.exports.delete = async (req, res) => {
    let id = req.body.id
    Sector.findByIdAndDelete(id, (err)=> {
        if(err) {
            return res.status(500).send({message:"Σφάλμα στη διαγραφή του τομέα."})
        }
        return res.status(200).send({message: "Ο τομέας διαγράφηκε."})
    })
}

module.exports.getAll = async  (req, res) => {

    try {
        const sectors = await Sector.find().populate('administration').populate('section')
        return res.status(200).send(sectors)
    }
    catch (exp) {
        return res.status(500).send({message:"Σφάλμα"})
    }

}

module.exports.search = async (req, res) => {
    let page = req.params.page || 1
    await getSectors(page, req, res)
}

module.exports.update = async (req, res) => {
    const {_id, sector} = req.body

    try {
        let sectorObj = await Sector.findByIdAndUpdate({_id:_id})
        sectorObj.sector = sector
        sectorObj.save()
        return res.status(201).json({message:"Ενημερώθηκε."})
    }
    catch (err) {
        return res.status(500).json({message: "Σφάλμα κατά την ενημέρωση του τομέα."})
    }
}

module.exports.delete = async (req, res) => {

    const {_id} = req.body
    try {
        await Sector.findByIdAndDelete({_id:_id}).exec()
        return res.status(202).send({message: "Ο τομέας διεγράφηκε."})
    }
    catch (exp) {
        return res.status(500).send({message:"Σφάλμα κατά τη διαγραφή του τομέα."})
    }
}


async function getSectors(page, req, res) {
    let perPage = 20
    try {
        const count = await Sector.countDocuments({})
        const sectors = await Sector
            .find({})
            .skip((perPage * page) - perPage)
            .sort({createdAt:1})
            .limit(perPage)
        return res.status(200).send({
            pages: Math.ceil(count/perPage),
            currentPage: page,
            sectors:sectors
        })
    }
    catch (e) {
        return res.status(500).send({message: "Σφάλμα κατά την αναζήτητηση των τομέων."})

    }
}
