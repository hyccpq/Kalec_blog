import mongoose from 'mongoose'
import { formatDate } from '../lib/util'

const User = mongoose.model('adminUserModel')
const ArticleDatabase = mongoose.model('articleModel')
const LoginLogs = mongoose.model('siteReadingModel')

export const checkPassword = async (user, password, ip) => {
	let match = false
	
	try {
		const userInfo = await User.findOne({ user })
		
		if(userInfo) {
			match = await userInfo.comparePassword(password, userInfo.password)
			console.log('密码比对：', match)
			
			let loginLogs = new LoginLogs({
				user,
				ip,
				data: '登录系统'
			})
			await loginLogs.save()
		}
		return {
			match,
			userInfo
		}
	} catch (e) {
		throw e
	}
}

export const commitArticle = async ({time, title, author, classic, tag, imgUrl, content, markdown, abstract}) => {
	let addNewInfo = {
		time, title, author, classic, tag, imgUrl, content, markdown, abstract
	}
	try {
		let addData = new ArticleDatabase(addNewInfo)
		
		return await addData.save()
	} catch (e) {
		throw e
	}
}

export const editArticle = async (id, {time, title, author, classic, tag, imgUrl, content, markdown, abstract}) => {
	let editNewInfo = {
		time, title, author, classic, tag, imgUrl, content, markdown, abstract
	}
	try {
		let data = await ArticleDatabase.findByIdAndUpdate(id, editNewInfo)
		if(data){
			return data
		} else {
			throw '文章不存在'
		}
	} catch (e) {
		throw e
	}
}

export const deleteArticle = async (id) => {
	try {
		let data = await ArticleDatabase.findByIdAndRemove(id)
		if(data) {
			return '删除成功'
		} else {
			throw '文章不存在'
		}
	} catch (e) {
		throw e
	}
}

export const getAdArticleList = async (skip = 0, num = 10, params = {}) => {
	let query = {}
	if(params.title) query.title = params.title;
	try {
		const articleNum = await ArticleDatabase.find(query).count()
		
		let limit = (skip + 1) * num <= articleNum ? num : articleNum % num
		const articleListAllInfo = await ArticleDatabase
			.find(query, "id markNum time author title show pv")
			.skip(skip)
			.limit(limit)
			.sort({
				time : -1
			})
		
		return {
			allArticleList: articleNum,
			articleListAllInfo,
			currentPage: skip
		}
	} catch (e) {
		throw e
	}
}

export const getOneAdArticle = async (id) => {
	try {
		let adArticleInfo = await ArticleDatabase.findById(id, '-content -markList')
		if(adArticleInfo) {
			return adArticleInfo
		} else {
			throw '文章不存在'
		}
	} catch (e) {
		throw e
	}
}

export const editShow = async (id, show) => {
	try {
		let data = await ArticleDatabase.findByIdAndUpdate(id, { show })
		if(data) {
			return data.show
		} else {
			throw '文章不存在'
		}
	} catch (e) {
		throw e
	}
}

