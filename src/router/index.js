import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Authentication from '@/components/Authentication'
import MusicHome from '@/components/MusicHome'
import NotFoundComponent from '@/components/NotFoundComponent'

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
      props: {formType: 'Login'}
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
      path: '*',
      component: NotFoundComponent
    }
  ]
})
