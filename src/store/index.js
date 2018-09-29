import Vue from 'vue'
import Vuex from 'vuex'
import AuthenticationService from '@/services/AuthenticationService'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('user-token') || '',
    username: ''
  },
  getters: {
    isAuthenticated: state => !!state.token
  },
  mutations: {
    authSuccess: (state, payload) => {
      state.token = payload.token
      state.username = payload.username
    },
    logout: (state) => {
      state.token = ''
      state.username = ''
    },
    setUsername: (state, username) => {
      state.username = username
    }
  },
  actions: {
    async login ({commit, dispatch}, credentials) {
      return new Promise((resolve, reject) => {
        AuthenticationService.login(credentials).then(resp => {
          commit('authSuccess', {token: resp.data.id, username: resp.data.username})
          localStorage.setItem('user-token', resp.data.id)
          resolve('Success')
        }).catch(err => {
          localStorage.removeItem('user-token')
          commit('logout')
          reject(err)
        })
      })
    },
    async register ({commit, dispatch}, credentials) {
      return new Promise((resolve, reject) => {
        AuthenticationService.register(credentials).then(resp => {
          commit('authSuccess', resp.data.id, resp.data.username)
          localStorage.setItem('user-token', resp.data.id)
          resolve('Success')
        }).catch(err => {
          localStorage.removeItem('user-token')
          commit('logout')
          reject(err)
        })
      })
    },
    logout ({commit}) {
      localStorage.removeItem('user-token')
      commit('logout')
    },
    getCurrentUsername ({commit, state}) {
      return new Promise((resolve, reject) => {
        if (state.username) {
          resolve(state.username)
        } else if (state.token) {
          // User logged in, but username not saved
          AuthenticationService.getUsername(state.token).then(resp => {
            resolve(resp.data)
          }).catch(err => {
            console.log('err in get username', err)
          })
        } else {
          // User not logged in
          resolve('')
        }
      })
    }
  }
})
