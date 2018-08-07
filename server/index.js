import Koa from 'koa';
import { resolve } from 'path'
import R from 'ramda'

const MIDDLEWARES = ['utils', 'staticServer', 'router']
const condition = process.env.NODE_ENV
const prod = condition === 'production'

switch (condition) {
	case 'development:index':
		MIDDLEWARES.push('index.dev')
		break;

	case 'development:manage':
		MIDDLEWARES.push('manage.dev')
		break;	

	default:
		MIDDLEWARES.push('prod')
		break;
}


const app = new Koa()

;(async () =>{
	
	const useMiddlewares = app => {
		R.map(
			R.compose(
				R.forEachObjIndexed(
					initWith => initWith(app)
				),
				require,
				name => resolve(__dirname, `./middlewares/${name}`)
			)
		)(MIDDLEWARES)
	}
	
	useMiddlewares(app)
	
	app.listen(5678, () => {
		console.log('服务运行于\nhttp://localhost:5678');
	})
	
})()