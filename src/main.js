// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 全局头部底部组件
import headerVue from './components/headerVue.vue';
Vue.component('headerVue', headerVue);
import footerVue from './components/footerVue.vue';
Vue.component('footerVue', footerVue);

import store from "./store"
Vue.prototype.$store = store;

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

// 引入axios
import axios from 'axios'


axios.defaults.baseURL = 'https://www.graycloud.top'
// axios.defaults.baseURL = 'https://192.168.2.8'
// axios.defaults.baseURL = '/api'
// axios.defaults.baseURL = 'https://www.grayclouds.cn'
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
// axios.interceptors.response.use(config => {
//   return config
// })
Vue.prototype.$axios = axios

import '@/common/filters.js'


import './assets/style.css';

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
