import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Authentication from '@/components/Authentication'
import MusicHome from '@/components/MusicHome'
import NotFoundComponent from '@/components/NotFoundComponent'
import {store} from '../store/index'

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/music')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')
}

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
      props: {formType: 'Login'},
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/register',
      component: Authentication
    },
    {
      path: '/music',
      component: MusicHome,
      beforeEnter: ifAuthenticated
    },
    {
      path: '*',
      component: NotFoundComponent
    }
  ]
})
