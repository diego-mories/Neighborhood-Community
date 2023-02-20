import Vue from 'vue'
import Router from 'vue-router'
// >> Views
import Home from '../views/Home'
import LoginPresident from '../views/LoginPresident'
import BookingCourts from '../views/BookingCourts'
import TennisCourt from '../views/TennisCourt'
import PaddleCourt from '../views/PaddleCourt'
import Notices from '../views/Notices'
import Deliveries from '../views/Deliveries'
import Profile from '../views/Profile'
import ForgotPassword from '../views/ForgotPassword'
// >> Boostrap
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/loginPresident',
      name: 'LoginPresident',
      component: LoginPresident
    },
    {
      path: '/bookingCourts',
      name: 'BookingCourts',
      component: BookingCourts
    },
    {
      path: '/tennisCourt',
      name: 'TennisCourt',
      component: TennisCourt
    },
    {
      path: '/paddleCourt',
      name: 'PaddleCourt',
      component: PaddleCourt
    },
    {
      path: '/notices',
      name: 'Notices',
      component: Notices
    },
    {
      path: '/deliveries',
      name: 'Deliveries',
      component: Deliveries
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/forgotPassword',
      name: 'ForgotPassword',
      component: ForgotPassword
    }
  ]
})
