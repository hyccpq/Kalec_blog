import mongoose from 'mongoose'
import svgCaptch from 'svg-captcha'
import { formatDate } from '../lib/util'

const articleDatabase = mongoose.model('articleModel')
const tagAndClassicDatabase = mongoose.model('classicTagModel')

const CAPTCHA_CONFIG = {
	size: 4,
	ignoreChars: '0o1i',
	noise: 5,
	
}

export const getArticle = async (limit = 10, skip = 0, params = {}) => {
	let query = {
		show: 1
	}
	if(params.classic) query.classic = params.classic;
	else if(params.tag) query.tag = params.tag;
	try {
		const articleNum = await articleDatabase.find(query).count()
		const articleListAllInfo = await articleDatabase
			.find(query, "id markNum imgUrl time title abstract")
			.limit(limit)
			.skip(skip)
			.sort({
				time : -1
			})
		let articleList = articleListAllInfo.map(item => {
			return {
				id: item._id,
				markNum: item.markNum,
				imgSrc: item.imgUrl,
				time: formatDate(item.time),
				title: item.title,
				intr: item.abstract
			}
		})
		return {
			allArticleList: articleNum,
			articleList,
			currentPage: skip
		}
	} catch (e) {
		throw e
	}
}

export const searchOneArticle = async (id) => {
	try {
		let oneArticleInfo = await articleDatabase.findById(id, "-markList.userEmail -markList.replyList.replyEmail")
		if(oneArticleInfo.show === 0) {
			throw '无法找到文章'
		}
		return oneArticleInfo
		
		// let resData = getReturnArticle(allArticleInfo, false)
	} catch (e) {
		throw e
	}
}

export const getAllTagsAndClassic = async () => {
	try {
		return await tagAndClassicDatabase.find()
	} catch (e) {
		throw e
	}
}

export const saveMark = async (id, user, email, content, captchaStr) => {
	try {
		let articleInfo = await articleDatabase.findById(id)
		articleInfo.markNum += 1;
		articleInfo.markList.push({
			userName: user,
			userEmail: email,
			markContent: content,
			isManage: false
		})
		let addData = new articleDatabase(articleInfo)
	    await addData.save()
		
	} catch (e) {
		throw e
	}
}

export const saveReply = async (id, markId, user, replyUser, email, content) => {
	try {
		let articleInfo = await articleDatabase.findById(id).select('markList');
		articleInfo.markList.id(markId).replyList.push({
			replyName: user,
			replyEmail: email,
			replyContent: content,
			replyedUser: replyUser,
			isManage: false
		});
		articleInfo.markNum += 1;
		
		let addData = new articleDatabase(articleInfo)
	    await addData.save()
		
	} catch (e) {
		throw e
	}
}

export const createCaptchas = async () => {
	try {
		return await svgCaptch.createMathExpr(CAPTCHA_CONFIG)
	} catch (e) {
		throw e
	}
}