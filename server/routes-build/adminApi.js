import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _class, _class2, _class3;

import { controller, get, put, del, post, required, auth, admin, fileUpload } from '../lib/decorator.js';
import { checkPassword, commitArticle, editArticle, deleteArticle, editShow, getAdArticleList, getOneAdArticle, delMark, delReply, searchOneArticleComment, addTagOrClassicInfo } from '../service/getAdminInfo.js';
import { saveReply, saveMark, searchOneArticle } from '../service/getArticleInfo.js';
import { resData } from '../lib/util.js';
import { getToken } from '../service/auth.js';
let AdminApiControllers = (_dec = controller('/api/admin/v0'), _dec2 = post('/login'), _dec3 = required({
  body: ['user', 'password']
}), _dec4 = post('/addArticle'), _dec5 = admin('admin'), _dec6 = put('/editArticle'), _dec7 = admin('admin'), _dec8 = get('/searchAll'), _dec9 = get('/searchAdArticle'), _dec10 = admin('admin'), _dec11 = put('/editShow'), _dec12 = admin('admin'), _dec13 = del('/deleteArticle'), _dec14 = admin('admin'), _dec15 = post('/upload'), _dec16 = admin('admin'), _dec17 = fileUpload('articleImage'), _dec18 = get('/searchOneComment'), _dec19 = post('/addAdMark'), _dec20 = admin('admin'), _dec21 = post('/addAdReply'), _dec22 = admin('admin'), _dec23 = del('/deleteReply'), _dec24 = admin('admin'), _dec25 = del('/deleteMark'), _dec26 = admin('admin'), _dec27 = post('/addTagOrClassic'), _dec28 = admin('admin'), _dec(_class = (_class2 = (_class3 = class AdminApiControllers {
  async login(ctx, next) {
    const {
      user,
      password
    } = ctx.request.body;
    let ip = ctx.request.ip;

    try {
      const matchData = await checkPassword(user, password, ip);

      if (matchData.match) {
        ctx.session.views = {
          _id: matchData.userInfo._id,
          email: matchData.userInfo.email,
          role: matchData.userInfo.role,
          user: matchData.userInfo.user
        };
        let token = getToken(user);
        ctx.body = resData(1, '登录成功', token);
      } else {
        ctx.body = resData(2, '用户名或密码错误');
      }
    } catch (e) {
      ctx.body = resData(0, '出现错误', e.toString());
    }
  }

  async addArticle(ctx, next) {
    try {
      const addInfo = ctx.request.body;
      let data = await commitArticle(addInfo);
      ctx.body = resData(1, '查询成功', data);
    } catch (e) {
      ctx.body = resData(0, '出现错误', e.toString());
    }
  }

  async editArticle(ctx, next) {
    try {
      const editInfo = ctx.request.body;
      let data = await editArticle(editInfo.id, editInfo);
      ctx.body = resData(1, '查询成功', data);
    } catch (e) {
      ctx.body = resData(0, '出现错误', e.toString());
    }
  }

  async searchAll(ctx, next) {
    try {
      const params = ctx.request.query;
      let data = await getAdArticleList(parseInt(params.page), parseInt(params.count), params);
      ctx.body = resData(1, '查询成功', data);
    } catch (e) {
      ctx.body = resData(0, '出现错误', e.toString());
    }
  }

  async searchAdArticle(ctx, next) {
    try {
      const {
        id
      } = ctx.request.query;
      let data = await getOneAdArticle(id);
      ctx.body = resData(1, '查询成功', data);
    } catch (e) {
      ctx.body = resData(0, '出现错误', e.toString());
    }
  }

  async editArticleShow(ctx, next) {
    try {
      const {
        id,
        show
      } = ctx.request.body;
      let data = await editShow(id, show);
      ctx.body = resData(1, '查询成功', data);
    } catch (e) {
      ctx.body = resData(0, '出现错误', e.toString());
    }
  }

  async deleteMyArticle(ctx, next) {
    try {
      const {
        id
      } = ctx.request.query;
      let data = await deleteArticle(id);
      ctx.body = resData(1, '查询成功', {
        data
      });
    } catch (e) {
      ctx.body = resData(0, '出现错误', e.toString());
    }
  }

  async upload(ctx, next) {
    try {
      let fileName = ctx.req.file.filename;
      ctx.body = resData(1, '上传成功', {
        fileName,
        filePath: `uploads/${fileName}`
      });
    } catch (e) {
      ctx.body = resData(0, '出现错误', e.toString());
    }
  }

  async searchOne(ctx, next) {
    let {
      id
    } = ctx.request.query;

    try {
      let result = await searchOneArticleComment(id);
      ctx.body = resData(1, '查询成功', result);
    } catch (e) {
      ctx.body = resData(0, '查询出错');
      throw e;
    }
  }

  async addMark(ctx, next) {
    let {
      _id,
      user,
      email,
      content
    } = ctx.request.body;
    console.log(ctx.request.body);

    try {
      if (_id && user && email && content) {
        let markData = await saveMark(_id, user, email, content, AdminApiControllers.isManage);
        ctx.body = resData(1, '查询成功', markData);
      } else {
        throw '信息不全';
      }
    } catch (e) {
      ctx.body = resData(0, '查询出错', e.toString());
      throw e;
    }
  }

  async addReply(ctx, next) {
    let {
      _id,
      markId,
      user,
      replyUser,
      email,
      content
    } = ctx.request.body;

    try {
      if (_id && markId && user && email && content) {
        let replyData = await saveReply(_id, markId, user, replyUser, email, content, AdminApiControllers.isManage);
        ctx.body = resData(1, '查询成功', replyData);
      } else {
        throw '信息不全';
      }
    } catch (e) {
      ctx.body = resData(0, '查询出错', e.toString());
      throw e;
    }
  }

  async deleteReply(ctx, next) {
    let {
      id,
      markId,
      replyId
    } = ctx.request.query;

    try {
      await delReply(id, markId, replyId);
      ctx.body = resData(1, '删除成功', {});
    } catch (e) {
      ctx.body = resData(0, '出现错误', e.toString());
    }
  }

  async deleteMark(ctx, next) {
    let {
      id,
      markId
    } = ctx.request.query;

    try {
      await delMark(id, markId);
      ctx.body = resData(1, '删除成功', {});
    } catch (e) {
      ctx.body = resData(0, '出现错误', e.toString());
    }
  }

  async addTagOrClassic(ctx, next) {
    let params = ctx.request.body;

    try {
      let data = await addTagOrClassicInfo(params);
      ctx.body = resData(1, '查询成功', data);
    } catch (e) {
      ctx.body = resData(0, '出现错误', e.toString());
    }
  }

}, _defineProperty(_class3, "isManage", true), _class3), (_applyDecoratedDescriptor(_class2.prototype, "login", [_dec2, _dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "login"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "addArticle", [_dec4, auth, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "addArticle"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "editArticle", [_dec6, auth, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "editArticle"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "searchAll", [_dec8, auth], Object.getOwnPropertyDescriptor(_class2.prototype, "searchAll"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "searchAdArticle", [_dec9, auth, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "searchAdArticle"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "editArticleShow", [_dec11, auth, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "editArticleShow"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "deleteMyArticle", [_dec13, auth, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "deleteMyArticle"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "upload", [_dec15, _dec16, _dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "upload"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "searchOne", [_dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "searchOne"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "addMark", [_dec19, auth, _dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "addMark"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "addReply", [_dec21, auth, _dec22], Object.getOwnPropertyDescriptor(_class2.prototype, "addReply"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "deleteReply", [_dec23, auth, _dec24], Object.getOwnPropertyDescriptor(_class2.prototype, "deleteReply"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "deleteMark", [_dec25, auth, _dec26], Object.getOwnPropertyDescriptor(_class2.prototype, "deleteMark"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "addTagOrClassic", [_dec27, auth, _dec28], Object.getOwnPropertyDescriptor(_class2.prototype, "addTagOrClassic"), _class2.prototype)), _class2)) || _class);
export { AdminApiControllers as default };
//# sourceMappingURL=adminApi.js.map