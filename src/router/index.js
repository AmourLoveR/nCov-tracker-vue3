import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Visualization from '../views/Visualization.vue'

const routes = [{
    path: '/',
    name: 'index',
    component: Index,
    children: [{
      path: 'visualization',
      name: 'visualization',
      component: Visualization
    }]
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router