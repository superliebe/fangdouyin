import axios from 'axios'
// import axios from "../src/api/axios.js"
import Qs from 'qs'
let host = 'http://op.mddyg.com/'
host = window.location.protocol === 'file:' ? host : ''
if (process.env.NODE_ENV === 'development') {
  host = ''
}
 
axios.interceptors.response.use(response => response, error => Promise.resolve(error.response))
 
export default {
  post(url, data) {
    return axios({
      method: 'post',
      url: url,
      baseURL: host,
      data: Qs.stringify(data),
      timeout: 30000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
  },
  uploadFile(url, data) {
    return axios({
      method: 'post',
      url: url,
      baseURL: host,
      data: Qs.stringify(data),
      timeout: 30000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  get(url, params) {
    return axios({
      method: 'get',
      url: url,
      baseURL: host,
      params,
      timeout: 30000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
  }
}
