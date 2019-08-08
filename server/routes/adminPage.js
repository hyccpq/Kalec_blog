import {controller, get} from '../lib/decorator'

@controller('/admin')
export class AdminControllers {

    @get('*')
    async adminPage(ctx, next) {
        try {
            // ctx.manageWebViewConf
			console.log(ctx.manageWebViewConf)
            if (ctx.manageWebViewConf) {
                ctx.response.type = 'html'
                ctx.response.body = ctx.manageWebViewConf.devMiddleware.devMiddleware.fileSystem.createReadStream(ctx.manageWebViewConf.filename)
            }
            // await ctx.render('manage.ejs')
        } catch (error) {
            console.log(error);
        }

    }
}
