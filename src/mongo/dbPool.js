const configDB = require('../cfg/configDB')
const mongoose = require('mongoose')
const User = require('../models/User')(mongoose)
const Role = require('../models/Role')(mongoose)
const Sector = require('../models/Sector')(mongoose)
const Employee = require('../models/Employee')(mongoose)
const AdditionalInfo = require('../models/AdditionalInfo')(mongoose)
const File = require('../models/File')(mongoose)
const Warehouse = require('../models/Warehouse')(mongoose)

const db = {}
db.mongoose = mongoose
db.url = configDB.dbUrl
db.Role = Role
db.User = User
db.Sector = Sector
db.Employee = Employee
db.AdditionalInfo = AdditionalInfo
db.File = File
db.Warehouse = Warehouse
db.mongoose.connect(db.url, {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>{
    console.log("Connected to database")
})
.catch(error=>{
    console.log("Cannot connect to db!", error)
    process.exit()
})
module.exports=db
