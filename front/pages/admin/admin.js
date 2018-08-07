// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './app'
import router from './router/index'
import { createStore } from '../../modules/vuex/store'
import axios from '../../modules/util/adAxios'
import { Notice,Button } from 'iview'

if(typeof window !== 'undefined'){
  const OfflinePluginRuntime = require('offline-plugin/runtime')
    OfflinePluginRuntime.install({
    onUpdateReady () {
      OfflinePluginRuntime.applyUpdate()
    },
    onUpdated () {
      window.location.reload()
    }
  });
  router.beforeEach((to,from,next)=>{
    let token = sessionStorage.getItem('token');
    // console.log(to.matched.some(({meta}) => meta.auth));
    if(to.matched.some(({meta}) => meta.auth)){
      if(!token){
        next('/admin/login');
      } else {
        next();
      }
    } else {
      next();
    }
  });
}


Vue.config.productionTip = false;
Vue.prototype.axios = axios;
Vue.prototype.$Notice = Notice;
Vue.component('Button',Button);

const store = new createStore();
/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  template: '<App/>',
  components: { App }
});
