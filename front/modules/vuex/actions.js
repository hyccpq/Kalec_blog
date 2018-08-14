import * as types from './type'
import API from '../util/api'

export const setToken = ({commit},data) => {
  commit(types.SET_TOKEN, data);
};

export const logOut = ({commit}) => {
  commit(types.LOG_OUT);
  return new Promise(resolve => {
    resolve({commit});
  })
};
// 主页列表
export const getIndexList = ({commit},payload) => {
  return API.getIndexList(payload).then((res) => {
    if(res.data.status === 1){
      commit(types.GET_LIST,res.data.data);
      return new Promise((resolve,reject) => {
        resolve(res)
      })
    } else {
      console.log(res.data);
    }
  }).catch((e) => {
    console.error(e);
  })
};

// Tag页面数据
export const getTagList = ({commit}, payload) => {
  return API.getTagList(payload)
    .then(res => {
      commit(types.GET_LIST, res);
      return new Promise(resolve => resolve(res));
    })
};
// class页面数据
export const getClassicList = ({commit}, payload) => {
  API.getClassicList(payload)
    .then(res => {
      commit(types.GET_LIST, res);
      return new Promise(resolve => resolve(res))
    })
  
};
// 文章
export const getArticleList = ({commit}, payload) => {
  return API.getArticleList(payload).then(res => {
    if (res.data.status === 1) {
      let data = res.data.data;
      
      commit(types.GET_ARTICLE_INFO, data);
      return new Promise((resolve, reject) => {
        resolve(res);
      })
    } else {
      console.log(res.data)
    }
  }).catch((err) => {
    console.error(err)
  });
};
// TAG标签列表
export const getAllTagClassic = ({commit}) => {
  API.getAllTag().then(res => {
  	console.log(res);
    commit(types.GET_ALL_TAG_CLASSIC, res)
  })
};
