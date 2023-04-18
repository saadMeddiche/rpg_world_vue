<template>

    <div class="Ops">
        <div class="Title">
            <h1>Oops!</h1>
        </div>
        <div class="Description">
            <p>Something went wrong. Pleaze try to Logging Again !!!</p>
            <router-link :to="{name : 'Login'}" v-if="!Logged_In">Go To Login</router-link>
        </div>
    </div>

</template>


<script>

    export default{

        data(){
            return {

            }
        },
    }
</script>

<style lang="scss" scoped>
    .Ops {
        position: fixed;
        background-color: #000000;
        color: #ffffff;
        height: 90vh;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .Title h1 {
        font-size: 5rem;
        margin-bottom: 2rem;
        color:#de424d;
    }

    .Description p {
        font-size: 2rem;
        text-align: center;
        margin-bottom: 1rem;
    }

    a {
        color:#de424d;
        text-decoration: none;
        font-size: 2rem;

        &:hover {
            text-decoration: underline;
        }

        &.router-link-active {
            font-weight: bold;
        }
    }
    
</style>