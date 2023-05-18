const controller = require("../controllers/doors_floors.controllers")

module.exports = function (app) { 
    app.get(
        '/api/dataBaseServices/searchDFExist',
        controller.searchDFExist
    )
    app.post(
        '/api/dataBaseServices/updateFDDoorman',
        controller.updateFDDoorman
    )
    app.put(
        '/api/dataBaseServices/insertRowsFD',
        controller.insertRowsFD
    )
    app.put(
        '/api/dataBaseServices/uptadeFD',
        controller.uptadeFD
    )
    app.post(
        '/api/dataBaseServices/updatePresident',
        controller.updatePresident
    )
}
