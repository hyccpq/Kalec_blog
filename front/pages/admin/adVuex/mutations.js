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
	[types.GET_GALLERY] (state, data) {
		state.galleryAll = data
	},
	[types.PUT_GALLERY_SHOW] (state, {show, index}) {
		state.galleryAll[index].show = show
	},
	[types.DELETE_ONE_GALLERY] (state, index) {
		state.galleryAll.splice(index, 1)
	}
}