import _defineProperty from "@babel/runtime/helpers/defineProperty";

var _dec, _class, _class2, _temp;

import { controller, get, put, del, post, required, auth, admin, fileUpload } from '../lib/decorator.js';
import { resData } from '../lib/util.js';
import { saveNewGallery, savedGallery, deleteOneGallery, getAllGallery, updateImages, updateShowGallery, getQiniuToken, getOneGalleryImages } from '../service/getAdminGallery.js';
let AdminFileApi = (_dec = controller('/api/file/v0'), _dec(_class = (_temp = _class2 = class AdminFileApi {}, _defineProperty(_class2, "isManage", true), _temp)) || _class);
export { AdminFileApi as default };
//# sourceMappingURL=adminFileApi.js.map