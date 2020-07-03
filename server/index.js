import Koa from 'koa'
import { resolve } from 'path'
import R from 'ramda'
import http2 from 'http2'
import fs from 'fs'
import GreenLock from 'greenlock-koa'

import {
  initSchemas,
  initAdmin,
  connect,
  initClassicAndTags
} from './database/init.js'
import 'colors'
import { getDirname, getRequire } from './lib/file.js'
import { userInfo } from './conf/userConf'

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
            resolve(
              getDirname(import.meta).__dirname,
              `/conf/ssl./middlewares/${name}`
            ),
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
    const greenlock = GreenLock.create({
      version: 'draft-11', // Let's Encrypt v2
      // You MUST change this to 'https://acme-v02.api.letsencrypt.org/directory' in production
      server: 'https://acme-staging-v02.api.letsencrypt.org/directory',

      email: userInfo.email,
      agreeTos: true,
      approveDomains: ['kalecgos.top'],
      // store: await import('greenlock-store-fs'),
      // Join the community to get notified of important updates
      // and help make greenlock better
      communityMember: true,

      configDir: resolve(getDirname(import.meta).__dirname, `./conf/ssl`),
      domainKeyPath: resolve(
        getDirname(import.meta).__dirname,
        './conf/ssl/privkey.pem'
      ),
      privkeyPath: resolve(
        getDirname(import.meta).__dirname,
        './conf/ssl/privkey.pem'
      ),
      fullchainPath: resolve(
        getDirname(import.meta).__dirname,
        './conf/ssl/fullchain.pem'
      ),
      certPath: resolve(
        getDirname(import.meta).__dirname,
        './conf/ssl/cert.pem'
      ),
      chainPath: resolve(
        getDirname(import.meta).__dirname,
        './conf/ssl/chain.pem'
      ),
      bundlePath: resolve(
        getDirname(import.meta).__dirname,
        './conf/ssl/bundle.pem'
      )

      //, debug: true

      //, debug: true
    })
    app.listen(80, () => {
      console.log('服务运行于\nhttp://localhost:80')
    })
    console.log(';;;;;;;;;')
    console.log(greenlock)
    http2
      .createSecureServer(
        greenlock.tlsOptions,
        greenlock.middleware(app.callback())
      )
      .listen(443, () => {
        console.log('https://localhost:443'.bgRed)
      })
  }
})()
