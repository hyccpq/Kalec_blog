import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";

var _dec, _dec2, _class, _class2;

import { controller, get } from '../lib/decorator.js';
import fs from 'fs';
import { resolve } from 'path';
import { getDirname } from '../lib/file.js';
const condition = process.env.NODE_ENV;
let LiveControllers = (_dec = controller('/live'), _dec2 = get('/show'), _dec(_class = (_class2 = class LiveControllers {
  async livePage(ctx, next) {
    try {
      console.log('???????');
      await ctx.render('live.ejs');
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

}, (_applyDecoratedDescriptor(_class2.prototype, "livePage", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "livePage"), _class2.prototype)), _class2)) || _class);
export { LiveControllers as default };
//# sourceMappingURL=live.js.map