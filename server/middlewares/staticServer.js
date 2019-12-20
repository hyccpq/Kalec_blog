import serve from 'koa-static'
import views from 'koa-views'
import { resolve } from 'path'
import { getDirname } from '../lib/file.js'

export const staticServer = app => {
  app.use(
    serve(resolve(getDirname(import.meta).__dirname, '../../public/static'))
  )
  app.use(
    serve(resolve(getDirname(import.meta).__dirname, '../../public/dist'))
  )
  app.use(
    views(resolve(getDirname(import.meta).__dirname, '../ejs'), {
      extension: 'ejs'
    })
  )
}
