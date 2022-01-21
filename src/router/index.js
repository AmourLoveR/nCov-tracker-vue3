import { createRouter, createWebHashHistory } from 'vue-router'
import Visualization from '../views/Visualization.vue'

const routes = [
    {
        path: '/visualization',
        name: 'visualization',
        component: Visualization
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router