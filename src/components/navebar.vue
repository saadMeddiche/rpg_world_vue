<template>
  <div class="Navbar">
    <div class="Links">
      <router-link :to="{name : 'home'}">Home</router-link>
      <router-link :to="{name : 'GamesView'}">Games</router-link>
    </div>

    <div class="Authentication">
      <router-link :to="{name : 'Login'}" v-if="!Logged_In">Login</router-link>
      <router-link :to="{name : 'Register'}" v-if="!Logged_In">Register</router-link>
      <div class="dropdown" v-if="Logged_In">
        <a class="dropbtn">{{user.name}}</a>
        <div class="dropdown-content">
          <router-link :to="{name : 'Account'}">Account</router-link>
          <a @click="Logout">LogOut</a>
        </div>
      </div>
      <router-link :to="{name : 'Dashboard'}" v-if="Logged_In && dahboard_access">Dashboard</router-link>
      <router-link :to="{name : 'ServersOfuser'}" v-if="Logged_In">My Servers</router-link>
     

    </div>
  </div>
</template>

<script>
  import {verify_staff_access ,get_user_information} from '@/utils/apiFunctions'
  import { get } from '@/utils/storageFunctions'
  export default{
    async mounted(){
      if(get('token')){
        this.dahboard_access= await verify_staff_access()
        this.user = await get_user_information()
      }
     
    },
    data(){
      return {
        Logged_In:false,
        dahboard_access:false,
        user:{}
      }
    },
    watch:{
      async $route(){
        this.Logged_In = this.Loggin_status()
        if(get('token')){
          this.dahboard_access= await verify_staff_access()
          this.user = await get_user_information()

        }
      }
    },
    methods:{
      Logout(){
        localStorage.removeItem('token')
        this.Logged_In=false
        this.$router.push('/')
      }, 
      Loggin_status(){
        return (localStorage.getItem('token') != null) ? true : false
      }
    }
  }
</script>

<style lang="scss" scoped>
$primary-color: #00ff84;
$secondary-color: #ff6c00;
$thirdly-color: #e6e6e6;





.Navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background-color: #0a0a0a;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }
}

.Links {
  display: flex;
  align-items: center;

  a {
    color: $thirdly-color;
    margin-right: 2rem;
    text-decoration: none;
    font-size: 1.2rem;
    letter-spacing: 1px;
    font-weight: bold;
    text-transform: uppercase;

    &:hover {
      color: $primary-color;
      text-decoration: none;
      border-bottom: 2px solid $secondary-color;
    }

    &.router-link-active {
      color: $primary-color;
      border-bottom: 2px solid $primary-color;
    }
  }
}

.Authentication {
  display: flex;
  align-items: center;

  a {
    color: $thirdly-color;
    margin-right: 2rem;
    text-decoration: none;
    font-size: 1.2rem;
    letter-spacing: 1px;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;

    &:hover {
      color: $primary-color;
      text-decoration: none;
      border-bottom: 2px solid $secondary-color;
    }

    &.router-link-active {
      color: $primary-color;
      border-bottom: 2px solid $primary-color;
    }
  }
}

.dropbtn {
  color: white;
  padding: 0;
  font-size: 16px;
  border: none;
  cursor: pointer;
  
}

.dropdown-content {
  display: none;
  position: absolute;
  z-index: 1;
  background-color: #f9f9f9;
  border-radius: 5px;

}
.dropdown-content a {
  display: block;
  padding: 12px 16px;
  margin-right: 0px !important;

}
.dropdown-content a:hover {
  background-color: #ddd;
}
.dropdown:hover .dropdown-content {
  display: block;
}
</style>
