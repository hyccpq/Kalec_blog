import { Route } from '../lib/decorator.js'
import { resolve } from 'path'
import { getDirname } from '../lib/file.js'

export const routers = async app => {
  // const routerDirPath = process.env.NODE_ENV.includes('production')
  //   ? '../routes-build'
  //   : '../routes'
  const routerDirPath = '../routes-build'
  const apiPath = resolve(getDirname(import.meta).__dirname, routerDirPath)
  const router = new Route(app, apiPath)
  await router.init()
}
