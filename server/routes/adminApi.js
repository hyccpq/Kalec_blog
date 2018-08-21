import {controller, get, put, del, post, required, auth, admin, fileUpload} from '../lib/decorator'

import {
	checkPassword,
	commitArticle,
	editArticle,
	deleteArticle,
	editShow,
	getAdArticleList,
	getOneAdArticle,
	delMark,
	delReply,
	searchOneArticleComment
} from '../service/getAdminInfo'
import {saveReply, saveMark, searchOneArticle} from '../service/getArticleInfo'
import { resData } from '../lib/util'
import { getToken } from "../service/auth";

@controller('/api/admin/v0')
export class AdminApiControllers {
	static isManage = true

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
		    let data = await getAdArticleList(parseInt(params.page), parseInt(params.count), params)
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
	        const { id } = ctx.request.query
		    
		    let data = await deleteArticle(id)
	        ctx.body = resData(1, '查询成功', {data})
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
	
	@get("/searchOneComment")
	async searchOne (ctx, next) {
		let { id } = ctx.request.query;
		try {
			let result = await searchOneArticleComment(id)
			ctx.body = resData(1, '查询成功', result)
		} catch (e) {
			ctx.body = resData(0,'查询出错')
			throw e
		}
	}
	
	@post("/addAdMark")
	@auth
	@admin('admin')
	async addMark (ctx, next) {
		let { _id, user, email, content } = ctx.request.body
			console.log(ctx.request.body);
		try {
			if(_id && user && email && content) {
				
				let markData = await saveMark(_id, user, email, content, AdminApiControllers.isManage)
				
				ctx.body = resData(1, '查询成功', markData)
			} else {
				throw '信息不全'
			}
		} catch (e) {
			ctx.body = resData(0,'查询出错', e.toString())
			throw e
		}
		
	}
	
	@post("/addAdReply")
	@auth
	@admin('admin')
	async addReply (ctx, next) {
		let { _id, markId, user, replyUser, email, content } = ctx.request.body
		try {
			if(_id && markId && user && email && content) {
				
				let replyData = await saveReply(_id, markId, user, replyUser, email, content, AdminApiControllers.isManage)
				ctx.body = resData(1, '查询成功', replyData)
			} else {
				throw '信息不全'
			}
			
		} catch (e) {
			ctx.body = resData(0,'查询出错', e.toString())
			throw e
		}
	}
	
	@del("/deleteReply")
	@auth
	@admin('admin')
	async deleteReply (ctx, next) {
		let { id, markId, replyId } = ctx.request.query
	    try {
	        await delReply(id, markId, replyId)
	        ctx.body = resData(1, '删除成功', {})
	    } catch(e) {
	        ctx.body = resData(0, '出现错误', e.toString())
	    }
	}
	
	@del("/deleteMark")
	@auth
	@admin('admin')
	async deleteMark (ctx, next) {
		let { id, markId } = ctx.request.query
	    try {
	        await delMark(id, markId)
	        ctx.body = resData(1, '删除成功', {})
	    } catch(e) {
	        ctx.body = resData(0, '出现错误', e.toString())
	    }
	}
	
}