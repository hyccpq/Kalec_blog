import Koa from 'koa'
import { resolve } from 'path'
import R from 'ramda'

import {
  initSchemas,
  initAdmin,
  connect,
  initClassicAndTags
} from './database/init.js'
import 'colors'
import { getDirname, getRequire } from './lib/file.js'
import { userInfo } from './conf/userConf.js'

const MIDDLEWARES = ['utils', 'session', 'staticServer', 'router']

const condition = process.env.NODE_ENV

switch (condition) {
  case 'development:index':
    MIDDLEWARES.push('index.dev')
    break

  case 'development:manage':
    MIDDLEWARES.push('manage.dev')
    break
  case 'test':
    MIDDLEWARES.push('test')
    break
  default:
    MIDDLEWARES.push('prod')
    break
}

const app = new Koa()
console.log(MIDDLEWARES)
// console.log(GreenLock)
;(async () => {
  await initSchemas()

  await connect()

  await initAdmin()

  await initClassicAndTags()

  console.log('数据库初始化完毕'.yellow)

  const initMiddlewares = app => async prs => {
    try {
      let middleFiles = await Promise.all(prs)
      for (const middles of middleFiles) {
        let keys = R.keys(middles)
        for (const key of keys) {
          await middles[key](app)
        }
      }
      // middleFiles.map(i => console.log(R.keys(i)))
    } catch (e) {
      console.error(e.bgRed)
    }
  }

  console.log('MIDDLEWARES', MIDDLEWARES.green)

  const useMiddlewares = app => {
    R.pipe(
      R.map(
        R.compose(
          s => import(s),
          name =>
            resolve(getDirname(import.meta).__dirname, `./middlewares/${name}`),
          iter => `${iter}.js`
        )
      ),
      initMiddlewares(app)
    )(MIDDLEWARES)
  }

  useMiddlewares(app)

  app.listen(8088, () => {
    console.log('服务运行于\nhttp://127.0.0.1:8088')
  })
})()
