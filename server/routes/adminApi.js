import { controller, get } from '../lib/decorator'

@controller('/api/admin/v0')
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