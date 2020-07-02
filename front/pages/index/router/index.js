import Vue from 'vue'
import Router from 'vue-router'
import Nprogress from 'nprogress'

const home = resolve => require(['../components/home'], resolve)
const index = resolve => require(['../components/index'], resolve)
const articlePage = resolve => require(['../components/articlePage'], resolve)
const pageList = resolve => require(['../components/pageList'], resolve)
const express = resolve => require(['../components/express/express'], resolve)
const expressImg = resolve =>
  require(['../components/express/expressImg'], resolve)
const gallery = resolve => require(['../components/gallery/gallery'], resolve)
const live = resolve => require(['../components/live/live'], resolve)

Vue.use(Router)

export function createRouter() {
  let vueRouter = new Router({
    mode: 'history',
    saveScrollPosition: true,
    routes: [
      {
        path: '/',
        name: 'home',
        component: home
      },
      {
        path: '/express',
        name: 'express',
        component: express
      },
      {
        path: '/gallery',
        name: 'gallery',
        component: gallery
      },
      {
        path: '/express/img',
        name: 'expressImg',
        component: expressImg
      },
      {
        path: '/live/show',
        name: 'live',
        component: live
      },
      {
        path: '/index',
        component: index,
        redirect: '/index/1',
        children: [
          {
            path: '/index/:page',
            name: '主文章页面',
            component: pageList
          },
          {
            path: '/classic/:class/:page',
            name: '文章类别列表',
            component: pageList
          },
          {
            path: '/tag/:tag/:page',
            name: '文章标签页',
            component: pageList
          },
          {
            path: '/article/:id',
            name: '文章页',
            meta: { scrollToTop: true },
            component: articlePage
          }
        ]
      }
    ]
  })

  if (typeof window !== 'undefined') {
    Nprogress.configure({
      easing: 'ease-in',
      speed: 400,
      showSpinner: false,
      trickleSpeed: 200,
      minimum: 0.3
    })

    vueRouter.beforeEach((to, from, next) => {
      Nprogress.start()

      next()
    })

    vueRouter.afterEach(() => {
      Nprogress.done()
    })
  }

  return vueRouter
}
