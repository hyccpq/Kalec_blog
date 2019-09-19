// export const margeBaseUrl =
import http from "./adAxios";

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
