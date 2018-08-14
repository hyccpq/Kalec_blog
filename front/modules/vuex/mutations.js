import * as types from './type'

export default {
	[types.SET_TOKEN] (state, data) {
		sessionStorage.setItem('token', data.token);
		state.token = data;
	},
	[types.LOG_OUT] (state) {
		sessionStorage.removeItem('token');
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
	},
	[types.GET_ALL_TAG_CLASSIC](state,data){
		state.tagAndClassicList = data;
	},
	[types.UPDATE_SCROLL_TOP](state,data) {
		state.scrollTop = data
	}
}
