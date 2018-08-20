import {controller, get, put, del, post, required, auth, admin, fileUpload} from '../lib/decorator'

import { checkPassword, commitArticle, editArticle, deleteArticle, editShow, getAdArticleList, getOneAdArticle } from '../service/getAdminInfo'
import { resData } from '../lib/util'
import { getToken } from "../service/auth";
import fs from 'fs'
import { resolve } from 'path'

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
					user: matchData.userInfo.user
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
	
	@post("/addArticle")
	@auth
	@admin('admin')
	async addArticle (ctx, next) {
	    try {
		    const addInfo = ctx.request.body
		    let data = await commitArticle(addInfo)
		    ctx.body = resData(1, '查询成功', data)
	    } catch (e) {
		    ctx.body = resData(0, '出现错误', e.toString())
	    }
	}
	
	@put("/editArticle")
	@auth
	@admin('admin')
	async editArticle (ctx, next) {
	    try {
			const editInfo = ctx.request.body
		    let data = await editArticle(editInfo.id, editInfo)
		    ctx.body = resData(1, '查询成功', data)
	    } catch (e) {
		    ctx.body = resData(0, '出现错误', e.toString())
	    }
	}
	
	@get("/searchAll")
	@auth
	async searchAll (ctx, next) {
	    try {
	        const params = ctx.request.query
		    let data = await getAdArticleList(params.page, params.count, params)
	        ctx.body = resData(1, '查询成功', data)
	    } catch(e) {
	        ctx.body = resData(0, '出现错误', e.toString())
	    }
	}
	
	@get("/searchAdArticle")
	@auth
	@admin('admin')
	async searchAdArticle (ctx, next) {
	    try {
	        const { id } = ctx.request.query
		    let data = await getOneAdArticle(id)
	        ctx.body = resData(1, '查询成功', data)
	    } catch(e) {
	        ctx.body = resData(0, '出现错误', e.toString())
	    }
	}
	
	@put("/editShow")
	@auth
	@admin('admin')
	async editArticleShow (ctx, next) {
	    try {
	        const { id, show } = ctx.request.body
		    let data = await editShow(id, show)
	        ctx.body = resData(1, '查询成功', data)
	    } catch(e) {
	        ctx.body = resData(0, '出现错误', e.toString())
	    }
	}
	
	@del("/deleteArticle")
	@auth
	@admin('admin')
	async deleteMyArticle (ctx, next) {
	    try {
	        const { id } = ctx.request.body
		    
		    let data = deleteArticle(id)
	        ctx.body = resData(1, '查询成功', data)
	    } catch(e) {
	        ctx.body = resData(0, '出现错误', e.toString())
	    }
	}
	
	@post("/upload")
	@admin('admin')
	@fileUpload('articleImage')
	async upload (ctx, next) {
	    try {
	        let fileName = ctx.req.file.filename
		    
	        ctx.body = resData(1, '上传成功', { fileName, filePath: `uploads/${fileName}` })
	    } catch(e) {
	    	console.log(e);
	        ctx.body = resData(0, '出现错误', e.toString())
	    }
	}
	
}