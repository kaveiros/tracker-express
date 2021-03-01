const db = require('../mongo/dbPool')
const Sector = db.Sector

module.exports.create = async (req, res) => {

    Sector.exists({'sector': req.body.sector}, (err, result) =>{
        if(err) {
            return res.status(500).send({message: err})
        }

        if (result === true) {
            return res.status(200).send({message: "Sector exists already."})
        }
        else {
            let sectorData = new Sector({
                sector:req.body.sector
            })

            sectorData.save().then(data => {
                return res.status(201).send(data)

            }).catch(err => {
                return res.status(500).send(err)
            })
        }

    })
}


module.exports.delete = async (req, res) => {
    let id = req.body.id
    Sector.findByIdAndDelete(id, (err)=> {
        if(err) {
            return res.status(500).send({message:"Error deleting Sector."})
        }
        return res.status(200).send({message: "Deleted Sector."})
    })
}

module.exports.getAll = async  (req, res) => {

}