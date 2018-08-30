// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './app'
import router from './router/index'
import { createStore } from '../../modules/vuex/store'
import axios from '../../modules/util/adAxios'
import { Notice, Button, LoadingBar } from 'iview'

if(typeof window !== 'undefined'){
	LoadingBar.config({
		color: '#68f34f',
	    failedColor: '#ff600c',
	    height: 3
	})
	
	router.beforeEach((to,from,next)=>{
		LoadingBar.start()
		let token = localStorage.getItem('token');
		console.log(to.matched.some(({meta}) => meta.auth));
		if(to.matched.some(({meta}) => meta.auth)){
			if(!token){
				LoadingBar.error()
				next('/admin/login');
			} else {
				LoadingBar.finish()
				next();
			}
		} else {
			LoadingBar.finish()
			next();
		}
	});
}

Vue.component('Button',Button);

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
