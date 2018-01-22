import axios from 'axios'
import myApp from '../../pages/index'
import Vue from 'vue'
import store from '../vuex/store'

import iView from 'iview'
Vue.use(iView)

import * as types from '../vuex/type.js'

const http = axios.create({
  baseURL:`http://${location.hostname}:${location.port}/api`,
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
          iView.Notice.warning({
            title:'登陆超时'
          });
          store.commit(types.LOG_OUT);
          myApp.$router.replace('/');
      }
    }
    return Promise.reject(error);
  }
);

export default http;
