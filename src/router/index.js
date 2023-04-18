import { createRouter, createWebHistory } from 'vue-router'

//================User======================
import HomeView from '../views/HomeView.vue'
//===========Games
import GamesIndex from '../views/Games/GamesIndex.vue'
//===========Servers
import ServersIndex from '../views/Servers/ServersIndex.vue'
//===========Authentification
import Login from '../views/Authentications/Login.vue'
import Register from '../views/Authentications/Register.vue'

//================Admin======================
//===========Dashboard
import Dashboard from '../views/Admin/Dashboard.vue'
//===========Games
import Games from '../views/Admin/Games/Games.vue'
import AddGame from '../views/Admin/Games/AddGame.vue'
import UpdateGame from '../views/Admin/Games/UpdateGame.vue'
//===========Servers
import Servers from '../views/Admin/Servers/Servers.vue'
import AddServer from '../views/Admin/Servers/AddServer.vue'
import UpdateServer from '../views/Admin/Servers/UpdateServer.vue'
import Server from '../views/Servers/Server.vue'
//===========Roles
import Roles from '../views/Admin/Roles/Roles.vue'
//===========Users
import Users from '../views/Admin/Users/Users.vue'

//===================Error===============
import Opsy from '@/views/Opsy.vue';



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
    path: '/server',
    name: 'Server',
    component: Server,
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
    path: '/admin/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta:{
      status:'admin',
      requiresAuth:true
    }
  },
  ,{
    path: '/admin/games',
    name: 'Games',
    component: Games,
    meta:{
      status:'admin',
      requiresAuth:true
    }
  },{
    path: '/admin/games/add',
    name: 'AddGame',
    component: AddGame,
    meta:{
      status:'admin',
      requiresAuth:true
    }
  },{
    path: '/admin/games/update',
    name: 'UpdateGame',
    component: UpdateGame,
    meta:{
      status:'admin',
      requiresAuth:true
    }
  },{
    path: '/admin/server',
    name: 'Servers',
    component: Servers,
    meta:{
      status:'admin',
      requiresAuth:true
    }
  },{
    path: '/admin/server/add',
    name: 'AddServer',
    component: AddServer,
    meta:{
      status:'admin',
      requiresAuth:true
    }
  },{
    path: '/admin/server/update',
    name: 'UpdateServer',
    component: UpdateServer,
    meta:{
      status:'admin',
      requiresAuth:true
    }
  },{
    path: '/admin/roles',
    name: 'Roles',
    component: Roles,
    meta:{
      status:'admin',
      requiresAuth:true
    }
  },{
    path: '/admin/users',
    name: 'Users',
    component: Users,
    meta:{
      status:'admin',
      requiresAuth:true
    }
  }
  ,{
    path: '/Opsy',
    name: 'Opsy',
    component: Opsy,
    meta:{
      requiresAuth:false
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
