const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const cors = require('cors')
const db = require('./src/mongo/dbPool')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const AdministrationController = require('./src/controller/AdministrationController')
app.disable('x-powered-by')
const emitterUpdate = require('./src/messaging/emitter')
const Redis = require("ioredis");
// emitterUpdate.on('administration-update', async  (args) => {
//     console.log('administration id: ' + args._id);
//     const administrationActive =  await  AdministrationController.find(args._id)
//     console.log(administrationActive)
// });

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



// const redis = require('./src/messaging/RedisConnector')
const redis = new Redis(
    process.env.REDIS_HOST,
    {password: process.env.REDIS_P},
);

// const redis = new Redis(
//     "redis://127.0.0.1:6379"
// );

redis.subscribe("administration-update", (err, count) => {
    if (err) {
        // Just like other commands, subscribe() can fail for some reasons,
        // ex network issues.
        console.error("Failed to subscribe: %s", err.message);
    } else {
        // `count` represents the number of channels this client are currently subscribed to.
        console.log(
            `Subscribed successfully! This client is currently subscribed to ${count} channels.`
        );
    }
});

redis.subscribe("administration-update-2", (err, count) => {
    if (err) {
        // Just like other commands, subscribe() can fail for some reasons,
        // ex network issues.
        console.error("Failed to subscribe: %s", err.message);
    } else {
        // `count` represents the number of channels this client are currently subscribed to.
        console.log(
            `Subscribed successfully! This client is currently subscribed to ${count} channels.`
        );
    }
});

redis.on("message", (channel, message) => {
    console.log(`Received ${message} from ${channel}`);
});



const port = process.env.PORT || 4000
app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`)
})