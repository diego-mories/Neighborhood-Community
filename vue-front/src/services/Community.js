import http from '../http-common'
const API_URL_PATH = 'community/'

class ServicesCommunity {
    
 // Search community_id by user_id (Search data  of communities to which the user belongs)
  searchCommunity (id) {
    return http.get(API_URL_PATH + 'searchCommunity?user_id=' + id)
  }
  // Search name of community by community_id
  searchNameCommunity (communityId) {
    return http.get(API_URL_PATH + 'searchNameCommunity?community_id=' + communityId)
  }
  // Regsiter new community
  newCommunity (data) {
    const body = {
      nameC: data.nameC,
      paddle: data.paddle,
      tennis: data.tennis,
      pool: data.pool,
      doorman: data.doorman,
      cameras: data.cameras,
      myDoor: data.myDoor,
      myFloor: data.myFloor,
      floors: data.floors,
      doors: data.doors
    }
    return http.post(API_URL_PATH + 'newCommunity', body)
  }
  // Update configuration of community
  updateCommunity (communityId, data) {
    const body = {
      community_id: communityId,
      paddle: data.has_paddle_court,
      tennis: data.has_tennis_court,
      pool: data.has_tennis_court,
      cameras: data.has_cameras
    }
    return http.put(API_URL_PATH + 'updateCommunity', body)
  }
  // Search all communities data to admin home
  searchDBCommunities () {
    return http.get(API_URL_PATH + 'searchDBCommunities')
  }
   // Search data floors and doors available
  searchMyCommunity (communityId) {
    return http.get(API_URL_PATH + 'searchMyCommunity?community_id=' + communityId)
  }
  // Search data floors and doors not available
  searchMyCommunity2 (communityId,floor,door) {
    return http.get(API_URL_PATH + 'searchMyCommunity2?community_id=' + communityId + '&floor=' + floor + '&door=' + door)
  }
  // Search if community has doorman and not registered
  searchDoorman (communityId) {
    return http.get(API_URL_PATH + 'searchDoorman?community_id=' + communityId)
  }
}
export default new ServicesCommunity()