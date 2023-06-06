import Vue from 'vue'
import App from './App'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2'
import BootstrapVue from 'bootstrap-vue'
import moment from 'moment'
import VeeValidate, { Validator } from 'vee-validate'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import {
  faArrowAltCircleLeft,
  faTentArrowTurnLeft,
  faPowerOff,
  faAddressBook,
  faCalendar,
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
library.add(
  faArrowAltCircleLeft,
  faTentArrowTurnLeft,
  faAddressBook,
  faPowerOff,
  faCalendar,
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
  faPhone
)

Vue.config.productionTip = false
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueSweetalert2)
Vue.use(BootstrapVue)
Vue.use(VeeValidate, {
  inject: true,
  fieldsBagName: 'veeFields',
  errorBagName: 'veeErrors'
})

Vue.filter('formatDateP', function (value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY HH:mm')
  }
})

Vue.filter('formatBooking', function (value) {
  if (value === 0) return '🚫 '
})

Vue.filter('formatBill', function (value) {
  if (value === 1) return '🔥'
  if (value === 2) return '💡'
  if (value === 3) return '💧'
  if (value === null) return 'DERRAMA'
})

Vue.filter('formatBillP', function (value) {
  if (value === 1) return 'GAS'
  if (value === 2) return 'LUZ'
  if (value === 3) return 'AGUA'
  if (value === null) return 'DERRAMA'
})

Vue.filter('formatDescription', function (value) {
  if (value === '' || value === null) return '-------'
  else return value
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

new Vue({
  el: '#app',
  router,
  mode: 'history',
  components: { App },
  template: '<App/>'
})
