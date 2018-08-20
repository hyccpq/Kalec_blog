import koaBodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import { resolve } from 'path'

export const addBodyParser = app => {
	app.use(koaBodyparser())
}

export const logs = app => {
	app.use(logger())
}

