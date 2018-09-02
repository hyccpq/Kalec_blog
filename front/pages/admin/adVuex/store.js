import Vuex from 'vuex'
import Vue from 'vue'

import * as actions from './actions'
import mutations from './mutations'
import 'babel-polyfill'

Vue.use(Vuex);
const store = new Vuex.Store({
	state:{
		token: '',
		qiniuToken: '',
		galleryAll: [],
		imagesListInfo: {
			images: []
		}
	},
	actions,
	mutations,
	
})


export default store;