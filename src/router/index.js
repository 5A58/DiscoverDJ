import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Authentication from '@/components/Authentication'
import MusicHome from '@/components/MusicHome'
import DJDashboard from '@/components/DJDashboard'
import NotFoundComponent from '@/components/NotFoundComponent'
import AuthenticationService from '@/services/AuthenticationService'
import {store} from '../store/index'

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/music')
}

const pageOwnerExists = (to, from, next) => {
  AuthenticationService.getUserID(to.params.username).then(resp => {
    next()
  }).catch(err => {
    console.log('The page owner does not exist', err)
    to.params.pageOwned = false
    next()
  })
}

// const ifAuthenticated = (to, from, next) => {
//   if (store.getters.isAuthenticated) {
//     next()
//     return
//   }
//   next('/login')
// }

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/login',
      component: Authentication,
      props: {formType: 'Log in'},
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/register',
      component: Authentication
    },
    {
      path: '/music',
      component: MusicHome
    },
    {
      path: '/music/:username',
      component: DJDashboard,
      beforeEnter: pageOwnerExists
    },
    {
      path: '*',
      component: NotFoundComponent
    }
  ]
})
