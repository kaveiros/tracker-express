const jwt = require("jsonwebtoken")
const configJwt = require("../cfg/configJWT")
const db = require("../mongo/dbPool")
const User = db.User
const Role = db.Role

verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token']

    if(!token) {
        return res.status(403).send({message:"Δεν υπάρχει τόκεν!"})
    }

    jwt.verify(token, configJwt.secret, (err, decoded) =>{
        if(err) {
            return res.status(401).send({message:"Χωρίς εξουσιοδότηση!"})
        }
        req.userId = decoded.id
        next()
    })
}

isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user)=>{
        if(err) {
            return res.status(500).send({message: err})
        }
    })

    Role.find(
        {
            _id:{$in: user.roles}
        }
    ).exec((err, roles)=>{
        if(err) {
            return res.status(500).send({message:err})
        }

        for(let i = 0; i < roles.length; i++){
            if(roles[i].name === 'admin') {
                next()
                return
            }
        }

        return res.status(403).send({message: "Απαιτείται λογαριασμός Διαχειριστή."})

    })
}

isModerator = (req, res, next) => {
    User.findById(req.userId).exec((err, user)=>{
        if(err) {
            return res.status(500).send({message: err})
        }
    })

    Role.find(
        {
            _id:{$in: user.roles}
        }
    ).exec((err, roles)=>{
        if(err) {
            return res.status(500).send({message:err})
        }

        for(let i = 0; i < roles.length; i++){
            if(roles[i].name === 'moderator') {
                next()
                return
            }
        }

        return res.status(403).send({message: "Απαιτείται λογαριασμός μεσολαβητή."})

    })
}


const authJWT = {
    verifyToken,
    isAdmin,
    isModerator
}

module.exports = authJWT