import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import routes, { setupRouterGuards } from './index.js'

const router = createRouter({ history: createWebHistory(), routes })

setupRouterGuards(router)

createApp(App).use(router).mount('#app')