import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/home'
import index from '../components/index'
import articlePage from '../components/articlePage'
import pageList from '../components/pageList'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path:'/',
      name: 'home',
      component: home,
    },
    {
      path: '/index',
      component: index,
      children:[
        {
          path:'/',
          name: '主文章页面',
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
