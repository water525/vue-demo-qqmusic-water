// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import vuelazyload from 'vue-lazyload';
import store from './store/index.js';
import './common/stylus/common.styl';

Vue.config.productionTip = false;

Vue.prototype.$http = axios;

Vue.use(vuelazyload, {
  preLoad: 1.3,
  error: '../static/images/loading.gif',
  loading: '../static/images/loading.gif'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App}
});
