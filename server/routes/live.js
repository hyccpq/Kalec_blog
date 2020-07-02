import { controller, get } from '../lib/decorator.js'
import fs from 'fs'
import { resolve } from 'path'
import { getDirname } from '../lib/file.js'

const condition = process.env.NODE_ENV

@controller('/live')
export default class LiveControllers {
  @get('/show')
  async livePage(ctx, next) {
    try {
      console.log('???????')
      await ctx.render('live.ejs')
    } catch (error) {
      next(error)
      console.log(error)
    }
  }
}
