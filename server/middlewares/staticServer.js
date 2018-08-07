import serve from 'koa-static'
import views from 'koa-views'
import { resolve } from 'path';

export const staticServer = app => {
	
	app.use(serve(resolve(__dirname, '../../public/static')))
	app.use(serve(resolve(__dirname, '../../public/dist')));
	app.use(views(resolve(__dirname, '../ejs'), {
		extension: 'ejs'
	}));
}
    