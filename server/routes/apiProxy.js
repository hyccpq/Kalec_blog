import { controller, get, post, auth, admin, required } from '../lib/decorator'
import axios from 'axios';

@controller('/api')
export class ApiControllers {

	@get('*')
	async getTem (ctx, next) {
		try {
			let res = await axios({
				method: 'get',
				url: 'https://www.kalecgos.top' + ctx.path
			})
			console.log(res.data);
			
			ctx.body = res.data
		} catch (error) {
			console.log(error);
		}
		

		// const tem = await getAllTem()
		// ctx.body = {
		// 	success: true,
		// 	tem
		// }
	}
}