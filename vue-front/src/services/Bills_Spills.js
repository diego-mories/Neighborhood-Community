
import http from '../http-common'
const API_URL_PATH = 'bills_spills/'
class ServicesBillsSpills {
// Create new Spill
  createSpill (data) {
    const body = {
      community_id: data.community_id,
      description: data.description,
      date_p: data.date,
      amount: data.amount
    }
    return http.post(API_URL_PATH + 'createSpill', body)
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
  // Find payment
  findPayment (id) {
    return http.get(API_URL_PATH + 'findPayment?deb_id=' + id)
  }
  // Find all debs of user
  findAllDebs (user) {
    const body = {
      community_id: user.community_id,
      door: user.door,
      floor: user.floor
    }
    return http.post(API_URL_PATH + 'findAllDebs', body)
  }
  // Find all the deb ids to be able to find all the payments of that user
  findAllDebsAllIds (user) {
    const body = {
      community_id: user.community_id,
      door: user.door,
      floor: user.floor
    }
    return http.post(API_URL_PATH + 'findAllDebsAllIds', body)
  }
  // Find all bills of community
  findAllBills (communityId) {
    const body = {
      community_id: communityId
    }
    return http.post(API_URL_PATH + 'findAllBills', body)
  }
  // Register one payment
  pay (data) {
    const body = {
      deb_id: data.id,
      amount: data.amount
    }
    return http.put(API_URL_PATH + 'pay', body)
  }
}
export default new ServicesBillsSpills()
