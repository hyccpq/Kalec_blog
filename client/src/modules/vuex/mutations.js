import * as types from './type'

export default {
  [types.SET_TOKEN] (state, data) {
    localStorage.setItem('token', data.token);
    state.token = data;
  },
  [types.LOG_OUT] (state) {
    localStorage.removeItem('token');
    state.token = '';
  },
  [types.GET_LIST] (state, data) {
    state.indexPageList = data;
  },
  [types.GET_ARTICLE_INFO] (state, data) {
    state.articleInfo = data;
  },
  ['getToggle'] (state,data) {
    state.toggle = data;
  },
  ['showLoading'](state){
    state.onLoading = !state.onLoading;
  }
}
