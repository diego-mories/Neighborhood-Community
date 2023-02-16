import Vue from 'vue'
import Router from 'vue-router'
// >> Views
import Home from '../views/Home'
import LoginOwner from '../views/LoginOwner'
import BookingCourts from '../views/BookingCourts'
import TennisCourt from '../views/TennisCourt'
import PaddleCourt from '../views/PaddleCourt'
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
      path: '/loginOwner',
      name: 'LoginOwner',
      component: LoginOwner
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
    }
  ]
})
