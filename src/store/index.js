import Vue from 'vue'
import Vuex from 'vuex'
import AuthenticationService from '@/services/AuthenticationService'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    storeExample: 12,
    token: localStorage.getItem('user-token') || ''
  },
  getters: {
    isAuthenticated: state => !!state.token
  },
  mutations: {
    authSuccess: (state, token) => {
      state.token = token
    },
    logout: (state) => {
      state.token = ''
    }
  },
  actions: {
    async login ({commit, dispatch}, credentials) {
      return new Promise((resolve, reject) => {
        AuthenticationService.login(credentials).then(resp => {
          commit('authSuccess', resp.data)
          localStorage.setItem('user-token', resp.data)
          resolve('Success')
        }).catch(err => {
          localStorage.removeItem('user-token')
          reject(err)
        })
      })
    },
    async register ({commit, dispatch}, credentials) {
      return new Promise((resolve, reject) => {
        AuthenticationService.register(credentials).then(resp => {
          commit('authSuccess', resp.data)
          localStorage.setItem('user-token', resp.data)
          resolve('Success')
        }).catch(err => {
          localStorage.removeItem('user-token')
          reject(err)
        })
      })
    },
    logout ({commit}) {
      localStorage.removeItem('user-token')
      commit('logout')
    }
  }
})
