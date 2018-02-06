import Vue from 'vue'
import Router from 'vue-router'
const home = resolve => require(['../components/home'],resolve);
const index = resolve => require(['../components/index'],resolve);
const articlePage = resolve => require(['../components/articlePage'],resolve);
const pageList = resolve => require(['../components/pageList'],resolve);

Vue.use(Router)

export default new Router({
  mode:'history',
  saveScrollPosition:true,
  routes: [
    {
      path:'/',
      name: 'home',
      component: home,
    },
    {
      path: '/index',
      component: index,
      redirect:'/index/1',
      children:[
        {
          path:'/index/:page',
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
          meta:{ scrollToTop:true },
          component: articlePage
        },
      ]
    }
  ]
})
