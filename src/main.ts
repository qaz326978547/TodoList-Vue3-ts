import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import './assets/all.scss'


const app = createApp(App)
app.config.globalProperties.$http = axios;
createApp(App).mount('#app')
