import http from '../http-common'
const API_URL_PATH = 'bookings/'

class ServicesBookings {
  // If the community has a tennis court in its configuration, we create the rows in the reservations table
  createRowsTennis (communityId) {
    return http.get(API_URL_PATH + 'createRowsTennis?community_id=' + communityId)
  }
  // If the community has a paddle court in its configuration, we create the rows in the reservations table
  createRowsPaddle (communityId) {
    return http.get(API_URL_PATH + 'createRowsPaddle?community_id=' + communityId)
  }
  // if exist, find my book of tennis court
  findMyBookT (user) {
    return http.get(API_URL_PATH + 'findMyBookT?community_id=' + user.community_id + '&floor=' + user.floor + '&door=' + user.door)
  }
  // if exist, find my book of paddle court
  findMyBookP (user) {
    return http.get(API_URL_PATH + 'findMyBookP?community_id=' + user.community_id + '&floor=' + user.floor + '&door=' + user.door)
  }
  // Search bookings if tennis court of this community
  findBookingsT (communityId) {
    return http.get(API_URL_PATH + 'findBookingsT?community_id=' + communityId)
  }
  // Search bookings if paddle court of this community
  findBookingsP (communityId) {
    return http.get(API_URL_PATH + 'findBookingsP?community_id=' + communityId)
  }
  // If the community stops having paddle court in its configuration, we create the rows in the reservations table
  deleteRowsPaddle (communityId) {
    return http.delete(API_URL_PATH + 'deleteRowsPaddle?community_id=' + communityId)
  }
  // If the community stops having tennis court in its configuration, we create the rows in the reservations table
  deleteRowsTennis (communityId) {
    return http.delete(API_URL_PATH + 'deleteRowsTennis?community_id=' + communityId)
  }
  // Put reserve tennis court
  reserveT (user, data) {
    const body = {
      door: user.door,
      floor: user.floor,
      community_id: user.community_id,
      time_zone: data[0].time_zone
    }
    return http.put(API_URL_PATH + 'reserveT', body)
  }
  // Put reserve paddle court
  reserveP (user, data) {
    const body = {
      door: user.door,
      floor: user.floor,
      community_id: user.community_id,
      time_zone: data[0].time_zone
    }
    return http.put(API_URL_PATH + 'reserveP', body)
  }
  // Cancel my book of tennis court
  cancelBookT (user, data) {
    const body = {
      floor: user.floor,
      door: user.door,
      time_zone: data,
      community_id: user.community_id
    }
    return http.put(API_URL_PATH + 'cancelBookT', body)
  }
  // Cancel my book of paddle court
  cancelBookP (user, data) {
    const body = {
      floor: user.floor,
      door: user.door,
      time_zone: data,
      community_id: user.community_id
    }
    return http.put(API_URL_PATH + 'cancelBookP', body)
  }
}
export default new ServicesBookings()
