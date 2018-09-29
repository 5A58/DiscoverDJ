import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('/register', credentials)
  },
  login (credentials) {
    return Api().post('/login', credentials)
  },
  getUsername (id) {
    return Api().get('/user/i/' + id)
  },
  getUserID (username) {
    return Api().get('/user/u/' + username)
  }
}
