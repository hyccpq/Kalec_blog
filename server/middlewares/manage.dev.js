import dev from './dev/devMiddleware'
import hot from './dev/hotMiddleware'
import webpack from 'webpack'

import webpackConfig from '../build/webpack.config.manage'

const compiler = webpack(webpackConfig)

const opt = {
    logTime: true,
	colors: true,
	writeToDisk:true
}

export const webpackDev = app => {
	app.use(dev(compiler, opt))
    app.use(hot(compiler, opt))
    
    app.use(async (ctx, next) => {
        try {
            await ctx.render('error.ejs', {
                code: 404,
                info: '这是管理端开发环境，此页面不存在，点击下方按钮调整管理页面',
                title: '出现错误',
                jumpUrl: '/admin/'
            })
        } catch (error) {
            ctx.render('error.ejs', {
                code: error.code,
                info: '这是管理端开发环境，页面渲染出错或不存在，点击下方按钮调整管理页面',
                title: '出现错误',
                jumpUrl: '/admin/'
            })
        }
    })
}