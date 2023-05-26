const controller = require("../controllers/community.controllers")

module.exports = function (app) { 
    app.get(
        '/api/community/searchCommunity',
        controller.searchCommunity
    )
    app.get(
        '/api/community/searchNameCommunity',
        controller.searchNameCommunity
    )
    app.post(
        '/api/community/newCommunity',
        controller.newCommunity
    )
    app.put(
        '/api/community/updateCommunity',
        controller.updateCommunity
    )
    app.get(
        '/api/community/searchDBCommunities',
        controller.searchDBCommunities
    )
    app.get(
        '/api/community/searchMyCommunity',
        controller.searchMyCommunity
    )
    app.get(
        '/api/community/searchMyCommunity2',
        controller.searchMyCommunity2
    )
    app.get(
        '/api/community/searchDoorman',
        controller.searchDoorman
    )
    app.get(
        '/api/community/searchOwnersDF',
        controller.searchOwnersDF
    )
    
}
