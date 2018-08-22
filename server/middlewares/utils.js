import koaBodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import koaCompress from 'koa-compress'
import nodeZlib from 'zlib'
import koaSslify from 'koa-sslify'

export const addBodyParser = app => {
	app.use(koaBodyparser())
}

export const logs = app => {
	app.use(logger())
}

export const sslify = app => {
	// app.use(koaSslify())
}

export const compression = app => {
	app.use(koaCompress({
		threshold: 2048,
		flush: nodeZlib.Z_SYNC_FLUSH
	}))
}

