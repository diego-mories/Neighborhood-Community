const controller = require("../controllers/dataBaseServices.controller")

module.exports = function (app) { 

    app.post(
        '/api/dataBaseServices/createSpill',
        controller.createSpill
    )
    app.post(
        '/api/dataBaseServices/searchTickets',
        controller.searchTickets
    )
    app.post(
        '/api/dataBaseServices/sendTicket',
        controller.sendTicket
    )


    // app.get(
    //     '/api/dataBaseServices/findMyBookT',
    //     controller.findMyBookT
    // )
    // app.get(
    //     '/api/dataBaseServices/findMyBookP',
    //     controller.findMyBookP
    // )


    // app.get(
    //     '/api/dataBaseServices/createRowsTennis',
    //     controller.createRowsTennis
    // )
    // app.get(
    //     '/api/dataBaseServices/createRowsPaddle',
    //     controller.createRowsPaddle
    // )
    // app.get(
    //     '/api/dataBaseServices/findBookingsT',
    //     controller.findBookingsT
    // )
    // app.get(
    //     '/api/dataBaseServices/findBookingsP',
    //     controller.findBookingsP
    // )
    // app.delete(
    //     '/api/dataBaseServices/deleteRowsPaddle',
    //     controller.deleteRowsPaddle
    // )
    // app.delete(
    //     '/api/dataBaseServices/deleteRowsTennis',
    //     controller.deleteRowsTennis
    // )


    app.post(
        '/api/dataBaseServices/sendNotice',
        controller.sendNotice
    )

    app.get(
        '/api/dataBaseServices/findPayment',
        controller.findPayment
    )
    app.post(
        '/api/dataBaseServices/createBill',
        controller.createBill
    )
    app.post(
        '/api/dataBaseServices/createBill',
        controller.createBill
    )
    app.post(
        '/api/dataBaseServices/contact',
        controller.contact
    )

    app.post(
        '/api/dataBaseServices/findAllDebs',
        controller.findAllDebs
    )
    app.delete(
        '/api/dataBaseServices/deleteDP',
        controller.deleteDP
    )
    app.delete(
        '/api/dataBaseServices/deleteDoorman',
        controller.deleteDoorman
    )
    app.post(
        '/api/dataBaseServices/findAllDebsAllIds',
        controller.findAllDebsAllIds
    )
    app.post(
        '/api/dataBaseServices/findAllBills',
        controller.findAllBills
    )
    app.put(
        '/api/dataBaseServices/pay',
        controller.pay
    )
    app.put(
        '/api/dataBaseServices/deleteOH',
        controller.deleteOH
    )
    // app.put(
    //     '/api/dataBaseServices/reserveT',
    //     controller.reserveT
    // )
    // app.put(
    //     '/api/dataBaseServices/reserveP',
    //     controller.reserveP
    // )
    // app.put(
    //     '/api/dataBaseServices/cancelBookT',
    //     controller.cancelBookT
    // )
    // app.put(
    //     '/api/dataBaseServices/cancelBookP',
    //     controller.cancelBookP
    // )
}
