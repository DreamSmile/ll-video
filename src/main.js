import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as apis from './utils/api.js';
import * as util from './utils/tools.js';
import { Toast } from "vant";


Vue.config.productionTip = false
Vue.prototype.$api = apis;
Vue.prototype.$utils = util;
Vue.use(Toast);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
