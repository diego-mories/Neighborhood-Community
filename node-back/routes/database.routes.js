const controller = require("../controllers/dataBaseServices.controller")

module.exports = function (app) { 
    app.post(
        '/api/dataBaseServices/signUp',
        controller.signUp
    )
    app.post(
        '/api/dataBaseServices/signIn',
        controller.signIn
    )
}