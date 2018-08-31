import axios from 'axios'

import store from '../adVuex/store'
import * as types from '../../../modules/vuex/type.js'

const http = axios.create({
	baseURL:`${location.protocol}//${location.hostname}:${location.port}/api`,
	timeout:5000,
	data:{},
});


http.interceptors.request.use(
	config => {
		let token = localStorage.getItem('token');
		if(token){
			config.headers.Authorization = token;
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

http.interceptors.response.use(
	response => {
		return response
	},
	error => {
		if(error.response){
			switch (error.response.status){
				case 401:
					alert('登陆超时');
					store.commit(types.LOG_OUT);
					window.location.href = '/admin/login'
					break
					
				case 500:
					alert('服务内部出错，请尝试重新登录');
					store.commit(types.LOG_OUT);
					window.location.href = '/admin/login'
					break
			}
		}
		return Promise.reject(error);
	}
);

export default http;
