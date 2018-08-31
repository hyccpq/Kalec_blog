import { controller, get, put, del, post, required, auth, admin, fileUpload } from '../lib/decorator'
import { resData } from '../lib/util'
import { saveNewGallery, deleteOneGallery, getAllGallery, updateImages, updateShowGallery } from '../service/getAdminGallery'

@controller('/api/gallery/v0')
class AdminGalleryApi {
	static isManage = true
	/**
	 * 相册相关
	 */
	@post("/editGallery")
	@auth
	@admin('admin')
	@required({
		body: ['title', 'author', 'description']
	})
	async createGallery (ctx, next) {
	    try {
	    	console.log('验证通过');
	        const {title, author, description} = ctx.request.body
		    await saveNewGallery(title, author, description)
	        ctx.body = resData(1, '查询成功', {})
	    } catch(e) {
	        ctx.body = resData(0, '出现错误', e.toString())
	    }
	}
	
	
	@get("/adSearchAllGallery")
	@auth
	async adSearchAllGallery (ctx, next) {
	    try {
	        let data = await getAllGallery(AdminGalleryApi.isManage)
	        ctx.body = resData(1, '查询成功', data)
	    } catch(e) {
	        ctx.body = resData(0, '出现错误', e.toString())
	    }
	}
	
	
	@del("/deleteGallery")
	@auth
	@admin('admin')
	@required({
		query: ['id']
	})
	async deleteGallery (ctx, next) {
	    try {
	        const { id } = ctx.request.query
		    let data = await deleteOneGallery(id)
	        ctx.body = resData(1, '查询成功', data)
	    } catch(e) {
	        ctx.body = resData(0, '出现错误', e.toString())
	    }
	}
	
	@put("/showGallery")
	@auth
	@admin('admin')
	@required({
		body: ['id', 'show']
	})
	async showGallery (ctx, next) {
	    try {
	        const { id, show } = ctx.request.body
		        console.log(id, show);
		    let data = await updateShowGallery(id, show)
	        ctx.body = resData(1, '查询成功', data)
	    } catch(e) {
	        ctx.body = resData(0, '出现错误', e.toString())
	    }
	}
	
	@post("/updatedImages")
	@auth
	@admin('admin')
	@required({
		body: ['id', 'imageName', 'imageDesc', 'imagePath']
	})
	async updateImages (ctx, next) {
	    try {
	        const { id, imageName, imageDesc, imagePath } = ctx.request.body
		    let data = await updateImages(id, imageName, imageDesc, imagePath)
	        ctx.body = resData(1, '查询成功', data)
	    } catch(e) {
	        ctx.body = resData(0, '出现错误', e.toString())
	    }
	}
	
}