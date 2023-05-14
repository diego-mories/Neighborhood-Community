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
      component: Home,
      beforeEnter : guardMyrouteLogin
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter : guardMyrouteLogin
    },
    {
      path: '/bookingCourts',
      name: 'BookingCourts',
      component: BookingCourts,
      beforeEnter : guardMyrouteLogin
    },
    {
      path: '/spills',
      name: 'Spills',
      component: Spills,
      beforeEnter : guardMyrouteLogin
    },
    {
      path: '/tennisCourt',
      name: 'TennisCourt',
      component: TennisCourt,
      beforeEnter : guardMyrouteLogin
    },
    {
      path: '/paddleCourt',
      name: 'PaddleCourt',
      component: PaddleCourt,
      beforeEnter : guardMyrouteLogin
    },
    {
      path: '/notices',
      name: 'Notices',
      component: Notices,
      beforeEnter : guardMyrouteLogin
    },
    {
      path: '/deliveries',
      name: 'Deliveries',
      component: Deliveries,
      beforeEnter : guardMyrouteLogin
    },
    {
      path: '/payments',
      name: 'Payments',
      component: Payments,
      beforeEnter : guardMyrouteLogin
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter : guardMyrouteLogin
    },
    {
      path: '/forgotPassword',
      name: 'ForgotPassword',
      beforeEnter : guardMyrouteLogin
    },
    {
      path: '/changePassword',
      name: 'ChangePassword',
      component: ChangePassword,
      beforeEnter : guardMyrouteLogin
    },
    {
      path: '/configurationExpenses',
      name: 'ConfigurationExpenses',
      component: ConfigurationExpenses,
      beforeEnter : guardMyrouteLogin
    },
    {
      path: '/registerUser',
      name: 'RegisterUser',
      component: RegisterUser,
      beforeEnter : guardMyrouteLogin
    },
    {
      path: '/newCommunity',
      name: 'NewCommunity',
      component: NewCommunity,
      beforeEnter : guardMyrouteLogin
    },
    {
      path: '/cameras',
      name: 'Cameras',
      component: Cameras,
      beforeEnter : guardMyrouteLogin
    },
    {
      path: '/configurationCommunity',
      name: 'ConfigurationCommunity',
      component: ConfigurationCommunity,
      beforeEnter : guardMyrouteLogin
    },
    {
      path: '/activeUser/:tokenActive',
      name: 'ActiveUser',
      component: ActiveUser,
      beforeEnter : guardMyrouteLogin
    },
    {
      path: '/bills',
      name: 'Bills',
      component: Bills,
      beforeEnter : guardMyrouteLogin
    }
  ]
})

function guardMyrouteLogin(to, from, next){
  var isAuthenticated = false
  if (localStorage.getItem('userLogin'))
    isAuthenticated = true;
  else
    isAuthenticated = false
  let user = JSON.parse(localStorage.getItem('userLogin'))
  if (isAuthenticated) 
  {
    console.log(user.role_id)
    if (user.role_id === 3) {
      if (to.path === "/") next('/login') 
      else  next() 
      if (to.path === "/bills" || to.path === "/registerUser"|| to.path === "/notices"|| to.path === "/newCommunity"|| to.path === "/cameras"|| to.path === "/spills") next('/login') 
      else  next() 
    } 
    if (user.role_id === 1) {
      if (to.path === "/") next('/login') 
      else  next() 
      if (to.path === "/cameras" || to.path === "/newCommunity") next('/login') 
      else  next() 
    }
    if (user.role_id === 2) {
      if (to.path === "/") next('/login') 
      else  next() 
      if (to.path === "/bills" || to.path === "/registerUser"|| to.path === "/notices"|| to.path === "/newCommunity"|| to.path === "/bookingCourts"|| to.path === "/spills"|| to.path === "/tennisCourt"|| to.path === "/paddleCourt") next('/login') 
      else  next() 
    }
    if (user.is_admin) {
      if (to.path === "/") next('/login') 
      else  next() 
      if (to.path === "/bills" || to.path === "/registerUser"|| to.path === "/notices"|| to.path === "/bookingCourts"|| to.path === "/spills"|| to.path === "/tennisCourt"|| to.path === "/paddleCourt"|| to.path === "/cameras"|| to.path === "/paddleCourt") next('/login') 
      else  next() 
    }
  } 
  else
  {
    if (to.path === "/") next() 
    else  next('/')
  }
}

