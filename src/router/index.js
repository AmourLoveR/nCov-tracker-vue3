import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '../views/Index.vue'

const routes = [{
    path: '/',
    name: 'index',
    component: Index,
    children: [
      {
        path: 'report',
        name: 'report',
        component: () => import('../views/Report.vue')
      },
      {
      path: 'visualization',
      name: 'visualization',
      component: () => import('../views/Visualization.vue')
    }]
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router