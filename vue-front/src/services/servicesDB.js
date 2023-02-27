import http from '../http-common'
const API_URL_PATH = 'dataBaseServices/'

class Services {
  // test (email) {
  //   return http.get(API_URL_PATH + 'test?email=' + email)
  // }
  signIn (user) {
    console.log(' LOGIN USER', user)
    const body = {
      email: user.email,
      password: user.password
    }
    console.log('Console LOG de data del sigIn en service para mandar al servicio con la base de datos' + body.email + body.password)
    return http.post(API_URL_PATH + 'signIn', body)
  }
  signUp (user) {
    console.log(' REGISTER USER', user)
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
}

export default new Services()
