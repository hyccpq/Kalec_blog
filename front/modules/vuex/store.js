import Vuex from 'vuex'
import Vue from 'vue'

import * as actions from './actions'
import mutations from './mutations'
import 'babel-polyfill'

Vue.use(Vuex);
export function createStore() {
  return new Vuex.Store({
    state:{
      token: null,
      indexPageList: {},
      articleInfo: {
        markList:[]
      },
      toggle:{},
      onLoading:false,
      tagAndClassicList:{}
    },
    actions,
    mutations,
  });
}


// export default store;
