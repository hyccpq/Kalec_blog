import devMiddleware from 'webpack-dev-middleware';

export default (compiler, opts) => {
	const expressMiddleware = devMiddleware(compiler, opts);
	let nextFlag = false;
	function nextFn() {
		nextFlag = true;
	}
	async function devFn(ctx, next) {
		expressMiddleware(
			ctx.req,
			{
				end: (content) => {
					ctx.body = content;
				},
				setHeader: (name, value) => {
					ctx.headers[name] = value;
				}
			},
			nextFn
		);
		if (nextFlag) {
			nextFlag = false;
			return next();
		}
	}
	devFn.fileSystem = expressMiddleware.fileSystem;
	return devFn;
};
