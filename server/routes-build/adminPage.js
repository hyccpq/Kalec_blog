import _applyDecoratedDescriptor from '@babel/runtime/helpers/applyDecoratedDescriptor'

var _dec, _dec2, _class, _class2

import { controller, get } from '../lib/decorator.js'
import fs from 'fs'
import { resolve } from 'path'
import { getDirname } from '../lib/file.js'
const condition = process.env.NODE_ENV
let AdminControllers =
  ((_dec = controller('/admin')),
  (_dec2 = get('*')),
  _dec(
    (_class =
      ((_class2 = class AdminControllers {
        async adminPage(ctx, next) {
          try {
            if (condition === 'development:manage') {
              await next()
            } else {
              ctx.response.type = 'html'
              ctx.response.body = fs.createReadStream(
                resolve(
                  getDirname(import.meta).__dirname,
                  '../../public/dist/manage.html'
                )
              )
            } // ctx.manageWebViewConf
            // console.log(ctx.manageWebViewConf)
            // if (ctx.manageWebViewConf) {
            //     ctx.response.type = 'html'
            //     ctx.response.body = ctx.manageWebViewConf.devMiddleware.devMiddleware.fileSystem.createReadStream(ctx.manageWebViewConf.filename)
            // }
            // await ctx.render('manage.ejs')
          } catch (error) {
            next(error)
            console.log(error)
          }
        }
      }),
      _applyDecoratedDescriptor(
        _class2.prototype,
        'adminPage',
        [_dec2],
        Object.getOwnPropertyDescriptor(_class2.prototype, 'adminPage'),
        _class2.prototype
      ),
      _class2))
  ) || _class)
export { AdminControllers as default }
//# sourceMappingURL=adminPage.js.map
