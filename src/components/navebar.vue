<template>
  <div class="Navbar">
    <div class="Links">
      <router-link :to="{name : 'home'}">Home</router-link>
      <router-link :to="{name : 'GamesView'}">Games</router-link>
    </div>

    <div class="Authentication">
      <router-link :to="{name : 'Login'}" v-if="!Logged_In">Login</router-link>
      <router-link :to="{name : 'Register'}" v-if="!Logged_In">Register</router-link>
      <router-link :to="{name : 'Dashboard'}" v-if="Logged_In && dahboard_access">Dashboard</router-link>
      <a @click="Logout" v-if="Logged_In">Logout</a>
    </div>
  </div>
</template>

<script>
  import {verify_staff_access} from '@/utils/apiFunctions'
    export default{
        async mounted(){
          this.dahboard_access= await verify_staff_access()
        },
        data(){
            return {
                Logged_In:false,
                dahboard_access:false
            }
        },
        watch:{
            async $route(){
              this.Logged_In = this.Loggin_status()
              this.dahboard_access= await verify_staff_access()
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

<style lang="scss">
.Navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background-color: #fff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 1);
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
    color: #333;
    margin-right: 2rem;
    text-decoration: none;
    font-size: 1.2rem;

    &:hover {
      text-decoration: underline;
    }

    &.router-link-active {
      font-weight: bold;
    }
  }
}

.Authentication {
  display: flex;
  align-items: center;

  a {
    color: #333;
    margin-right: 2rem;
    text-decoration: none;
    font-size: 1.2rem;
    cursor: pointer;


    &:hover {
      text-decoration: underline;
    }

    &.router-link-active {
      font-weight: bold;
    }
  }
}
</style>

