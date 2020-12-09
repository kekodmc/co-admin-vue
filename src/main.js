import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

//添加字体
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.min.css'


//全局变量
Vue.prototype.$host=process.env.VUE_APP_BASE_URL


import store from './utils/store'
import service from './utils/request/service/index'
Vue.prototype.$service=service

// 检查权限
import {checkPower} from "./utils/power";
checkPower()

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
