import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'animate.css'

import './assets/styles/style.scss'

createApp(App).use(store).use(router).mount('#app')
