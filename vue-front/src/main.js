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
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  mode: 'history',
  components: { App },
  template: '<App/>'
})
