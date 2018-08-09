import { controller, get } from '../lib/decorator'

@controller('/admin')
export class AdminControllers {

	@get('*')
	async adminPage (ctx, next) {
		try {
            
			await ctx.render('manage.ejs')
		} catch (error) {
			console.log(error);
		}
		
	}
}