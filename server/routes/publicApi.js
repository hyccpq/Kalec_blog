import { controller, get, post, auth, required } from '../lib/decorator'

@controller('/api/public')
export class PublicApiControllers {
	@post('/login')
	async login (ctx, next) {
	
	}
	
	@get('indexPage')
	async indexPage(ctx, next) {
	
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