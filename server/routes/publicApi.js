import { controller, get, post, required, compresCaptcha } from '../lib/decorator'

import { getArticle, searchOneArticle, getAllTagsAndClassic, saveMark, saveReply, createCaptchas } from '../service/getArticleInfo'
import { resData } from '../lib/util'

@controller('/api/public')
export class PublicApiControllers {
	
	@get('/indexPage')
	async indexPage(ctx, next) {
		let query = ctx.request.query;
		try {
			let result = await getArticle(parseInt(query.page), query)
			ctx.body = resData(1, '查询成功', result)
		} catch (e) {
			ctx.body = resData(0,'查询出错', e.toString())
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
	@compresCaptcha
	async addMark (ctx, next) {
		let { _id, user, email, content } = ctx.request.body
			console.log(ctx.request.body);
		try {
			if(_id && user && email && content) {
				
				let markData = await saveMark(_id, user, email, content)
				
				ctx.body = resData(1, '查询成功', markData)
			} else {
				throw '信息不全'
			}
		} catch (e) {
			ctx.body = resData(0,'查询出错', e.toString())
			throw e
		}
		
	}
	
	@post("/addReply")
	@compresCaptcha
	async addReply (ctx, next) {
		let { _id, markId, user, replyUser, email, content } = ctx.request.body
		try {
			if(_id && markId && user && email && content) {
				
				let replyData = await saveReply(_id, markId, user, replyUser, email, content)
				ctx.body = resData(1, '查询成功', replyData)
			} else {
				throw '信息不全'
			}
			
		} catch (e) {
			ctx.body = resData(0,'查询出错', e.toString())
			throw e
		}
	}
	
	// @get("/addLike")
	// async addLike (ctx, next) {
	//
	// }
	
	@get("/getCaptcha")
	async getCaptcha (ctx, next) {
		try {
			let captcha = await createCaptchas();
			ctx.session.captcha = captcha.text
			ctx.body = resData(1, '查询成功', captcha.data)
		} catch (e) {
			ctx.body = resData(0, '查询出错', e.toString())
			throw e
		}
	}
	
	@post("/compressCaptcha")
	@compresCaptcha
	async compressCaptchaAll (ctx, next) {
		ctx.body = resData(1, '验证成功', true)
	}
}