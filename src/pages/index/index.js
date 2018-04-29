// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { createRouter } from './router/index'
import { createStore } from '../../modules/vuex/store'
import axios from '../../modules/util/axios'
import { Notice } from 'iview'
import { sync } from 'vuex-router-sync'


// 移动端300ms问题解决

Vue.config.productionTip = false;
Vue.prototype.axios = axios;
Vue.prototype.$Notice = Notice;

if(typeof window !== "undefined"){
  const OfflinePluginRuntime = require('offline-plugin/runtime')
  OfflinePluginRuntime.install({
    onUpdateReady () {
      OfflinePluginRuntime.applyUpdate()
    },
    onUpdated () {
      console.log('sw正在更新');
    }
  });
  
  let fastClick = require('fastclick');
  fastClick.attach(document.body);
  // Vue.directive('highlight',function (el) {
  //
  //   let blocks = el.querySelectorAll('pre code');
  //   blocks.forEach((block)=>{
  //     hljs.highlightBlock(block)
  //   })
  // })
}
export function createApp() {
  const router = new createRouter();
  const store = new createStore();
  sync(store, router);
  const app = new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store,
    template: '<App/>',
    components: { App }
  });
  return { app, router, store }
}

