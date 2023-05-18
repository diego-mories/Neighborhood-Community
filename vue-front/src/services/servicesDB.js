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

  // createRowsPaddle (communityId) {
  //   return http.get(API_URL_PATH + 'createRowsPaddle?community_id=' + communityId)
  // }
  // createRowsTennis (communityId) {
  //   return http.get(API_URL_PATH + 'createRowsTennis?community_id=' + communityId)
  // }
  // deleteRowsPaddle (communityId) {
  //   return http.delete(API_URL_PATH + 'deleteRowsPaddle?community_id=' + communityId)
  // }
  // deleteRowsTennis (communityId) {
  //   return http.delete(API_URL_PATH + 'deleteRowsTennis?community_id=' + communityId)
  // }

  sendNotice (id, date, hour, orderDay) {
    const body = {
      user_id: id,
      date: date,
      hour: hour,
      orderDay: orderDay
    }
    return http.post(API_URL_PATH + 'sendNotice', body)
  }

  // findBookingsT(communityId) {
  //   return http.get(API_URL_PATH + 'findBookingsT?community_id=' + communityId)
  // }
  // findBookingsP(communityId) {
  //   return http.get(API_URL_PATH + 'findBookingsP?community_id=' + communityId)
  // }
  // reserveT (user, data) {
  //   const body = {
  //     door: user.door,
  //     floor: user.floor,
  //     community_id: user.community_id,
  //     time_zone: data[0].time_zone
  //   }
  //   return http.put(API_URL_PATH + 'reserveT', body)
  // }
  // reserveP (user, data) {
  //   const body = {
  //     door: user.door,
  //     floor: user.floor,
  //     community_id: user.community_id,
  //     time_zone: data[0].time_zone
  //   }
  //   return http.put(API_URL_PATH + 'reserveP', body)
  // }
  // findMyBookT (user) {
  //   return http.get(API_URL_PATH + 'findMyBookT?community_id=' + user.community_id + '&floor=' + user.floor+ '&door=' + user.door)
  // }
  // findMyBookP (user) {
  //   return http.get(API_URL_PATH + 'findMyBookP?community_id=' + user.community_id + '&floor=' + user.floor+ '&door=' + user.door)
  // }
  // cancelBookT (user, data) {
  //   const body = {
  //     floor: user.floor,
  //     door: user.door,
  //     time_zone: data,
  //     community_id: user.community_id,
  //   }
  //   return http.put(API_URL_PATH + 'cancelBookT', body)
  // }
  // cancelBookP (user, data) {
  //   const body = {
  //     floor: user.floor,
  //     door: user.door,
  //     time_zone: data,
  //     community_id: user.community_id,
  //   }
  //   return http.put(API_URL_PATH + 'cancelBookP', body)
  // }

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
  contact (msg,email) {
    const body = {
      msg: msg,
      email: email
    }
    return http.post(API_URL_PATH + 'contact', body)

  }
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
  
  deleteDP (user) {
    return http.delete(API_URL_PATH + 'deleteDP?community_id=' + user.community_id + '&door=' + user.door + '&floor=' + user.floor )
  }
  deleteDoorman (communityId) {
    return http.delete(API_URL_PATH + 'deleteDoorman?community_id=' + communityId)
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
  findPayment (id) {
    return http.get(API_URL_PATH + 'findPayment?deb_id=' + id)
  }
  findAllDebsAllIds (user) {
    const body = {
      community_id: user.community_id,
      door: user.door,
      floor: user.floor
    }
    return http.post(API_URL_PATH + 'findAllDebsAllIds', body)
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
