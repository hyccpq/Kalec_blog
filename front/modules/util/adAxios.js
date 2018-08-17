import axios from 'axios'
import app from '../../pages/admin/app'
import { createStore } from '../vuex/store'

const store = new createStore();
import * as types from '../vuex/type.js'

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
					app.$router.replace('/admin/');
			}
		}
		return Promise.reject(error);
	}
);

export default http;
