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

  // updateCommunity (communityId, data) {
  //   const body = {
  //     community_id: communityId,
  //     paddle: data.has_paddle_court,
  //     tennis: data.has_tennis_court,
  //     pool: data.has_tennis_court,
  //     cameras: data.has_cameras,
  //   }
  //   return http.put(API_URL_PATH + 'updateCommunity', body)
  // }
  createRowsPaddle (communityId) {
    return http.get(API_URL_PATH + 'createRowsPaddle?community_id=' + communityId)
  }
  createRowsTennis (communityId) {
    return http.get(API_URL_PATH + 'createRowsTennis?community_id=' + communityId)
  }
  deleteRowsPaddle (communityId) {
    return http.delete(API_URL_PATH + 'deleteRowsPaddle?community_id=' + communityId)
  }
  deleteRowsTennis (communityId) {
    return http.delete(API_URL_PATH + 'deleteRowsTennis?community_id=' + communityId)
  }

  // // Search community_id
  // searchCommunity (id) {
  //   return http.get(API_URL_PATH + 'searchCommunity?user_id=' + id)
  // }
  // // Search community_id
  // searchOwnersDF (communityId) {
  //   return http.get(API_URL_PATH + 'searchOwnersDF?community_id=' + communityId)
  // // }
  // searchNameCommunity (communityId) {
  //   return http.get(API_URL_PATH + 'searchNameCommunity?community_id=' + communityId)
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
  // searchDFExist (data) {
  //   let userId = data.id
  //   let communityId = data.community_id
  //   return http.get(API_URL_PATH + 'searchDFExist?community_id=' + communityId + '&user_id=' + userId)
  // }

  findBookingsT(communityId) {
    return http.get(API_URL_PATH + 'findBookingsT?community_id=' + communityId)
  }
  findBookingsP(communityId) {
    return http.get(API_URL_PATH + 'findBookingsP?community_id=' + communityId)
  }
  reserveT (user, data) {
    const body = {
      door: user.door,
      floor: user.floor,
      community_id: user.community_id,
      time_zone: data[0].time_zone
    }
    return http.put(API_URL_PATH + 'reserveT', body)
  }
  reserveP (user, data) {
    const body = {
      door: user.door,
      floor: user.floor,
      community_id: user.community_id,
      time_zone: data[0].time_zone
    }
    return http.put(API_URL_PATH + 'reserveP', body)
  }
  findMyBookT (user) {
    return http.get(API_URL_PATH + 'findMyBookT?community_id=' + user.community_id + '&floor=' + user.floor+ '&door=' + user.door)
  }
  findMyBookP (user) {
    return http.get(API_URL_PATH + 'findMyBookP?community_id=' + user.community_id + '&floor=' + user.floor+ '&door=' + user.door)
  }
  cancelBookT (user, data) {
    const body = {
      floor: user.floor,
      door: user.door,
      time_zone: data,
      community_id: user.community_id,
    }
    return http.put(API_URL_PATH + 'cancelBookT', body)
  }
  cancelBookP (user, data) {
    const body = {
      floor: user.floor,
      door: user.door,
      time_zone: data,
      community_id: user.community_id,
    }
    return http.put(API_URL_PATH + 'cancelBookP', body)
  }

  // Regsiter new comminity
  // newCommunity (data) {
  //   const body = {
  //     nameC: data.nameC,
  //     paddle: data.paddle,
  //     tennis: data.tennis,
  //     pool: data.pool,
  //     doorman: data.doorman,
  //     cameras: data.cameras,
  //     myDoor: data.myDoor,
  //     myFloor: data.myFloor,
  //     floors: data.floors,
  //     doors: data.doors
  //   }
  //   return http.post(API_URL_PATH + 'newCommunity', body)
  // }
  // // Create rows with house
  // insertRowsFD (data) {
  //   const body = {
  //     community_id: data.community_id,
  //     floor: data.floor,
  //     door: data.door
  //   }
  //   return http.put(API_URL_PATH + 'insertRowsFD', body)
  // }
  // // Update data floors and doors, president and new users
  // uptadeFD (data) {
  //   const body = {
  //     id: data.id,
  //     myFloor: data.myFloor,
  //     myDoor: data.myDoor,
  //     role_id: data.role_id,
  //     community_id: data.community_id
  //   }
  //   return http.put(API_URL_PATH + 'uptadeFD', body)
  // }
  // updateFDDoorman (data) {
  //   const body = {
  //     user_id: data.id,
  //     community_id: data.community_id,
  //     role_id: data.role_id
  //   }
  //   return http.post(API_URL_PATH + 'updateFDDoorman', body)
  // }
  // Search communities data to admin
  // searchDBCommunities () {
  //   return http.get(API_URL_PATH + 'searchDBCommunities')
  // }
  // // Search data floors and doors available
  // searchMyCommunity (communityId) {
  //   return http.get(API_URL_PATH + 'searchMyCommunity?community_id=' + communityId)
  // }
  // searchMyCommunity2 (communityId,floor,door) {
  //   return http.get(API_URL_PATH + 'searchMyCommunity2?community_id=' + communityId + '&floor=' + floor + '&door=' + door)
  // }

  // // Search if community has doorman and not registered
  // searchDoorman (communityId) {
  //   return http.get(API_URL_PATH + 'searchDoorman?community_id=' + communityId)
  // }
  // updatePresident(data) {
  //   const body = {
  //     floorNew: data.floorNew,
  //     doorNew: data.doorNew,
  //     floorP: data.floorP,
  //     doorP: data.doorP
  //   }
  //   return http.post(API_URL_PATH + 'updatePresident', body)

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
