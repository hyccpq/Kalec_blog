import http from './adAxios'

const GET_ALL_GALLERY = '/gallery/v0/adSearchAllGallery'
const PUT_SHOW_GALLERY = '/gallery/v0/showGallery'

const _httpRequest = (param, fn) => {
	return http({
		...param
	})
		.then(res => {
			if (res.data.status === 1) {
				fn(false)
				return res.data.data
			} else {
				fn(false)
				throw res.data
			}
		}).catch(err=> {
			fn(false)
			console.log(err);
		})
}

export function request (param) {
	const type = typeof param
	if(type === 'function') {
		param(true);
		return obj => _httpRequest(obj, param);
	} else if(type === 'object' && param !== null) {
		return _httpRequest(param, () => {})
	}
}

export const getGalleryList = () => {
	return request({
		url: GET_ALL_GALLERY,
		method: 'GET'
	})
	
	
}

export const putGalleryShow = (data) => {
	return request({
		url: PUT_SHOW_GALLERY,
		method: 'PUT',
		data
	})
}