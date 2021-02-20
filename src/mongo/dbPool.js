const configDB = require('../cfg/configDB')
const mongoose = require('mongoose')
const User = require('../models/User')(mongoose)
const Role = require('../models/Role')(mongoose)
const Sector = require('../models/Sector')(mongoose)

const db = {}
db.mongoose = mongoose
db.url = configDB.dbUrl
db.Role = Role
db.User = User
db.Sector = Sector
db.mongoose.connect(db.url, {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>{
    console.log("Connected to database")
})
.catch(error=>{
    console.log("Cannot connect to db!", error)
    process.exit()
})
module.exports=db