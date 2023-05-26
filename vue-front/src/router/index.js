import Vue from 'vue'
import Router from 'vue-router'
// >> Views
import Home from '../views/Home'
import Login from '../views/Login'
import BookingCourts from '../views/BookingCourts'
import TennisCourt from '../views/TennisCourt'
import PaddleCourt from '../views/PaddleCourt'
import Notices from '../views/Notices'
import Profile from '../views/Profile'
import ForgotPassword from '../views/ForgotPassword'
import ChangePassword from '../views/ChangePassword'
import RegisterUser from '../views/RegisterUser'
import NewCommunity from '../views/NewCommunity'
import Cameras from '../views/Cameras'
import ActiveUser from '../views/ActiveUser'
import Bills from '../views/Bills'
import Spills from '../views/Spills'
import Payments from '../views/Payments'
import Contact from '../views/Contact'
import Tickets from '../views/Tickets'
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
      path: '/tickets',
      name: 'Tickets',
      component: Tickets,
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
      component: ForgotPassword,
      beforeEnter : guardMyrouteLogin
    },
    {
      path: '/changePassword',
      name: 'ChangePassword',
      component: ChangePassword,
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
      path: '/activeUser/:tokenActive',
      name: 'ActiveUser',
      component: ActiveUser,
    },
    {
      path: '/bills',
      name: 'Bills',
      component: Bills,
      beforeEnter : guardMyrouteLogin
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact,
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
  console.log(isAuthenticated)
  if (isAuthenticated) 
  {
    if (user.role_id === 3) {
      if (to.path === "/") next('/login') 
      else  next() 
      if (to.path === "/bills" || to.path === "/contact"  || to.path === "/registerUser"|| to.path === "/notices"|| to.path === "/newCommunity"|| to.path === "/cameras"|| to.path === "/spills") next('/login') 
      else  next() 
    } 
    if (user.role_id === 1) {
      if (to.path === "/") next('/login') 
      else  next() 
      if (to.path === "/cameras" || to.path === "/contact" || to.path === "/newCommunity") next('/login') 
      else  next() 
    }
    if (user.role_id === 2) {
      if (to.path === "/") next('/login') 
      else  next() 
      if (to.path === "/bills" || to.path === "/tickets" ||  to.path === "/registerUser"|| to.path === "/notices"|| to.path === "/newCommunity"|| to.path === "/bookingCourts"|| to.path === "/spills"|| to.path === "/tennisCourt"|| to.path === "/paddleCourt" || to.path === "/payments") next('/login') 
      else  next() 
    }
    if (user.is_admin) {
      if (to.path === "/") next('/login') 
      else  next() 
      if (to.path === "/bills" || to.path === "/tickets" || to.path === "/contact" || to.path === "/registerUser"|| to.path === "/notices"|| to.path === "/bookingCourts"|| to.path === "/spills"|| to.path === "/tennisCourt"|| to.path === "/paddleCourt"|| to.path === "/cameras"|| to.path === "/paddleCourt"|| to.path === "/payments") next('/login') 
      else  next() 
    }
  } 
  else
  { 
    if (to.path === "/forgotPassword" || to.path === "/" ) next() 
    else  next('/')
  }
}

