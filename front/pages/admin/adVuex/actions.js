import * as types from './type'
import * as API from '../util/adApi'

export const setToken = ({commit},data) => {
	commit(types.SET_TOKEN, data);
};

export const logOut = ({commit}) => {
	commit(types.LOG_OUT);
	return new Promise(resolve => {
		resolve({commit});
	})
};

export const getAllGallery = async ({commit}) => {
	try {
		let res = await API.getGalleryList()
		commit(types.GET_GALLERY, res)
	} catch (e) {
		console.log(e);
	}
}

export const putGalleryShow = async ({commit}, {id, show, index}) => {
	try {
		await API.putGalleryShow({id, show})
		commit(types.PUT_GALLERY_SHOW, {show, index})
	} catch (e) {
		console.log(e);
	}
}