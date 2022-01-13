import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Quizz from '../views/Quizz.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/quizz',
    name: 'Quizz',
    component: Quizz
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
