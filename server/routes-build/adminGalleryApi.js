import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _class, _class2, _class3, _temp;

import { controller, get, put, del, post, required, auth, admin, fileUpload } from '../lib/decorator.js';
import { resData } from '../lib/util.js';
import { saveNewGallery, savedGallery, deleteOneGallery, getAllGallery, updateImages, updateShowGallery, getQiniuToken, getOneGalleryImages, delSelectImage, editSelectImage, setCoverImage } from '../service/getAdminGallery.js';
let AdminGalleryApi = (_dec = controller('/api/gallery/v0'), _dec2 = post('/addGallery'), _dec3 = admin('admin'), _dec4 = required({
  body: ['title', 'author', 'description', 'isPwd']
}), _dec5 = put('/editGallery'), _dec6 = admin('admin'), _dec7 = required({
  body: ['id', 'title', 'author', 'description', 'isPwd']
}), _dec8 = get('/adSearchAllGallery'), _dec9 = del('/deleteGallery'), _dec10 = admin('admin'), _dec11 = required({
  query: ['id']
}), _dec12 = put('/showGallery'), _dec13 = admin('admin'), _dec14 = required({
  body: ['id', 'show']
}), _dec15 = post('/updatedImages'), _dec16 = admin('admin'), _dec17 = required({
  body: ['id', 'imageListInf']
}), _dec18 = get('/getGalleryImages'), _dec19 = required({
  query: ['id']
}), _dec20 = get('/getUpdateToken'), _dec21 = admin('admin'), _dec22 = del('/images'), _dec23 = admin('admin'), _dec24 = required({
  query: ['id', 'imageIds']
}), _dec25 = put('/images'), _dec26 = admin('admin'), _dec27 = required({
  body: ['id', 'imageId']
}), _dec28 = post('/cover'), _dec29 = required({
  body: ['id', 'imagePath']
}), _dec(_class = (_class2 = (_temp = _class3 = class AdminGalleryApi {
  /**
   * 相册相关
   */
  async createGallery(ctx, next) {
    try {
      const {
        title,
        author,
        description,
        password,
        isPwd
      } = ctx.request.body;
      await saveNewGallery(title, author, description, password, isPwd);
      ctx.body = resData(1, '查询成功', {});
    } catch (e) {
      ctx.body = resData(0, '出现错误', e.toString());
    }
  }

  async changeGallery(ctx, next) {
    try {
      const {
        id,
        title,
        author,
        description,
        password,
        isPwd
      } = ctx.request.body;
      await savedGallery(id, title, author, description, password, isPwd);
      ctx.body = resData(1, '修改成功', {});
    } catch (e) {
      ctx.body = resData(0, '出现错误', e.toString());
    }
  }

  async adSearchAllGallery(ctx, next) {
    try {
      const {
        pageNum,
        pageSize
      } = ctx.request.query;
      let data = await getAllGallery(AdminGalleryApi.isManage, {
        pageNum,
        pageSize
      });
      ctx.body = resData(1, '查询成功', data);
    } catch (e) {
      ctx.body = resData(0, '出现错误', e.toString());
    }
  }

  async deleteGallery(ctx, next) {
    try {
      const {
        id
      } = ctx.request.query;
      let data = await deleteOneGallery(id);
      ctx.body = resData(1, '查询成功', data);
    } catch (e) {
      ctx.body = resData(0, '出现错误', e.toString());
    }
  }

  async showGallery(ctx, next) {
    try {
      const {
        id,
        show
      } = ctx.request.body;
      console.log(id, show);
      let data = await updateShowGallery(id, show);
      ctx.body = resData(1, '查询成功', data);
    } catch (e) {
      ctx.body = resData(0, '出现错误', e.toString());
    }
  }

  async updateImages(ctx, next) {
    try {
      const {
        id,
        imageListInf
      } = ctx.request.body;
      let data = await updateImages(id, imageListInf);
      ctx.body = resData(1, '查询成功', data);
    } catch (e) {
      ctx.body = resData(0, '出现错误', e.toString());
    }
  }

  async getGalleryImages(ctx, next) {
    try {
      const {
        id
      } = ctx.request.query;
      let data = await getOneGalleryImages(id);
      ctx.body = resData(1, '查询成功', data);
    } catch (e) {
      ctx.body = resData(0, '出现错误', e.toString());
    }
  }

  async getUpdateToken(ctx, next) {
    try {
      let data = getQiniuToken();
      ctx.body = resData(1, '查询成功', data);
    } catch (e) {
      ctx.body = resData(0, '出现错误', e.toString());
    }
  }

  async delImages(ctx, next) {
    try {
      const {
        id,
        imageIds
      } = ctx.request.query;
      let data = await delSelectImage(id, imageIds);
      ctx.body = resData(1, '查询成功', data);
    } catch (e) {
      ctx.body = resData(0, '出现错误', e.toString());
    }
  }

  async editImages(ctx, next) {
    try {
      const {
        id,
        imageId,
        imageDesc,
        imageName,
        show
      } = ctx.request.body;
      let data = await editSelectImage(id, imageId, {
        imageDesc,
        imageName,
        show
      });
      ctx.body = resData(1, '查询成功', data);
    } catch (e) {
      ctx.body = resData(0, '出现错误', e.toString());
    }
  }

  async setGalleryCover(ctx, next) {
    try {
      const {
        id,
        imagePath
      } = ctx.request.body;
      let data = await setCoverImage(id, imagePath);
      ctx.body = resData(1, '查询成功', data);
    } catch (e) {
      ctx.body = resData(0, '出现错误', e.toString());
    }
  }

}, _defineProperty(_class3, "isManage", true), _temp), (_applyDecoratedDescriptor(_class2.prototype, "createGallery", [_dec2, auth, _dec3, _dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "createGallery"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "changeGallery", [_dec5, auth, _dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "changeGallery"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "adSearchAllGallery", [_dec8, auth], Object.getOwnPropertyDescriptor(_class2.prototype, "adSearchAllGallery"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "deleteGallery", [_dec9, auth, _dec10, _dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "deleteGallery"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "showGallery", [_dec12, auth, _dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "showGallery"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateImages", [_dec15, auth, _dec16, _dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "updateImages"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getGalleryImages", [_dec18, auth, _dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "getGalleryImages"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getUpdateToken", [_dec20, auth, _dec21], Object.getOwnPropertyDescriptor(_class2.prototype, "getUpdateToken"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "delImages", [_dec22, auth, _dec23, _dec24], Object.getOwnPropertyDescriptor(_class2.prototype, "delImages"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "editImages", [_dec25, auth, _dec26, _dec27], Object.getOwnPropertyDescriptor(_class2.prototype, "editImages"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setGalleryCover", [_dec28, auth, _dec29], Object.getOwnPropertyDescriptor(_class2.prototype, "setGalleryCover"), _class2.prototype)), _class2)) || _class);
export { AdminGalleryApi as default };
//# sourceMappingURL=adminGalleryApi.js.map