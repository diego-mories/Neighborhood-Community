import http from '../http-common'
const API_URL_PATH = 'dataBaseServices/'

class Services {

  searchTickets (data) {
    const body = {
      community_id: data.community_id,
      door: data.door,
      floor: data.floor,
    }
    return http.post(API_URL_PATH + 'searchTickets', body)
  }
  sendTicket (data) {
    const body = {
      community_id: data.community_id,
      door: data.door,
      floor: data.floor,
      email: data.email,
      tickets: data.tickets
    }
    return http.post(API_URL_PATH + 'sendTicket', body)
  }
  contact (msg,email) {
    const body = {
      msg: msg,
      email: email
    }
    return http.post(API_URL_PATH + 'contact', body)

  }
  sendNotice (id, date, hour, orderDay) {
    const body = {
      user_id: id,
      date: date,
      hour: hour,
      orderDay: orderDay
    }
    return http.post(API_URL_PATH + 'sendNotice', body)
  }

  
  
  deleteDP (user) {
    return http.delete(API_URL_PATH + 'deleteDP?community_id=' + user.community_id + '&door=' + user.door + '&floor=' + user.floor )
  }
  deleteDoorman (communityId) {
    return http.delete(API_URL_PATH + 'deleteDoorman?community_id=' + communityId)
  }

  
  deleteOH (data) {
    const body = {
      community_id: data.community_id,
      door: data.door,
      floor: data.floor
    }
    return http.put(API_URL_PATH + 'deleteOH', body)
  }
}

export default new Services()
