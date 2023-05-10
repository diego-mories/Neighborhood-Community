import Vue from 'vue'
import Router from 'vue-router'
// >> Views
import Home from '../views/Home'
import Login from '../views/Login'
import BookingCourts from '../views/BookingCourts'
import TennisCourt from '../views/TennisCourt'
import PaddleCourt from '../views/PaddleCourt'
import Notices from '../views/Notices'
import Deliveries from '../views/Deliveries'
import Profile from '../views/Profile'
import ForgotPassword from '../views/ForgotPassword'
import ChangePassword from '../views/ChangePassword'
import ConfigurationExpenses from '../views/ConfigurationExpenses'
import RegisterUser from '../views/RegisterUser'
import NewCommunity from '../views/NewCommunity'
import Cameras from '../views/Cameras'
import ConfigurationCommunity from '../views/ConfigurationCommunity'
import ActiveUser from '../views/ActiveUser'
import Bills from '../views/Bills'
import Spills from '../views/Spills'
import Payments from '../views/Payments'
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
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/bookingCourts',
      name: 'BookingCourts',
      component: BookingCourts
    },
    {
      path: '/spills',
      name: 'Spills',
      component: Spills
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
      path: '/payments',
      name: 'Payments',
      component: Payments
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
    },
    {
      path: '/changePassword',
      name: 'ChangePassword',
      component: ChangePassword
    },
    {
      path: '/configurationExpenses',
      name: 'ConfigurationExpenses',
      component: ConfigurationExpenses
    },
    {
      path: '/registerUser',
      name: 'RegisterUser',
      component: RegisterUser
    },
    {
      path: '/newCommunity',
      name: 'NewCommunity',
      component: NewCommunity
    },
    {
      path: '/cameras',
      name: 'Cameras',
      component: Cameras
    },
    {
      path: '/configurationCommunity',
      name: 'ConfigurationCommunity',
      component: ConfigurationCommunity
    },
    {
      path: '/activeUser/:tokenActive',
      name: 'ActiveUser',
      component: ActiveUser
    },
    {
      path: '/bills',
      name: 'Bills',
      component: Bills
    }
  ]
})
