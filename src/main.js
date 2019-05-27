// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import axios from 'axios'
import echarts from 'echarts'
import echartsgl from 'echarts-gl'
import 'babel-polyfill'

Vue.prototype.$echarts = echarts
Vue.prototype.echartsgl = echartsgl
Vue.prototype.timeInterval = 60000

// axios.defaults.baseURL = process.env.API_ROOT;
Vue.prototype.axios = axios

Vue.config.productionTip = false
/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
