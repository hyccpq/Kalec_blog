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
  getAllGallery,
  getOneGalleryImages
} from '../service/getAdminGallery.js'

@controller('/api/public/gallery')
export default class PublicGalleryApi {
  @get('/photo_albums')
  async getGallery(ctx, next) {
    let { pageNum, pageSize } = ctx.request.query
    try {
      let data = await getAllGallery(false, { pageNum, pageSize })
      ctx.body = resData(1, '查询成功', data)
    } catch (e) {
      ctx.body = resData(0, '查询出错', e.toString())
      throw e
    }
  }

  @get('/photo_albums/content')
  async getOneAlbumContent(ctx, next) {
    let { id } = ctx.request.query
    try {
      if (id) {
        let data = await getOneGalleryImages(id)
        ctx.body = resData(1, '查询成功', data)
      } else {
        throw new Error('未知错误')
      }
    } catch (e) {
      ctx.body = resData(0, '查询出错', e.toString())
      throw e
    }
  }
}
