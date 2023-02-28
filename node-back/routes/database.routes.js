const controller = require("../controllers/dataBaseServices.controller")

module.exports = function (app) { 
    // app.get(
    //     '/api/dataBaseServices/test',
    //     controller.test
    // );
    app.post(
        '/api/dataBaseServices/signUp',
        controller.signUp
    )
    app.post(
        '/api/dataBaseServices/signIn',
        controller.signIn
    )
    app.get(
        '/api/dataBaseServices/searchRole',
        controller.searchRole
    )
}