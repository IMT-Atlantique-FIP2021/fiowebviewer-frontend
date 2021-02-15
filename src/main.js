import { createApp } from 'vue'
import App from './views/Dashboard.vue'
import router from './router'
import './index.css'

createApp(App).use(router).mount('#app')
