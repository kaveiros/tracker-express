module.exports = app => {

    const employeeController = require('../controller/EmployeeController')
    const router = require('express').Router()
    const authjwt = require('../midleware/AuthJWT')


    router.post("/create", [authjwt.verifyToken], employeeController.create)

    router.post("/search/:page*?", [authjwt.verifyToken], employeeController.search)

    router.delete("/delete/:employeeId", [authjwt.verifyToken], employeeController.delete)

    router.get("/all",[authjwt.verifyToken], employeeController.getAll)

    app.use('/employee', router)

}
