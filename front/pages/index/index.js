// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { createRouter } from './router/index'
import { createStore } from '../../modules/vuex/store'
import axios from '../../modules/util/axios'
import Meta from 'vue-meta'
import { Notice } from 'iview'
import { sync } from 'vuex-router-sync'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false;
Vue.prototype.axios = axios;
Vue.prototype.$Notice = Notice;
Vue.prototype.$formatTime = function (date){
	return new Date(date).Format('yyyy-MM-dd hh:mm:ss')
}

Date.prototype.Format = function(fmt) {
	var o = {
		"M+": this.getMonth() + 1,                 //月份
		"d+": this.getDate(),                    //日
		"h+": this.getHours(),                   //小时
		"m+": this.getMinutes(),                 //分
		"s+": this.getSeconds(),                 //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds()             //毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;

}

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

	Vue.use(VueLazyload, {
		preLoad: 1.3,
		error: require('./assets/svg/fail.svg'),
		loading: require('./assets/svg/loading.svg'),
		attempt: 1
	})

	let fastClick = require('fastclick');
	fastClick.attach(document.body);

	Vue.prototype.$getScrollTop = () => window.pageYOffset
		|| document.documentElement.scrollTop
		|| document.body.scrollTop
		|| 0;


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

	Vue.use(Meta)

	sync(store, router);

	const app = new Vue({
		el: '#root',
		render: h => h(App),
		router,
		store,
		template: '<App/>',
		components: { App }
	});
	return { app, router, store }
}

