import axios from 'axios'

export default() => {
  return axios.create({
    baseUrl: process.env.baseURL || 'http://localhost:5000'
  })
}
