import { controller, get, put, del, post, required, auth, admin, fileUpload } from '../lib/decorator'
import { resData } from '../lib/util'
import { saveNewGallery, savedGallery, deleteOneGallery, getAllGallery, updateImages, updateShowGallery, getQiniuToken ,getOneGalleryImages } from '../service/getAdminGallery'

@controller('/api/file/v0')
class AdminFileApi {
    static isManage = true
    /**
     * 相册相关
     */

}
