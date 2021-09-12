import Vue from 'vue'
import ElementUI from 'element-ui'
import MyHttpServer from '@/plugins/http.js'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css'
import App from './App'
import router from './router'
import moment from 'moment'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(MyHttpServer)

// 全局過濾器 - 處理日期
Vue.filter('fmtdate',(v)=>{
  return moment(v).format('YYYY-MM-DD')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
