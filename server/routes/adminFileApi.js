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
  getOneGalleryImages
} from '../service/getAdminGallery.js'

@controller('/api/file/v0')
export default class AdminFileApi {
  static isManage = true
  /**
   * 相册相关
   */
}
