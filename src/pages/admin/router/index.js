import Vue from 'vue'
import Router from 'vue-router'
const admin = resolve => require(['../componets/admin'],resolve);
const login = resolve => require(['../componets/loginPage'],resolve);
const write = resolve => require(['../componets/write'],resolve);
const articleManage = resolve => require(['../componets/articleManage'],resolve);
const commentList = resolve => require(['../componets/commentList'],resolve);

Vue.use(Router);

export default new Router({
  mode:'history',
  // saveScrollPosition:true,
  routes: [
    {
      path:'*',
      redirect:'/login',
    },
    {
      path:'/login',
      name: '登录',
      component: login,
    },
    {
      path: '/',
      component: admin,
      redirect:'/write',
      children:[
         {
          path: '/write',
          meta: {auth: true},
          component: write,
          name: 'adminWrite'
        },
        {
          path: '/articleManage',
          meta: {auth: true},
          component: articleManage,
          name: 'articleManage',
        },
        {
          path: '/articleManage/edit/:id',
          meta: {auth: true},
          component: write,
          name: 'adminEdit'
        },
        {
          path: '/articleManage/commentManage/:id',
          meta: {auth: true},
          component: commentList,
          name: 'commentEdit'
        },
      ]
    }
  ]
})
