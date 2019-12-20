import { controller, get } from '../lib/decorator.js'
import fs from 'fs'
import { resolve } from 'path'
import { getDirname } from '../lib/file.js'

const condition = process.env.NODE_ENV

@controller('/admin')
export default class AdminControllers {
  @get('*')
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
      }

      // ctx.manageWebViewConf
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
}
