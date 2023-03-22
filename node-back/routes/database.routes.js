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
}