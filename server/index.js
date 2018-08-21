import Koa from 'koa';
import { resolve } from 'path'
import R from 'ramda'
import { initSchemas, initAdmin, connect, initClassicAndTags } from './database/init'
import 'colors'

const MIDDLEWARES = [
	'utils',
	'session',
	'staticServer',
	'router'
];

const condition = process.env.NODE_ENV

switch (condition) {
	// case 'development:index':
	// 	MIDDLEWARES.push('index.dev')
	// 	break;
	//
	// case 'development:manage':
	// 	MIDDLEWARES.push('manage.dev')
	// 	break;

	default:
		MIDDLEWARES.push('prod')
		break;
}

const app = new Koa()
	console.log(MIDDLEWARES);


;(async () => {
	
	initSchemas();
	
	await connect();
	
	await initAdmin();
	
	await initClassicAndTags();
	
	console.log('数据库初始化完毕'.yellow);
	
})()

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