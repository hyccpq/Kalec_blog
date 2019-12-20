import session from 'koa-session'

const CONFIG = {
  key: 'koa:sess' /** (string) cookie key (default is koa:sess) */,
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  overwrite: true,
  /** (boolean) can overwrite or not (default true) */
  httpOnly: true,
  /** (boolean) httpOnly or not (default true) */
  signed: true,
  /** (boolean) signed or not (default true) */
  rolling: false,
  /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false,
  /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  store: {
    storage: new Map(),
    get(key, maxAge) {
      console.log('得到session', key)
      return this.storage.get(key)
    },
    set(key, sess, maxAge) {
      console.log('存session', key, sess)
      this.storage.set(key, sess)
    },
    destroy(key) {
      console.log('销毁session', key)
      this.storage.delete(key)
    }
  }
}

export const sessions = app => {
  app.keys = ['secret jkl']

  app.use(session(CONFIG, app))
}
