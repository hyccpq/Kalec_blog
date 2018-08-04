const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const view = require('koa-views');
const koaError = require('koa-onerror');
const convert = require('koa-convert');
const koaStatic = require('koa-static');
const logger = require('koa-logger');
const http = require('http');
const compress = require('koa-compress');
const https = require('https');
const http2 = require('http2');
const fs = require('fs');
const koaSslify  = require('koa-sslify');
const historyApiFallback = require('./middleware/historyApiFallback')
// const middleware = require('./middleware')
// const opener = require('opener');

const app = new Koa();

// const index = require('./route/index.js');
// const other = require('./route/other.js');
const api = require('./route/api.js');

const Router = require('koa-router');
const path = require('path')
const index = new Router()

const isProd = process.env.NODE_ENV === 'production'

const { createBundleRenderer } = require('vue-server-renderer')
const resolve = file => path.resolve(__dirname, file)

app.convert = x => app.use.call(app, convert(x));
// 强制转用https、
// app.use(koaSslify());
app.convert(bodyparser());
// //logger
app.convert(logger());
app.use(compress({
  thailand:2048,
  flush: require('zlib').Z_SYNC_FLUSH
}))
//static
// app.convert(koaStatic('./dist'));
app.use(koaStatic(resolve(__dirname+'/public')))
app
  .use(api.routes())
  .use(api.allowedMethods())

app.use(convert(historyApiFallback({
  verbose:true,
  index: '/dist/manage.html',
  rewrites: [
    // { from: /^\/admin\/login/ , to: '/manage.html' },
    { from: /^\/admin/, to:'/dist/manage.html' },
    { from: /^\/admin#\/.*$/, to: '/dist/manage.html' }
  ],
  path: /^\/admin/
})))

app.use(koaStatic(resolve(__dirname+'/public')))

// //设置默认模板为ejs
// app.use(view('./views',{
// 	extension: 'ejs'
// }));

// 生成服务端渲染函数
let renderer
function createRender(bundle, template){
  return createBundleRenderer(bundle, {
    // 推荐
    runInNewContext: false,
    // 模板html文件
    template,
    //缓存
    cache: require('lru-cache')({
      max: 1000,
      maxAge: 1000 * 60 * 15
    })
  })
}

if(isProd) {
  const bundle = require(__dirname+'/public/dist/vue-ssr-server-bundle.json')
  const template = fs.readFileSync(resolve(__dirname+'/public/dist/app.html'), 'utf-8')
  renderer = createRender(bundle, template)
  app.use(koaStatic(resolve(__dirname+'/public/dist')))
} else {
  require('./build/setup-dev-server')(app, (bundle, template) => {
    renderer = createRender(bundle, template)
  })
}

function renderToString (context) {
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      err ? reject(err) : resolve(html)
    })
  })
}
// response

index.get('*',async(ctx,next)=>{
  try {
    const context = {
      url: ctx.url
    }
    // 将服务器端渲染好的html返回给客户端
    // renderer = createRender()
    ctx.body = await renderToString(context)
    // 设置请求头
    ctx.set('Content-Type', 'text/html')
    ctx.set('Server', 'Koa2 server side render')
  } catch (e) {
    // 如果没找到，放过请求，继续运行后面的中间件
    console.error(e);
    next()
  }
});
//发生默认err.ejs
// koaError(app,{template: '/data/server/views/err.ejs'});
//router
app
  .use(index.routes())
  .use(index.allowedMethods());
// app.use(other.routes(),other.allowedMethods());

// error logger
app.on('error',(err, ctx) => {
  console.log('error occured:', err)
});

let options = {
	  key: fs.readFileSync(__dirname+'/ssl/private.key'),
    cert: fs.readFileSync(__dirname+'/ssl/full_chain.pem'),
    allowHTTP1: true
};


http.createServer(app.callback()).listen(8085,()=>{
    console.log("http://127.0.0.1:8085 is runing");
	//opener("http://127.0.0.1:3000");
});

http2.createSecureServer(options, app.callback()).listen(8443,()=>{
    console.log("https://localhost:8443 is runing");
	//opener("https://127.0.0.1:443");
});
