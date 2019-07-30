import Koa from 'koa';
import {resolve} from 'path'
import R from 'ramda'
import http2 from 'http2'
import fs from 'fs'
import {initSchemas, initAdmin, connect, initClassicAndTags} from './database/init'
import 'colors'

const MIDDLEWARES = [
    'utils',
    'session',
    'staticServer',
    'router'
];

const HTTPS_OPTIONS = {
    key: fs.readFileSync(resolve(__dirname, './conf/ssl/private.key')),
    cert: fs.readFileSync(resolve(__dirname, './conf/ssl/full_chain.pem')),
    allowHTTP1: true
}

const condition = process.env.NODE_ENV

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
console.log(MIDDLEWARES);


;(async () => {

    initSchemas();

    await connect();

    await initAdmin();

    await initClassicAndTags();

    console.log('数据库初始化完毕'.yellow);

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

    if (process.env.NODE_ENV !== 'production') {
        app.listen(8088, () => {
            console.log('服务运行于\nhttp://localhost:8088');
        })
    } else {
        app.listen(80, () => {
            console.log('服务运行于\nhttp://localhost:80');
        })
        http2.createSecureServer(HTTPS_OPTIONS, app.callback()).listen(443, () => {
            console.log("https://localhost:443".bgRed);
        });
    }


})()
