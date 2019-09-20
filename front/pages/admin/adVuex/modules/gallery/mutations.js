import * as types from '../../type'

export default {
	[types.GET_GALLERY] (state, data) {
		state.galleryAll = data
	},
	[types.PUT_GALLERY_SHOW] (state, {show, index}) {
		state.galleryAll[index].show = show
	},
	[types.DELETE_ONE_GALLERY] (state, index) {
		state.galleryAll.splice(index, 1)
	},
	[types.GET_QINIU_UPDATE_TOKEN] (state, data) {
		state.qiniuToken = data
	},
	[types.GET_IMAGES_LIST_ALL] (state, data) {
		console.log(data);
		state.imagesListInfo = data
	},
	[types.POST_IMAGES_LIST] (state, imageList) {
		for(let item of imageList) {
			state.imagesListInfo.images.push(item)
		}

	}
}
