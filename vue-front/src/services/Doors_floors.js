import http from '../http-common'
const API_URL_PATH = 'dataBaseServices/'

class ServicesDoorsFloors {
  // We search if there is any user with this id in this same community
  searchDFExist (data) {
    let userId = data.id
    let communityId = data.community_id
    return http.get(API_URL_PATH + 'searchDFExist?community_id=' + communityId + '&user_id=' + userId)
  }
  // Insert new doorman on doors_floors and update data of community about doorman
  updateFDDoorman (data) {
    const body = {
      user_id: data.id,
      community_id: data.community_id,
      role_id: data.role_id
    }
    return http.post(API_URL_PATH + 'updateFDDoorman', body)
  }
  // Create rows on doors_floors of community configuration (houses)
  insertRowsFD (data) {
    const body = {
      community_id: data.community_id,
      floor: data.floor,
      door: data.door
    }
    return http.put(API_URL_PATH + 'insertRowsFD', body)
  }
  // Update data floors and doors, president and new users (assign home to a user)
  uptadeFD (data) {
    const body = {
      id: data.id,
      myFloor: data.myFloor,
      myDoor: data.myDoor,
      role_id: data.role_id,
      community_id: data.community_id
    }
    return http.put(API_URL_PATH + 'uptadeFD', body)
  }
  // Delegation of role of president in another house
  updatePresident (data) {
    const body = {
      floorNew: data.floorNew,
      doorNew: data.doorNew,
      floorP: data.floorP,
      doorP: data.doorP
    }
    return http.post(API_URL_PATH + 'updatePresident', body)
  }
}
export default new ServicesDoorsFloors()
