import http from './axios'

// index页的数据获取
const GET_INDEXPAGE_MESSAGE_API = 'indexPage';
// tag页的数据获取
const GET_TAGPAGE_MESSAGE_API = 'searchTag?tag=';
// 分类页数据获取
const GET_CLASSIC_MESSAGE_API = 'searchClassic?classic=';
// 文章
const GET_ARTICLEINFO_MESSAGE_API = 'searchOne?&id=';
// 全部tag获取
const GET_ALLTAG_API = 'searchAllTags';


export default {
  getIndexList({page}){
    return http(GET_INDEXPAGE_MESSAGE_API+`?page=${page}`)
  },
  getTagList (payload) {
    return http(GET_TAGPAGE_MESSAGE_API + `${payload.params}&page=${payload.page}`)
    .then((res) => {
      if (res.data.status === 1) {
        let data = res.data.data
        return new Promise((resolve, reject) => {
          resolve(data)
        })
      } else {
        console.log(res.data)
      }
    }).catch((e) => {
      console.log('error')
    })
  },
  getClassicList (payload, callback) {
    return http(GET_CLASSIC_MESSAGE_API + `${payload.params}&page=${payload.page}`)
    .then((res) => {
      if (res.data.status === 1) {
        let data = res.data.data;
        return new Promise((resolve, reject) => {
          resolve(data)
        })
      } else {
        console.log(res.data)
      }
    }).catch((e) => {
      console.log('error')
    })
  },
  getArticleList (params) {
    return http(GET_ARTICLEINFO_MESSAGE_API + params)
  },
  getAllTag(){
    return http(GET_ALLTAG_API)
      .then((res)=>{
        if(res.data.status === 1){
          return new Promise((resolve, reject) => {
            resolve(res.data.data);
          })
        } else {
          console.log(res.data);
        }
      }).catch(e=>{
        console.log('error!!');
    })
  }
}
