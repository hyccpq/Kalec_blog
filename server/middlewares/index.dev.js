import dev from './dev/devMiddleware';
import hot from './dev/hotMiddleware';
import webpack from 'webpack';
import MemoryFs from 'memory-fs';
import fs from 'fs';
import { resolve, join } from 'path';
import serverConfig from '../build/webpack.config.server';
import clientConfig from '../build/webpack.config.client';
import { createBundleRenderer } from 'vue-server-renderer';
import serverRender from '../lib/server-render';

const opt = {
	logTime: true,
	colors: true,
};

let bundle, clientManifestResp;

// const manageCompiler = webpack(manageConfig);

const serverCompiler = webpack(serverConfig);

const mfs = new MemoryFs();

serverCompiler.outputFileSystem = mfs;

serverCompiler.watch({}, (err, stats) => {
	if (err) throw err;
	stats = stats.toJson();
	stats.errors.forEach(console.error);
	stats.warnings.forEach(console.warn);

	const bundlePath = join(serverConfig.output.path, 'vue-ssr-server-bundle.json');

	bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'));
	console.log('服务端新的打包完成');
});

export const allWebpackDev = (app) => {
	const clientCompiler = webpack(clientConfig);

	const devMiddleware = dev(clientCompiler, opt);

	app.use(devMiddleware);

	clientCompiler.plugin('done', () => {
		const mfs = devMiddleware.fileSystem;
		const filePath = join(clientConfig.output.path, '../../public/dist/vue-ssr-client-manifest.json');
		console.log(mfs.existsSync(filePath));
		
		if (mfs.existsSync(filePath)) {
			clientManifestResp = JSON.parse(mfs.readFileSync(filePath, 'utf-8'));
			console.log('客户端编译完成');
		}
	});

	app.use(hot(clientCompiler, opt));

	// opt.writeToDisk = true
	// app.use(dev(manageCompiler, opt))
	// app.use(hot(manageCompiler, opt))

	app.use(async (ctx, next) => {
		try {
			if (!bundle) {
				let info = '编译中，请等待......';
				let code = 404
				await ctx.render('error.ejs', { info, code, title: info })
				return;
			}
		
			const renderer = createBundleRenderer(bundle, {
				inject: false,
				clientManifest: clientManifestResp
			});

			await serverRender(ctx, renderer);
		} catch (error) {
			console.log(error);
		}
	});
};
