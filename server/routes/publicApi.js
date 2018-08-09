import { controller, get, post, auth, required } from '../lib/decorator'
import { getArticle } from '../service/getArticleList'
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
			console.log(e)
			throw e
		}
	}
	
	@get("/searchOne")
	async searchOne (ctx, next) {
	
	}
	
	@get("/searchAllTags")
	async searchAllTags (ctx, next) {
	
	}
	
	@get("/searchClassic")
	async searchClassic (ctx, next) {
	
	}
	
	@get("/searchTag")
	async searchTag (ctx, next) {
	
	}
	
	@post("/addMark")
	async addMark (ctx, next) {
	
	}
	
	@post("/addReply")
	async addReply (ctx, next) {
	
	}
	
	@get("/addLike")
	async addLike (ctx, next) {
	
	}
	
	@get("/getCaptcha")
	async getCaptcha (ctx, next) {
	
	}
}