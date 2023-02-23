const controller = require("../controllers/dataBaseServices.controller")

module.exports = function (app) { 
    app.get(
        '/api/dataBaseServices/test',
        controller.test
    );
}