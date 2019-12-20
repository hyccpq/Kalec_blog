import _applyDecoratedDescriptor from '@babel/runtime/helpers/applyDecoratedDescriptor'

var _dec, _dec2, _dec3, _class, _class2

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
let PublicGalleryApi =
  ((_dec = controller('/api/public/gallery')),
  (_dec2 = get('/photo_albums')),
  (_dec3 = get('/photo_albums/content')),
  _dec(
    (_class =
      ((_class2 = class PublicGalleryApi {
        async getGallery(ctx, next) {
          let { pageNum, pageSize } = ctx.request.query

          try {
            let data = await getAllGallery(false, {
              pageNum,
              pageSize
            })
            ctx.body = resData(1, '查询成功', data)
          } catch (e) {
            ctx.body = resData(0, '查询出错', e.toString())
            throw e
          }
        }

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
      }),
      (_applyDecoratedDescriptor(
        _class2.prototype,
        'getGallery',
        [_dec2],
        Object.getOwnPropertyDescriptor(_class2.prototype, 'getGallery'),
        _class2.prototype
      ),
      _applyDecoratedDescriptor(
        _class2.prototype,
        'getOneAlbumContent',
        [_dec3],
        Object.getOwnPropertyDescriptor(
          _class2.prototype,
          'getOneAlbumContent'
        ),
        _class2.prototype
      )),
      _class2))
  ) || _class)
export { PublicGalleryApi as default }
//# sourceMappingURL=publicGalleryApi.js.map
