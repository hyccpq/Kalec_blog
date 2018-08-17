import { controller, get, post, required, auth, admin } from '../lib/decorator'

import { checkPassword } from '../service/getAdminInfo'
import { resData } from '../lib/util'
import { getToken } from "../service/auth";

@controller('/api/admin/v0')
export class AdminApiControllers {

	@post('/login')
	@required({
		body: ['user', 'password']
	})
	async login (ctx, next) {
		const { user, password } = ctx.request.body
		let ip = ctx.request.ip
		try {
			const matchData = await checkPassword(user, password, ip)
		
			if(matchData.match) {
				ctx.session.views = {
					_id: matchData.userInfo._id,
					email: matchData.userInfo.email,
					role: matchData.userInfo.role,
					username: matchData.userInfo.username
				}
				
				let token = getToken(user)
				
				ctx.body = resData(1, '登录成功', token)
			} else {
				ctx.body = resData(2, '用户名或密码错误')
			}
		} catch (e) {
			ctx.body = resData(0, '出现错误', e.toString())
		}
		
	}
	
	@get("/getAdTagAndClassic")
	async getAdTagAndClassic (ctx, next) {
	
	}
}