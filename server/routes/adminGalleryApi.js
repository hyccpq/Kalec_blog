import {
  controller,
  get,
  put,
  del,
  post,
  required,
  auth,
  admin,
  fileUpload
} from '../lib/decorator.js'
import { resData } from '../lib/util.js'
import {
  saveNewGallery,
  savedGallery,
  deleteOneGallery,
  getAllGallery,
  updateImages,
  updateShowGallery,
  getQiniuToken,
  getOneGalleryImages,
  delSelectImage,
  editSelectImage,
  setCoverImage
} from '../service/getAdminGallery.js'

@controller('/api/gallery/v0')
export default class AdminGalleryApi {
  static isManage = true

  /**
   * 相册相关
   */
  @post('/addGallery')
  @auth
  @admin('admin')
  @required({
    body: ['title', 'author', 'description', 'isPwd']
  })
  async createGallery(ctx, next) {
    try {
      const { title, author, description, password, isPwd } = ctx.request.body
      await saveNewGallery(title, author, description, password, isPwd)
      ctx.body = resData(1, '查询成功', {})
    } catch (e) {
      ctx.body = resData(0, '出现错误', e.toString())
    }
  }

  @put('/editGallery')
  @auth
  @admin('admin')
  @required({
    body: ['id', 'title', 'author', 'description', 'isPwd']
  })
  async changeGallery(ctx, next) {
    try {
      const {
        id,
        title,
        author,
        description,
        password,
        isPwd
      } = ctx.request.body
      await savedGallery(id, title, author, description, password, isPwd)
      ctx.body = resData(1, '修改成功', {})
    } catch (e) {
      ctx.body = resData(0, '出现错误', e.toString())
    }
  }

  @get('/adSearchAllGallery')
  @auth
  async adSearchAllGallery(ctx, next) {
    try {
      const { pageNum, pageSize } = ctx.request.query
      let data = await getAllGallery(AdminGalleryApi.isManage, {
        pageNum,
        pageSize
      })
      ctx.body = resData(1, '查询成功', data)
    } catch (e) {
      ctx.body = resData(0, '出现错误', e.toString())
    }
  }

  @del('/deleteGallery')
  @auth
  @admin('admin')
  @required({
    query: ['id']
  })
  async deleteGallery(ctx, next) {
    try {
      const { id } = ctx.request.query
      let data = await deleteOneGallery(id)
      ctx.body = resData(1, '查询成功', data)
    } catch (e) {
      ctx.body = resData(0, '出现错误', e.toString())
    }
  }

  @put('/showGallery')
  @auth
  @admin('admin')
  @required({
    body: ['id', 'show']
  })
  async showGallery(ctx, next) {
    try {
      const { id, show } = ctx.request.body
      console.log(id, show)
      let data = await updateShowGallery(id, show)
      ctx.body = resData(1, '查询成功', data)
    } catch (e) {
      ctx.body = resData(0, '出现错误', e.toString())
    }
  }

  @post('/updatedImages')
  @auth
  @admin('admin')
  @required({
    body: ['id', 'imageListInf']
  })
  async updateImages(ctx, next) {
    try {
      const { id, imageListInf } = ctx.request.body
      let data = await updateImages(id, imageListInf)
      ctx.body = resData(1, '查询成功', data)
    } catch (e) {
      ctx.body = resData(0, '出现错误', e.toString())
    }
  }

  @get('/getGalleryImages')
  @auth
  @required({
    query: ['id']
  })
  async getGalleryImages(ctx, next) {
    try {
      const { id } = ctx.request.query
      let data = await getOneGalleryImages(id)
      ctx.body = resData(1, '查询成功', data)
    } catch (e) {
      ctx.body = resData(0, '出现错误', e.toString())
    }
  }

  @get('/getUpdateToken')
  @auth
  @admin('admin')
  async getUpdateToken(ctx, next) {
    try {
      let data = getQiniuToken()
      ctx.body = resData(1, '查询成功', data)
    } catch (e) {
      ctx.body = resData(0, '出现错误', e.toString())
    }
  }

  @del('/images')
  @auth
  @admin('admin')
  @required({
    query: ['id', 'imageIds']
  })
  async delImages(ctx, next) {
    try {
      const { id, imageIds } = ctx.request.query
      let data = await delSelectImage(id, imageIds)
      ctx.body = resData(1, '查询成功', data)
    } catch (e) {
      ctx.body = resData(0, '出现错误', e.toString())
    }
  }

  @put('/images')
  @auth
  @admin('admin')
  @required({
    body: ['id', 'imageId']
  })
  async editImages(ctx, next) {
    try {
      const { id, imageId, imageDesc, imageName, show } = ctx.request.body
      let data = await editSelectImage(id, imageId, {
        imageDesc,
        imageName,
        show
      })
      ctx.body = resData(1, '查询成功', data)
    } catch (e) {
      ctx.body = resData(0, '出现错误', e.toString())
    }
  }

  @post('/cover')
  @auth
  @required({
    body: ['id', 'imagePath']
  })
  async setGalleryCover(ctx, next) {
    try {
      const { id, imagePath } = ctx.request.body
      let data = await setCoverImage(id, imagePath)
      ctx.body = resData(1, '查询成功', data)
    } catch (e) {
      ctx.body = resData(0, '出现错误', e.toString())
    }
  }
}
