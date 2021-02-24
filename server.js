const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./src/mongo/dbPool')

const app = express()

let corsOptions = {
    //origin: "http://localhost:3000"
    origin: "https://tracker-061281-app.web.app"
}
app.use(cors(corsOptions))
// parse requests of content-type - application/json
app.use(bodyParser.json())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to jwt application." });
  });

require('./src/router/RoleRouter')(app)
require('./src/router/UserRouter')(app)
require('./src/router/SectorRouter')(app)


const port = process.env.PORT || 4000
app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`)
})