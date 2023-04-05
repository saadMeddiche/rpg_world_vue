import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GamesIndex from '../views/Games/GamesIndex.vue'
import ServersIndex from '../views/Servers/ServersIndex.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/Games',
    name: 'GamesView',
    component: GamesIndex
  },
  {
    path: '/servers',
    name: 'ServersIndex',
    component: ServersIndex
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
