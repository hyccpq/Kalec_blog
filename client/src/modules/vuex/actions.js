import * as types from './type'
import API from '../util/api'

export const setToken = ({commit},data) => {
  commit(types.SET_TOKEN, data);
};

export const logOut = ({commit}) => {
  commit(types.LOG_OUT);
};
// 主页列表
export const getIndexList = ({commit},payload=0) => {
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
  API.getTagList(payload, message => {
    commit(types.GET_LIST, { message })
  })
};
// class页面数据
export const getClassicList = ({commit}, payload) => {
   API.getClassicList(payload, message => {
    commit(types.GET_LIST, { message })
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
    console.log('error')
  });
};
