// import dev from './dev/devMiddleware';
// import hot from './dev/hotMiddleware';
import webpack from 'webpack'
import MemoryFs from 'memory-fs'
import koaWebpack from 'koa-webpack'
import { resolve, join } from 'path'
import serverConfig from '../build/webpack.config.server.cjs'
import clientConfig from '../build/webpack.config.client.cjs'
import serverRenderer from 'vue-server-renderer'
import serverRender from '../lib/server-render.js'

// const opt = {
//     logTime: true,
//     colors: true,
// };

let bundle, clientManifestResp

// const manageCompiler = webpack(manageConfig);

const serverCompiler = webpack(serverConfig)

const mfs = new MemoryFs()

serverCompiler.outputFileSystem = mfs

serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.error('==>>', err))
  stats.warnings.forEach(warn => console.warn('==>>', warn))

  const bundlePath = join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json'
  )

  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('服务端新的打包完成')
})

export const allWebpackDev = async app => {
  const clientCompiler = webpack(clientConfig)

  const devMiddleware = await koaWebpack({ compiler: clientCompiler })

  app.use(devMiddleware)

  clientCompiler.plugin('done', () => {
    const mfs = devMiddleware.devMiddleware.fileSystem
    const filePath = join(
      clientConfig.output.path,
      '../../public/dist/vue-ssr-client-manifest.json'
    )
    console.log(mfs.existsSync(filePath))

    if (mfs.existsSync(filePath)) {
      clientManifestResp = JSON.parse(mfs.readFileSync(filePath, 'utf-8'))
      console.log('客户端编译完成')
    }
  })

  // app.use(hot(clientCompiler, opt));

  // opt.writeToDisk = true
  // app.use(dev(manageCompiler, opt))
  // app.use(hot(manageCompiler, opt))

  app.use(async (ctx, next) => {
    try {
      if (!bundle) {
        let info = '编译中，请等待......'
        let code = 404
        await ctx.render('error.ejs', { info, code, title: info })
        return
      }

      console.log(typeof serverRenderer.createBundleRenderer, serverRenderer)

      const renderer = serverRenderer.createBundleRenderer(bundle, {
        inject: false,
        clientManifest: clientManifestResp
      })

      await serverRender(ctx, renderer)
    } catch (error) {
      console.log(error)
    }
  })
}
