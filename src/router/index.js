import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '../views/Index.vue'

const routes = [
	{
		path: '/',
		name: 'index',
		component: Index,
    redirect: '/observation',
		children: [
			{
				path: 'observation',
				name: 'observation',
				component: () => import('../views/management/Observation.vue'),
			},
			{
				path: 'observation/:id',
				name: 'observationInfo',
				component: () => import('../views/management/Info.vue'),
			},
			{
				path: 'location',
				name: 'location',
				component: () => import('../views/management/Location.vue'),
			},
      {
        path: 'relationship',
        name: 'relationship',
        component: () => import('../views/management/Relationship.vue')
      },
			{
				path: 'article',
				name: 'article',
				component: () => import('../views/article/Article.vue'),
			},
			{
				path: 'editor',
				name: 'editor',
				component: () => import('../views/article/Editor.vue'),
			},
			{
				path: 'preview/:id',
				name: 'preview',
				component: () => import('../views/article/Preview.vue'),
			},
			{
				path: 'accounts',
				name: 'accounts',
				component: () => import('../views/Accounts.vue'),
			},
			{
				path: 'notification',
				name: 'notification',
				component: () => import('../views/Notification.vue'),
			},
			{
				path: '/404',
				name: 'notFound',
				component: () => import('../views/404.vue'),
			},
			{
				path: '/:pathMath(.*)',
				redirect: '/404',
			},
		],
	},
	{
		path: '/public',
		name: 'public',
		component: () => import('../views/Public.vue'),
		children: [
			{
				path: 'report',
				name: 'report',
				component: () => import('../views/public/Report.vue'),
			},
			{
				path: 'visualization',
				name: 'visualization',
				component: () => import('../views/public/Visualization.vue'),
			},
			{
				path: 'articles',
				name: 'articles',
				component: () => import('../views/public/PublicArticle.vue'),
			},
			{
				path: 'article/:id',
				name: 'articleId',
				component: () => import('../views/article/Preview.vue'),
			},
		],
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('../views/user/Login.vue'),
	},
	{
		path: '/signup',
		name: 'signup',
		component: () => import('../views/user/Signup.vue'),
	},
	{
		path: '/changepwd',
		name: 'changepwd',
		component: () => import('../views/user/ChangePwd.vue'),
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router
