import http from '../http-common'
const API_URL_PATH = 'dataBaseServices/'

class Services {
  signIn (user) {
    const body = {
      email: user.email,
      password: user.password
    }
    return http.post(API_URL_PATH + 'signIn', body)
  }
  signUp (user) {
    const body = {
      name: user.name,
      surname: user.surname,
      email: user.email,
      password: user.password,
      role: user.role,
      community_id: user.community_id,
      floor: user.floor,
      door: user.door
    }
    return http.post(API_URL_PATH + 'signUp', body)
  }
  activeUser (tokenActive) {
    return http.get(API_URL_PATH + 'activeUser?tokenActive=' + tokenActive)
  }
  resetPassword (email) {
    return http.get(API_URL_PATH + 'resetPassword?email=' + email)
  }
  changePassword (tokenPass, password, userPass) {
    const body = {
      tokenPass: tokenPass,
      password: password,
      userPass: userPass
    }
    return http.post(API_URL_PATH + 'changePassword', body)
  }
}

export default new Services()
