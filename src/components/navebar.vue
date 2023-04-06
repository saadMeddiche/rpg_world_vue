<template>
    <div class="Navbar">
        <div class="Links">
            <router-link :to="{name : 'home'}">Home</router-link>
            <router-link :to="{name : 'GamesView'}">Games</router-link>
        </div>

        <div class="Authentication">
            <router-link :to="{name : 'Login'}" v-if="!Logged_In">Login</router-link>
            <router-link :to="{name : 'Register'}" v-if="!Logged_In">Register</router-link>
            <router-link :to="{name : 'Dashboard'}" v-if="Logged_In">Dashboard</router-link>
            <a @click="Logout" v-if="Logged_In">Logout</a>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                Logged_In:false
            }
        },
        watch:{
            $route(){
                this.Logged_In = this.Loggin_status()
            }
        },
        methods:{
            Logout(){
                localStorage.removeItem('token')
                this.$router.push('/')
            }, 
            Loggin_status(){
                return (localStorage.getItem('token') !== null) ? true : false
            }
        }
    }
</script>

<style lang="scss">

    .Navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background-color: #fff;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 1);

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
            margin-right: 1rem;
            text-decoration: none;
            
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
            margin-right: 1rem;
            text-decoration: none;
            
            &:hover {
            text-decoration: underline;
            }
            
            &.router-link-active {
            font-weight: bold;
            }
        }
    }


</style>

