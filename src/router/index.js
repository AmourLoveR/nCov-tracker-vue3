import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import Index from '../views/Index.vue'

const routes = [{
    path: '/',
    name: 'index',
    component: Index,
    children: [{
        path: 'report',
        name: 'report',
        component: () => import('../views/Report.vue')
      },
      {
        path: 'visualization',
        name: 'visualization',
        component: () => import('../views/Visualization.vue')
      },
      {
        path: '/test',
        component: () => import('../views/Test.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/signup.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router