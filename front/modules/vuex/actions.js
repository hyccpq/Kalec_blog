import * as types from './type'
import API from '../util/api'

// export const setToken = ({commit},data) => {
// 	commit(types.SET_TOKEN, data);
// };

// export const logOut = ({commit}) => {
// 	commit(types.LOG_OUT);
// 	return new Promise(resolve => {
// 		resolve({commit});
// 	})
// };
// 主页列表
export const getIndexList = ({commit}, payload) => {
	return API.getIndexList(payload, commit).then((res) => {
		commit(types.GET_LIST, res);
		return res
	}).catch((e) => {
		console.error(e);
	})
};

// Tag页面数据
export const getTagList = ({commit}, payload) => {
	return API.getTagList(payload, commit)
		.then(res => {
			commit(types.GET_LIST, res);
			return res;
		})
};
// class页面数据
export const getClassicList = ({commit}, payload) => {
	API.getClassicList(payload)
		.then(res => {
			commit(types.GET_LIST, res);
			return res
		})
	
};
// 文章
export const getArticleList = ({commit}, payload) => {
	return API.getArticleList(payload, commit).then(res => {
		
		commit(types.GET_ARTICLE_INFO, res);
		return res
	}).catch((err) => {
		console.log(err)
		throw err
	});
};
// TAG标签列表
export const getAllTagClassic = ({commit}) => {
	return API.getAllTag(commit).then(res => {
		console.log(res);
		commit(types.GET_ALL_TAG_CLASSIC, res)
		return res
	})
};
