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
      path: '/booking-courts',
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
      path: '/tennis-court',
      name: 'TennisCourt',
      component: TennisCourt,
      beforeEnter : guardMyrouteLogin
    },
    {
      path: '/paddle-court',
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
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPassword,
      beforeEnter : guardMyrouteLogin
    },
    {
      path: '/change-password',
      name: 'ChangePassword',
      component: ChangePassword,
      beforeEnter : guardMyrouteLogin
    },
    {
      path: '/register-user',
      name: 'RegisterUser',
      component: RegisterUser,
      beforeEnter : guardMyrouteLogin
    },
    {
      path: '/new-community',
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
      path: '/active-user/:tokenActive',
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
      if (to.path === "/bills" || to.path === "/contact"  || to.path === "/register-user"|| to.path === "/notices"|| to.path === "/new-community"|| to.path === "/cameras"|| to.path === "/spills") next('/login') 
      else  next() 
    } 
    if (user.role_id === 1) {
      if (to.path === "/") next('/login') 
      else  next() 
      if (to.path === "/cameras" || to.path === "/contact" || to.path === "/new-community") next('/login') 
      else  next() 
    }
    if (user.role_id === 2) {
      if (to.path === "/") next('/login') 
      else  next() 
      if (to.path === "/bills" || to.path === "/tickets" ||  to.path === "/register-user"|| to.path === "/notices"|| to.path === "/new-community"|| to.path === "/booking-courts"|| to.path === "/spills"|| to.path === "/tennis-court"|| to.path === "/paddle-court" || to.path === "/payments") next('/login') 
      else  next() 
    }
    if (user.is_admin) {
      if (to.path === "/") next('/login') 
      else  next() 
      if (to.path === "/bills" || to.path === "/tickets" || to.path === "/contact" || to.path === "/register-user"|| to.path === "/notices"|| to.path === "/bookingCourts"|| to.path === "/spills"|| to.path === "/tennis-court"|| to.path === "/paddle-court"|| to.path === "/cameras"|| to.path === "/paddle-court"|| to.path === "/payments") next('/login') 
      else  next() 
    }
  } 
  else
  { 
    if (to.path === "/forgot-password" || to.path === "/" ) next() 
    else  next('/')
  }
}

