import http from '../http-common'
const API_URL_PATH = 'dataBaseServices/'

class Services {
  // Login
  login (user) {
    const body = {
      email: user.email,
      password: user.password
    }
    return http.post(API_URL_PATH + 'login', body)
  }
  // Register new user
  signUp (user) {
    const body = {
      name: user.name,
      surname: user.surname,
      community_id: user.community_id,
      email: user.email,
      phone: user.phone,
      role: user.role
    }
    return http.post(API_URL_PATH + 'signUp', body)
  }
  // Active user to login
  activeUser (tokenActive) {
    return http.get(API_URL_PATH + 'activeUser?tokenActive=' + tokenActive)
  }
  // Search community_id
  searchCommunity (id) {
    return http.get(API_URL_PATH + 'searchCommunity?user_id=' + id)
  }
  // Search community_id
  searchOwnersDF (communityId) {
    return http.get(API_URL_PATH + 'searchOwnersDF?community_id=' + communityId)
  }
  searchNameCommunity (communityId) {
    return http.get(API_URL_PATH + 'searchNameCommunity?community_id=' + communityId)
  }
  searchDFExist (data) {
    let userId = data.id
    let communityId = data.community_id
    return http.get(API_URL_PATH + 'searchDFExist?community_id=' + communityId + '&user_id=' + userId)
  }
  findOne (id) {
    return http.get(API_URL_PATH + 'findOne?user_id=' + id)
  }
  findOneEmail (email) {
    return http.get(API_URL_PATH + 'findOneEmail?email=' + email)
  }
  // Register doorman, if exist
  signUpDoorman (user) {
    const body = {
      name: user.name,
      surname: user.surname,
      email: user.email,
      phone: user.phone,
      role_id: user.role_id,
      community_id: user.community_id
    }
    console.log(body)
    return http.post(API_URL_PATH + 'signUpDoorman', body)
  }
  // Reset password user
  resetPassword (email) {
    return http.get(API_URL_PATH + 'resetPassword?email=' + email)
  }
  // Change password user
  changePassword (tokenPass, password, userPass) {
    const body = {
      tokenPass: tokenPass,
      password: password,
      userPass: userPass
    }
    return http.post(API_URL_PATH + 'changePassword', body)
  }
  // Regsiter new comminity
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
  // Confgure community
  confCommunity (data) {
    const body = {
      id: data.id,
      community_id: data.community_id,
      paddle: data.paddle,
      tennis: data.tennis,
      pool: data.pool,
      doorman: data.paddle,
      cameras: data.cameras,
      myDoor: data.myDoor,
      myFloor: data.myFloor,
      floors: data.floors,
      doors: data.doors
    }
    return http.put(API_URL_PATH + 'confCommunity', body)
  }
  // Create rows with house
  insertRowsFD (data) {
    const body = {
      community_id: data.community_id,
      floor: data.floor,
      door: data.door
    }
    return http.put(API_URL_PATH + 'insertRowsFD', body)
  }
  // Update data floors and doors, president and new users
  uptadeFD (data) {
    const body = {
      id: data.id,
      myFloor: data.myFloor,
      myDoor: data.myDoor,
      role_id: data.role_id,
      community_id: data.community_id
    }
    console.log(body)
    return http.put(API_URL_PATH + 'uptadeFD', body)
  }
  // Search communities data to admin
  searchDBCommunities () {
    return http.get(API_URL_PATH + 'searchDBCommunities')
  }
  // Search data floors and doors available
  searchMyCommunity (communityId) {
    return http.get(API_URL_PATH + 'searchMyCommunity?community_id=' + communityId)
  }
  searchDF (userId) {
    return http.get(API_URL_PATH + 'searchMyCommunity?user_id=' + userId)
  }
  // Search if community has doorman and not registered
  searchDoorman (communityId) {
    return http.get(API_URL_PATH + 'searchDoorman?community_id=' + communityId)
  }
  // Create new Bill
  createBill (data) {
    const body = {
      community_id: data.community_id,
      date_p: data.date,
      type: data.type,
      amount: data.amount
    }
    return http.post(API_URL_PATH + 'createBill', body)
  }
  // Find all debs user
  findAllDebs (user) {
    const body = {
      community_id: user.community_id,
      door: user.door,
      floor: user.floor
    }
    return http.post(API_URL_PATH + 'findAllDebs', body)
  }
  findAllBills (communityId) {
    const body = {
      community_id: communityId
    }
    return http.post(API_URL_PATH + 'findAllBills', body)
  }
  pay (data) {
    const body = {
      deb_id: data.id,
      amount: data.amount
    }
    console.log(body)
    return http.put(API_URL_PATH + 'pay', body)
  }
}

export default new Services()
