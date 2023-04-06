import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GamesIndex from '../views/Games/GamesIndex.vue'
import ServersIndex from '../views/Servers/ServersIndex.vue'
import Login from '../views/Authentications/Login.vue'
import Register from '../views/Authentications/Register.vue'
import Dashboard from '../views/Admin/Dashboard.vue'




const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta:{
      requiresAuth:false
    }
  },
  {
    path: '/Games',
    name: 'GamesView',
    component: GamesIndex,
    meta:{
      requiresAuth:false
    }
  },
  {
    path: '/servers',
    name: 'ServersIndex',
    component: ServersIndex,
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta:{
      requiresAuth:false
    }
  }
  , {
    path: '/register',
    name: 'Register',
    component: Register,
    meta:{
      requiresAuth:false
    }
  }
  ,{
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta:{
      requiresAuth:true
    }
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

router.beforeEach ((to, from) =>{
  if(to.meta.requiresAuth && !localStorage.getItem('token') ) {
    return {name: 'Login'}
  }
 
})
