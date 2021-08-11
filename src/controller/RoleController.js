const db = require('../mongo/dbPool')
const Role = db.Role

module.exports.getAll = async (req, res) => {

    try {
        const roles = await Role.find()
        return  res.status(200).send(roles)
    }
    catch (exception) {
        return res.status(500).send({message: "Σφάλμα στην ανάκτηση ρόλων."})
    }
}

module.exports.create = async (req, res) => {
    
    Role.exists({'name': req.body.name}, (err, result) =>{
        if(err) {
            return res.status(500).send({message: err})
        }

        if (result === true) {
            return res.status(200).send({message: "Role exists already."})
        }
        else {
            var role = new Role({
                name:req.body.name
            })
        
            role.save(role).then(data => {
                return res.status(201).send(data)
        
            }).catch(err => {
                return res.status(500).send(err)
            })
        }

    })
}

module.exports.delete = async (req, res) =>{
    let id = req.body.id
    Role.findByIdAndDelete(id, (err)=>{
        if(err) {
            return res.status(500).send({message:"Error deleting role."})
        }
        return res.status(200).send({message: "Deleted role."})
    })

}

module.exports.search = async (req, res) => {

    let page = req.params.page || 1
    await getRoles(page, req, res)
}


async function getRoles (page, req, res) {

    let perPage = 20
    try {
        const totalRoles = await Role.countDocuments({})
        const roles = await Role
            .find({})
            .skip((perPage * page) - perPage)
            .limit(perPage)
        return res.status(200).send({
            pages: Math.ceil(totalRoles/perPage),
            currentPage: page,
            roles:roles
        })
    }
    catch (err) {
        return res.status(500).send({message: "Σφάλμα κατά την αναζήτηση των ρόλων."})
    }
}
