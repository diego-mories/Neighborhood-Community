// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'sweetalert2/dist/sweetalert2.min.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faArrowUpFromBracket,
  faFileInvoice,
  faTicket,
  faMoneyCheckAlt,
  faUserSecret,
  faTableTennisPaddleBall,
  faUser,
  faThumbTack,
  faBoxOpen,
  faLeftLong,
  faSignOutAlt,
  faUserAlt,
  faGroupArrowsRotate,
  faVideo,
  faFileZipper,
  faEnvelope,
  faKey,
  faMoneyBills,
  faPhone
} from '@fortawesome/free-solid-svg-icons'
import {
  faTwitter,
  faInstagram,
  faFacebook
} from '@fortawesome/free-brands-svg-icons'
import BootstrapVue from 'bootstrap-vue'
library.add(
  faArrowUpFromBracket,
  faFileInvoice,
  faTicket,
  faMoneyCheckAlt,
  faUserSecret,
  faTwitter,
  faInstagram,
  faFacebook,
  faTableTennisPaddleBall,
  faUser,
  faThumbTack,
  faBoxOpen,
  faLeftLong,
  faSignOutAlt,
  faUserAlt,
  faGroupArrowsRotate,
  faVideo,
  faFileZipper,
  faEnvelope,
  faKey,
  faMoneyBills,
  faPhone)
Vue.config.productionTip = false
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueSweetalert2)
Vue.use(BootstrapVue)

Vue.filter('formatBill', function (value) {
  if (value === 1) return '🔥'
  if (value === 2) return '💡'
  if (value === 3) return '💧'
})

Vue.filter('formatAmount', function (value) {
  return value + ' €'
})
Vue.filter('formatDate', function (value) {
  var fecha = value.split('-')
  var año = fecha[0]
  var mes = fecha[1]
  if (mes === '01') mes = 'Enero'
  if (mes === '02') mes = 'Febrero'
  if (mes === '03') mes = 'Marzo'
  if (mes === '04') mes = 'Abril'
  if (mes === '05') mes = 'Mayo'
  if (mes === '06') mes = 'Junio'
  if (mes === '07') mes = 'Julio'
  if (mes === '08') mes = 'Agosto'
  if (mes === '09') mes = 'Septiembre'
  if (mes === '10') mes = 'Octubre'
  if (mes === '11') mes = 'Noviembre'
  if (mes === '12') mes = 'Diciembre'
  return mes + ' (' + año + ')'
})
// Vue.filter('gas', function (value) {
//   if (value === 1) console.log(value)
//   else return 'CACA'
// })
// Vue.filter('light', function (value) {
//   if (value === 1) console.log(value)
//   else return 'CACA'
// })
// Vue.filter('water', function (value) {
//   if (value === 1) console.log(value)
//   else return 'CACA'
// })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  mode: 'history',
  components: { App },
  template: '<App/>'
})
