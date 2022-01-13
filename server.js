const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const cors = require('cors')
const db = require('./src/mongo/dbPool')
const app = express()
const AdministrationController = require('./src/controller/AdministrationController')
app.disable('x-powered-by')
const emitterUpdate = require('./src/messaging/emitter')
emitterUpdate.on('administration-update', async  (args) => {
    console.log('administration id: ' + args._id);
    const administrationActive =  await  AdministrationController.find(args._id)
    console.log(administrationActive)
});

let corsOptions = {
    origin: [process.env.CORS2, process.env.CORS || "http://localhost:3000"],
    credentials:true
}
app.use(cors(corsOptions))
// parse requests of content-type - application/json
app.use(bodyParser.json())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser())

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to jwt application." });
  });

require('./src/router/RoleRouter')(app)
require('./src/router/UserRouter')(app)
require('./src/router/SectorRouter')(app)
require('./src/router/EmployeeRouter')(app)
require('./src/router/AdditionalInfoRouter')(app)
require('./src/router/WarehouseRouter')(app)
require('./src/router/SectionRouter')(app)
require('./src/router/AdministrationRouter')(app)


const port = process.env.PORT || 4000
app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`)
})