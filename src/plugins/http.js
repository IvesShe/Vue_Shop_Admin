import axios from 'axios'

const MyHttpServer = {}

MyHttpServer.install = (Vue) => {
  axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
  Vue.prototype.$http = axios
}

export default MyHttpServer
