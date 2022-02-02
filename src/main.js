import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { create, NButton, NMessageProvider } from 'naive-ui'
import './index.css'

const naive = create({
    components: [NButton, NMessageProvider]
})

const app = createApp(App)
app.use(naive)
app.use(router)

app.mount('#app')
