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
    app.get(
        '/api/dataBaseServices/activeUser',
        controller.activeUser
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
        '/api/dataBaseServices/searchDoorman',
        controller.searchDoorman
    )
    app.post(
        '/api/dataBaseServices/createBill',
        controller.createBill
    )
}