const controller = require("../controllers/users.controllers")
module.exports = function (app) {
    app.post(
        '/api/users/login',
        controller.login
    ) 
    app.post(
        '/api/users/signUp',
        controller.signUp
    )
    app.get(
        '/api/users/resetPassword',
        controller.resetPassword
    )
    app.post(
        '/api/users/changePassword',
        controller.changePassword
    )
    app.get(
        '/api/users/findOne',
        controller.findOne
    )
    app.get(
        '/api/users/findOneEmail',
        controller.findOneEmail
    )
    app.post(
        '/api/users/signUpDoorman',
        controller.signUpDoorman
    )
    app.get(
        '/api/users/activeUser',
        controller.activeUser
    )
}