module.exports = app => {

    const employeeController = require('../controller/EmployeeController')
    const router = require('express').Router()

    router.post("/create", employeeController.create)

    router.post("/search/:page*?", employeeController.search)

    router.delete("/delete", employeeController.delete)

    app.use('/employee', router)

}