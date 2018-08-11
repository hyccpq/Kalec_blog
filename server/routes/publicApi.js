import { controller, get, post, auth, required } from '../lib/decorator'
import { getArticle, searchOneArticle, getAllTagsAndClassic, saveMark } from '../service/getArticleInfo'
import { resData } from '../lib/util'

@controller('/api/public')
export class PublicApiControllers {
	@post('/login')
	async login (ctx, next) {
	
	}
	
	@get('/indexPage')
	async indexPage(ctx, next) {
		let query = ctx.request.query;
		try {
			let result = await getArticle(query.count, query.page, query)
			ctx.body = resData(1, '查询成功', result)
		} catch (e) {
			ctx.body = resData(0,'查询出错')
			throw e
		}
	}
	
	@get("/searchOne")
	async searchOne (ctx, next) {
		let { id } = ctx.request.query;
		try {
			let result = await searchOneArticle(id)
			ctx.body = resData(1, '查询成功', result)
		} catch (e) {
			ctx.body = resData(0,'查询出错')
			throw e
		}
	}
	
	@get("/searchAllTags")
	async searchAllTags (ctx, next) {
		try {
			let tagList =await getAllTagsAndClassic()
			ctx.body = resData(1,'查询成功',tagList)
		} catch (e){
			ctx.body = resData(0,'查询出错')
			throw e
		}
	}
	
	// @get("/searchClassic")
	// async searchClassic (ctx, next) {
	//
	// }
	//
	// @get("/searchTag")
	// async searchTag (ctx, next) {
	//
	// }
	
	@post("/addMark")
	async addMark (ctx, next) {
		let { id, user, email, content, captchaStr } = ctx.request.body
		try {
			if(id && user && email && content && captchaStr) {
				await saveMark(id, user, email, content, captchaStr)
			} else {
				throw '信息不全'
			}
			
			ctx.body = resData(1, '查询成功', {})
		} catch (e) {
			ctx.body = resData(0,'查询出错')
			throw e
		}
		
	}
	
	@post("/addReply")
	async addReply (ctx, next) {
		let { id, markId, user, replyUser, email, content, captchaStr } = ctx.request.body
		try {
			if(id && markId && user && replyUser && email && content && captchaStr) {
				await saveMark(id, user, replyUser, email, content, captchaStr)
			} else {
				throw '信息不全'
			}
			
			ctx.body = resData(1, '查询成功', {})
		} catch (e) {
			ctx.body = resData(0,'查询出错', e.toString())
			throw e
		}
	}
	
	@get("/addLike")
	async addLike (ctx, next) {
	
	}
	
	@get("/getCaptcha")
	async getCaptcha (ctx, next) {
	
	}
}