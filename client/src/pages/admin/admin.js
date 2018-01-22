// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './app'

import iView from 'iview'
import 'iview/dist/styles/iview.css'
import axios from 'axios'

Vue.config.productionTip = false;
Vue.use(iView);
Vue.prototype.axios = axios;


/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  render: h => h(App),
  // router,
  template: '<App/>',
  components: { App }
});
