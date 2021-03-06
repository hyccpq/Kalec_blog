import Router from 'koa-router'
import { resolve } from 'path'
import glob from 'glob'
import _ from 'lodash'
import R from 'ramda'
import { verify } from '../service/auth.js'
import { resData } from './util.js'
import multer from 'koa-multer'
import { getDirname, getRequire } from './file.js'

const symbolPrefix = Symbol('prefix')
const routerMap = new Map()

const isArray = c => (_.isArray(c) ? c : [c])

export class Route {
  constructor(app, apiPath) {
    this.app = app
    this.apiPath = apiPath
    this.router = new Router()
  }

  async init() {
    const routePath = glob.sync(resolve(this.apiPath, './**/*.js'))
    // console.log(routePath)
    try {
      const prs = routePath.map(path => import(path))
      await Promise.all(prs)
      // for (const iter of routePath) {
      //   await import(iter)
      // }

      for (let [conf, controller] of routerMap) {
        const controllers = isArray(controller)
        let prefixPath = conf.target[symbolPrefix]
        if (prefixPath) prefixPath = normalizePath(prefixPath)
        const routerPath = prefixPath + conf.path
        this.router[conf.method](routerPath, ...controllers)
      }

      this.app.use(this.router.routes()).use(this.router.allowedMethods())
    } catch (e) {
      console.log(e)
    }
  }
}

const normalizePath = path => (path.startsWith('/') ? path : `/${path}`)

const router = conf => (target, key, descriptor) => {
  conf.path = normalizePath(conf.path)
  routerMap.set(
    {
      target,
      ...conf
    },
    target[key]
  )
}

export const controller = path => target =>
  (target.prototype[symbolPrefix] = path)

export const get = path =>
  router({
    method: 'get',
    path
  })

export const post = path =>
  router({
    method: 'post',
    path
  })

export const put = path =>
  router({
    method: 'put',
    path
  })

export const del = path =>
  router({
    method: 'delete',
    path
  })

export const use = path =>
  router({
    method: 'use',
    path
  })

export const all = path =>
  router({
    method: 'all',
    path
  })

const decorate = (args, middleware) => {
  let [target, key, descriptor] = args

  target[key] = isArray(target[key])
  target[key].unshift(middleware)

  return descriptor
}

const convert = middleware => (...args) => decorate(args, middleware)

export const auth = convert(async (ctx, next) => {
  await verify(ctx, next)
})

export const admin = roleExpected =>
  convert(async (ctx, next) => {
    const { role } = ctx.session.views

    if (!role || role !== roleExpected) {
      return (ctx.body = resData(0, '抱歉您不是管理员'))
    }

    await next()
  })

export const compresCaptcha = convert(async (ctx, next) => {
  const { captcha } = ctx.session
  const { captChaValue } = ctx.request.body
  console.log(ctx.session)
  console.log(captcha, captChaValue)
  if (captcha !== captChaValue) {
    return (ctx.body = resData(0, '验证码不正确'))
  }

  await next()
})

export const required = rules =>
  convert(async (ctx, next) => {
    let errors = []
    const checkRules = R.forEachObjIndexed((value, key) => {
      errors = R.filter(i => !R.has(i, ctx.request[key]))(value)
    })

    checkRules(rules)

    if (errors.length) {
      console.log(`${errors.join(',')}是必须填写的`)
      ctx.throw(412, `${errors.join(',')}是必须填写的`)
    }

    await next()
  })

const STORAGE = multer.diskStorage({
  //文件保存路径
  destination(req, file, cb) {
    cb(
      null,
      resolve(getDirname(import.meta).__dirname, '../../public/static/uploads/')
    )
    // 'public/uploads/')
  },
  //修改文件名称
  filename(req, file, cb) {
    let fileFormat = file.originalname.split('.')
    cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
  }
})

const LIMITS = {
  fieldSize: '10MB',
  files: 5
}

const upload = multer({ storage: STORAGE, limits: LIMITS })

export const fileUpload = name => convert(upload.single(name))
