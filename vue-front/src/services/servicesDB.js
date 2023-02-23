import http from '../http-common'
const API_URL_PATH = '/dataBaseServices/'

class Services {
  test (email) {
    return http.get(API_URL_PATH + 'test?email=' + email)
  }
}

export default new Services()
