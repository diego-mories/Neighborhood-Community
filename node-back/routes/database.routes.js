const controller = require("../controllers/dataBaseServices.controller")

module.exports = function (app) { 

    
    app.post(
        '/api/dataBaseServices/searchTickets',
        controller.searchTickets
    )
    app.post(
        '/api/dataBaseServices/sendTicket',
        controller.sendTicket
    )

    app.post(
        '/api/dataBaseServices/sendNotice',
        controller.sendNotice
    )

    app.post(
        '/api/dataBaseServices/contact',
        controller.contact
    )

    app.delete(
        '/api/dataBaseServices/deleteDP',
        controller.deleteDP
    )
    app.delete(
        '/api/dataBaseServices/deleteDoorman',
        controller.deleteDoorman
    )
   
    app.put(
        '/api/dataBaseServices/deleteOH',
        controller.deleteOH
    )

}
