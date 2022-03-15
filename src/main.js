import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { create, NButton, NIcon, NMessageProvider, NInput, NForm, NFormItem, NSelect } from 'naive-ui'
import './index.css'

const naive = create({
    components: [NButton, NIcon, NMessageProvider, NInput, NForm, NFormItem, NSelect]
})

const app = createApp(App)
app.use(naive)
app.use(router)

app.mount('#app')
