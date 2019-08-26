import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'
import VueRouter from 'vue-router';

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.axios = Axios
Axios.defaults.baseURL = 'http://admin.com/admin/'

// 只要发送axios请求就会触发这个方法
Axios.interceptors.request.use(config => {
  console.log(config)
  let token = localStorage.getItem('token')
  if(token)
  {
    config.headers['Authorization'] = token
  }
  return config
})
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
