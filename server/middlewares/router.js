import { Route } from '../lib/decorator'
import { resolve } from 'path'

export const routers = app => {
	const apiPath = resolve(__dirname, '../routes')
	const router = new Route(app, apiPath)
	
	router.init()
}