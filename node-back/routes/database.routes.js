const controller = require("../controllers/dataBaseServices.controller")

module.exports = function (app) { 
    app.post(
        '/api/dataBaseServices/signUp',
        controller.signUp
    )
    app.post(
        '/api/dataBaseServices/signUpDoorman',
        controller.signUpDoorman
    )
    app.post(
        '/api/dataBaseServices/login',
        controller.login
    )
    app.post(
        '/api/dataBaseServices/createSpill',
        controller.createSpill
    )
    app.get(
        '/api/dataBaseServices/activeUser',
        controller.activeUser
    )
    app.get(
        '/api/dataBaseServices/searchCommunity',
        controller.searchCommunity
    )
    app.get(
        '/api/dataBaseServices/searchOwnersDF',
        controller.searchOwnersDF
    )
    app.get(
        '/api/dataBaseServices/findOne',
        controller.findOne
    )
    app.get(
        '/api/dataBaseServices/findOneEmail',
        controller.findOneEmail
    )
    app.get(
        '/api/dataBaseServices/searchDFExist',
        controller.searchDFExist
    )
    app.get(
        '/api/dataBaseServices/searchNameCommunity',
        controller.searchNameCommunity
    )
    app.get(
        '/api/dataBaseServices/resetPassword',
        controller.resetPassword
    )
    app.post(
        '/api/dataBaseServices/changePassword',
        controller.changePassword
    )
    app.post(
        '/api/dataBaseServices/newCommunity',
        controller.newCommunity
    )
    app.post(
        '/api/dataBaseServices/updateFDDoorman',
        controller.updateFDDoorman
    )
    app.post(
        '/api/dataBaseServices/sendNotice',
        controller.sendNotice
    )
    app.put(
        '/api/dataBaseServices/confCommunity',
        controller.confCommunity
    )
    app.put(
        '/api/dataBaseServices/insertRowsFD',
        controller.insertRowsFD
    )
    app.put(
        '/api/dataBaseServices/uptadeFD',
        controller.uptadeFD
    )
    app.get(
        '/api/dataBaseServices/searchDBCommunities',
        controller.searchDBCommunities
    )
    app.get(
        '/api/dataBaseServices/searchMyCommunity',
        controller.searchMyCommunity
    )
    app.get(
        '/api/dataBaseServices/searchMyCommunity2',
        controller.searchMyCommunity2
    )
    app.get(
        '/api/dataBaseServices/searchDoorman',
        controller.searchDoorman
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
        '/api/dataBaseServices/updatePresident',
        controller.updatePresident
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
    
}
