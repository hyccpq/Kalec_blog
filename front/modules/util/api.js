import http from './axios'
import * as type from '../vuex/type'

// index页的数据获取
const GET_INDEXPAGE_MESSAGE_API = 'public/indexPage';
// tag页的数据获取
const GET_TAGPAGE_MESSAGE_API = 'public/searchTag?tag=';
// 分类页数据获取
const GET_CLASSIC_MESSAGE_API = 'public/searchClassic?classic=';
// 文章
const GET_ARTICLEINFO_MESSAGE_API = 'public/searchOne?&id=';
// 全部tag获取
const GET_ALLTAG_API = 'public/searchAllTags';

const GET_CAPTCHA = 'public/getCaptcha';

const POST_COMMENT = 'public/addMark';
const POST_REPLY = 'public/addReply';

const POST_COMPRESS_CAPTCHA = 'public/compressCaptcha';

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
			throw err
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

export default {
	getIndexList({page}, commit){
		return request(
			currentState => commit(type.SHOW_LOADING, currentState)
		)({
			url: GET_INDEXPAGE_MESSAGE_API+`?page=${page}`,
			method: 'GET'
		})
	},
	getTagList (payload, commit) {
		return request(
			currentState => commit(type.SHOW_LOADING, currentState)
		)({
			url: GET_TAGPAGE_MESSAGE_API + `${payload.params}&page=${payload.page}`,
			method: 'GET'
		})
	},
	getClassicList (payload, commit) {
		return request(
			currentState => commit(type.SHOW_LOADING, currentState)
		)({
			url: GET_CLASSIC_MESSAGE_API + `${payload.params}&page=${payload.page}`,
			method: 'GET'
		})
	},
	getArticleList (params, commit) {
		return request(
			currentState => commit(type.SHOW_LOADING, currentState)
		)({
			url: GET_ARTICLEINFO_MESSAGE_API + params,
			method: 'GET'
		})
	},
	getAllTag(commit){
		return request(
			currentState => commit(type.SHOW_LOADING, currentState)
		)({
			url: GET_ALLTAG_API,
			method: 'GET'
		})
	},
	
	getCaptcha(commit){
		return request(
			currentState => commit(type.SHOW_LOADING, currentState)
		)({
			url: GET_CAPTCHA,
			method: 'GET'
		})
	},
	
	commitComment(payload, commit) {
		return request(
			currentState => commit(type.SHOW_LOADING, currentState)
		)({
			url: POST_COMMENT,
			method: 'POST',
			data: payload
		})
	},
	
	commitReply(payload, commit) {
		return request(
			currentState => commit(type.SHOW_LOADING, currentState)
		)({
			url: POST_REPLY,
			method: 'POST',
			data: payload
		})
	},
	
	compressCaptcha(payload) {
		return request({
			url: POST_COMPRESS_CAPTCHA,
			method: "POST",
			data: payload
		})
	}
}
