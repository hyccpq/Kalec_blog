import serve from 'koa-static'
import views from 'koa-views'
import { resolve } from 'path'


export const prod = app => {
	
	app.use(serve(resolve(__dirname, '../../front/dist')))
	app.use(views(resolve(__dirname, '../../front/dist')), {
			extensions: 'html'
	})

	app.use(async (ctx, next) => {
		await ctx.render('index.html')
	})
}