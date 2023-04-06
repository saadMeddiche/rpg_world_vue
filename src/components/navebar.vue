<template>
    <div class="Navbar">
        <div class="Links">
            <router-link :to="{name : 'home'}">Home</router-link>
            <router-link :to="{name : 'GamesView'}">Games</router-link>
        </div>

        <div class="Authentication">
            <router-link :to="{name : 'Login'}" v-if="!Logged_In">Login</router-link>
            <router-link :to="{name : 'Register'}" v-if="!Logged_In">Register</router-link>
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
            //source : https://www.designcise.com/web/tutorial/how-to-check-if-a-key-exists-in-localstorage-using-javascript#:~:text=How%20to%20Check%20if%20a%20Key%20Exists%20in%20localStorage%20Using%20JavaScript%3F&text=Since%20the%20Storage%20object%20(which,the%20key%20does%20not%20exist).
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

