import Koa from 'koa'
import { resolve } from 'path'
import R from 'ramda'
import GreenLock from 'greenlock-express'

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

// const HTTPS_OPTIONS = {
//   key: fs.readFileSync(
//     resolve(getDirname(import.meta).__dirname, '/conf/ssl./conf/ssl/private.key')
//   ),
//   cert: fs.readFileSync(
//     resolve(getDirname(import.meta).__dirname, '/conf/ssl./conf/ssl/full_chain.crt')
//   ),
//   allowHTTP1: true
// }

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

  if (condition !== 'production' || condition === 'production:test') {
    app.listen(8088, () => {
      console.log('服务运行于\nhttp://localhost:8088')
      console.log('服务运行于\nhttp://kalec.kalecgos.top:8088')
    })
  } else {
    // app.listen(80, () => {
    //   console.log('服务运行于\nhttp://localhost:80')
    // })

    GreenLock.init({
      packageRoot: resolve(getDirname(import.meta).__dirname, '../'),
      configDir: './greenlock.d',
      maintainerEmail: userInfo.email,
      debug: false,
      cluster: false
    }).ready(glx => httpsWorker(glx, app))
  }
})()

function httpsWorker(glx, app) {
  const cb = app.callback()

  const mHttp2Server = glx.http2Server({}, cb)

  mHttp2Server.listen(443, '0.0.0.0', function() {
    console.log('Listening on ', mHttp2Server.address())
  })

  const mHttpServer = glx.httpServer()

  mHttpServer.listen(80, '0.0.0.0', function() {
    console.info('Listening on ', mHttpServer.address())
  })
}
