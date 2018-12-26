// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/my-mint.scss'
import axios from 'axios'
import qs from 'qs'
Vue.prototype.$http = axios;

// axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.baseURL = 'http://api.kuaizijinrong.com';
axios.defaults.baseURL = 'http://192.168.1.125/KuaiZi/';

Vue.use(Mint)

Vue.config.productionTip = false

// 遍历路由name 设置页面标题
router.beforeEach((to, from, next) => {
  if (to.name) {
    document.title = to.name
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
