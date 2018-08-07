import { createApp } from './index'
// 客户端特定引导逻辑……
const { app, router, store } = createApp()

// store替换使client rendering和server rendering匹配
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

// 这里假定 App.vue 模板中根元素具有 `id="app"`（服务器渲染后就有这个id）
// router.onReady(() => {
//   app.$mount('#app')
// })
