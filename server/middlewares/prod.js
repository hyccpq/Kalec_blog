import { resolve } from 'path'
import serverRenderer from 'vue-server-renderer'
import serverRender from '../lib/server-render.js'
import koaSslify from 'koa-sslify'
import { getDirname, getRequire } from '../lib/file.js'

const condition = process.env.NODE_ENV
const clientManifestResp = getRequire(import.meta).require(
  '../server-build/vue-ssr-client-manifest.json'
)

export const prod = app => {
  // if (condition === 'production') app.use(koaSslify())

  app.use(async (ctx, next) => {
    try {
      const renderer = serverRenderer.createBundleRenderer(
        resolve(
          getDirname(import.meta).__dirname,
          '../server-build/vue-ssr-server-bundle.json'
        ),
        {
          inject: false,
          clientManifest: clientManifestResp
        }
      )

      await serverRender(ctx, renderer)
    } catch (error) {
      console.error('渲染错误 ==> ', error)
    }
  })
}
