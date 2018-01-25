// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from '../../modules/vuex/store'
import axios from '../../modules/util/axios'
import { Notice } from 'iview'
import 'iview/dist/styles/iview.css'

router.beforeEach((to,from,next)=>{
  let token = localStorage.getItem('token');
  // console.log(to.matched.some(({meta}) => meta.auth));
  if(to.matched.some(({meta}) => meta.auth)){
    if(!token){
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
});


Vue.config.productionTip = false;
Vue.prototype.axios = axios;
Vue.prototype.$Notice = Notice;



/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  template: '<App/>',
  components: { App }
});
