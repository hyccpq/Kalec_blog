import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _class3, _temp;

import { controller, get, post, required, compresCaptcha } from '../lib/decorator.js';
import { getArticle, searchOneArticle, getAllTagsAndClassic, saveMark, saveReply, createCaptchas } from '../service/getArticleInfo.js';
import { resData } from '../lib/util.js';
let PublicApiControllers = (_dec = controller('/api/public'), _dec2 = get('/indexPage'), _dec3 = get('/searchOne'), _dec4 = get('/searchAllTags'), _dec5 = post('/addMark'), _dec6 = post('/addReply'), _dec7 = get('/getCaptcha'), _dec8 = post('/compressCaptcha'), _dec(_class = (_class2 = (_temp = _class3 = class PublicApiControllers {
  async indexPage(ctx, next) {
    let query = ctx.request.query;

    try {
      let result = await getArticle(parseInt(query.page), query);
      ctx.body = resData(1, '查询成功', result);
    } catch (e) {
      ctx.body = resData(0, '查询出错', e.toString());
      throw e;
    }
  }

  async searchOne(ctx, next) {
    let {
      id
    } = ctx.request.query;

    try {
      let result = await searchOneArticle(id);
      ctx.body = resData(1, '查询成功', result);
    } catch (e) {
      ctx.body = resData(0, '查询出错');
      throw e;
    }
  }

  async searchAllTags(ctx, next) {
    try {
      let tagList = await getAllTagsAndClassic();
      ctx.body = resData(1, '查询成功', tagList);
    } catch (e) {
      ctx.body = resData(0, '查询出错');
      throw e;
    }
  } // @get("/searchClassic")
  // async searchClassic (ctx, next) {
  //
  // }
  //
  // @get("/searchTag")
  // async searchTag (ctx, next) {
  //
  // }


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
        let markData = await saveMark(_id, user, email, content, PublicApiControllers.isManage);
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
        let replyData = await saveReply(_id, markId, user, replyUser, email, content, PublicApiControllers.isManage);
        ctx.body = resData(1, '查询成功', replyData);
      } else {
        throw '信息不全';
      }
    } catch (e) {
      ctx.body = resData(0, '查询出错', e.toString());
      throw e;
    }
  } // @get("/addLike")
  // async addLike (ctx, next) {
  //
  // }


  async getCaptcha(ctx, next) {
    try {
      let captcha = await createCaptchas();
      ctx.session.captcha = captcha.text;
      ctx.body = resData(1, '查询成功', captcha.data);
    } catch (e) {
      ctx.body = resData(0, '查询出错', e.toString());
      throw e;
    }
  }

  async compressCaptchaAll(ctx, next) {
    ctx.body = resData(1, '验证成功', true);
  }

}, _defineProperty(_class3, "isManage", false), _temp), (_applyDecoratedDescriptor(_class2.prototype, "indexPage", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "indexPage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "searchOne", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "searchOne"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "searchAllTags", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "searchAllTags"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "addMark", [_dec5, compresCaptcha], Object.getOwnPropertyDescriptor(_class2.prototype, "addMark"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "addReply", [_dec6, compresCaptcha], Object.getOwnPropertyDescriptor(_class2.prototype, "addReply"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getCaptcha", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "getCaptcha"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "compressCaptchaAll", [_dec8, compresCaptcha], Object.getOwnPropertyDescriptor(_class2.prototype, "compressCaptchaAll"), _class2.prototype)), _class2)) || _class);
export { PublicApiControllers as default };
//# sourceMappingURL=publicApi.js.map