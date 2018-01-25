import Vue from 'vue'
import Router from 'vue-router'
import admin from '../componets/admin'
import login from '../componets/loginPage'
import write from '../componets/write'

Vue.use(Router);

export default new Router({
  // mode:'history',
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
      ]
    }
  ]
})
