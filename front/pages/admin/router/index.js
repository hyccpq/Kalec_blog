import Vue from 'vue'
import Router from 'vue-router'
const admin = resolve => require(['../componets/admin'],resolve);
const login = resolve => require(['../componets/loginPage'],resolve);
const write = resolve => require(['../componets/write'],resolve);
const articleManage = resolve => require(['../componets/articleManage'],resolve);
const commentList = resolve => require(['../componets/commentList'],resolve);
const galleryList = resolve => require(['../componets/galleryManage'],resolve);
const editGallery = resolve => require(['../componets/editGallery'],resolve);
const galleryPage = resolve => require(['../componets/galleryInfoPage'],resolve);

Vue.use(Router);

export default new Router({
	mode:'history',
	// saveScrollPosition:true,
	routes: [
		{
		  path:'*',
		  redirect:'/admin/login',
		},
		{
			path:'/admin/login',
			name: '登录',
			component: login,
		},
		{
			path: '/admin/edit',
			component: admin,
			// redirect:'/write',
			children:[
				{
					path: 'write',
					meta: {auth: true},
					component: write,
					name: 'adminWrite'
				},
				{
					path: 'articleManage',
					meta: {auth: true},
					component: articleManage,
					name: 'articleManage',
				},
				{
					path: 'articleManage/edit/:id',
					meta: {auth: true},
					component: write,
					name: 'adminEdit'
				},
				{
					path: 'articleManage/commentManage/:id',
					meta: {auth: true},
					component: commentList,
					name: 'commentEdit'
				},
				{
					path: 'galleryManage',
					meta: {auth: true},
					component: galleryList,
					name: 'galleryManage'
				},
				{
					path: 'galleryManage/addGallery',
					meta: {auth: true},
					component: editGallery,
					name: 'addGallery'
				},
				{
					path: 'galleryPage/:id/:title',
					meta: {auth: true},
					component: galleryPage,
					name: 'galleryPage'
				},
				{
					path: 'galleryManage/editGallery/:id/:index/:title',
					meta: {auth: true},
					component: editGallery,
					name: 'editGallery'
				}
			]
		}
	]
})
