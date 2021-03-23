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
        const sectors = await Sector.find()
        return res.status(200).send(sectors)
    }
    catch (exp) {
        return res.status(500).send({message:"Σφάλμα"})
    }

}