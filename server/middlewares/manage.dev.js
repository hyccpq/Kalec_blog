// import dev from './dev/devMiddleware'
// import hot from './dev/hotMiddleware'
import koaWebpack from 'koa-webpack';
import webpack from 'webpack'
import {resolve} from 'path'

import webpackConfig from '../build/webpack.config.manage'

const compiler = webpack(webpackConfig)

export const webpackDev = async app => {
    // app.use(dev(compiler, opt))
    // app.use(hot(compiler, opt))
    const devMiddleware = await koaWebpack({compiler})
    // app.use(devMiddleware)
    app.use(devMiddleware)

    app.use(async (ctx, next) => {
        try {
            const filename = resolve(webpackConfig.output.path, 'manage.html')
            console.log(filename)
            ctx.response.type = 'html'
            ctx.response.body = devMiddleware.devMiddleware.fileSystem.createReadStream(filename)
            // await ctx.render('error.ejs', {
            //     code: 404,
            //     info: '这是管理端开发环境，此页面不存在，点击下方按钮调整管理页面',
            //     title: '出现错误',
            //     jumpUrl: '/admin/'
            // })
        } catch (error) {
            ctx.render('error.ejs', {
                code: error.code,
                info: '这是管理端开发环境，页面渲染出错或不存在，点击下方按钮调整管理页面',
                title: '出现错误',
                jumpUrl: '/'
            })
        }
    })
}
