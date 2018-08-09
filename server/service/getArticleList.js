import mongoose from 'mongoose'
import { formatDate } from '../lib/util'

const articleDatabase = mongoose.model('articleModel')


export const getArticle = async (limit = 10, skip = 0, params = {}) => {
	
	let query = {
		show: 1
	}
	
	if(params.classic) query.classic = params.classic;
	else if(params.tag) query.tag = params.tag;
	
	try {
		const articleNum = await articleDatabase.find(query).count()
		const articleListAllInfo = await articleDatabase.find(query).limit(limit).skip(skip).sort({
			time : -1
		})
		
		let articleList = articleListAllInfo.map(item => {
			let obj = {}
			obj.id = item._id
			obj.markNum = item.markNum
			obj.imgSrc = item.imgUrl
			obj.time = formatDate(item.time)
			obj.title = item.title
			obj.intr = item.abstract
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