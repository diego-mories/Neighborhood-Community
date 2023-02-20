// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret, faTableTennisPaddleBall, faUser, faThumbTack, faBoxOpen, faLeftLong, faSignOutAlt, faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons'
library.add(faUserSecret, faTwitter, faInstagram, faFacebook, faTableTennisPaddleBall, faUser, faThumbTack, faBoxOpen, faLeftLong, faSignOutAlt, faUserAlt)
Vue.config.productionTip = false
Vue.component('font-awesome-icon', FontAwesomeIcon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  mode: 'history',
  components: { App },
  template: '<App/>'
})
