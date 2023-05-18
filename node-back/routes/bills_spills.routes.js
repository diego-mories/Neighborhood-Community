const controller = require('../controllers/bills_spills.controller')

module.exports = function (app) {
  app.post(
    '/api/bills_spills/createSpill',
    controller.createSpill
  )
  app.post(
    '/api/bills_spills/createBill',
    controller.createBill
  )
  app.get(
    '/api/bills_spills/findPayment',
    controller.findPayment
  )
  app.post(
    '/api/bills_spills/findAllDebs',
    controller.findAllDebs
  )
  app.post(
    '/api/bills_spills/findAllDebsAllIds',
    controller.findAllDebsAllIds
  )
  app.post(
    '/api/bills_spills/findAllBills',
    controller.findAllBills
  )
  app.put(
    '/api/bills_spills/pay',
    controller.pay
  )
}