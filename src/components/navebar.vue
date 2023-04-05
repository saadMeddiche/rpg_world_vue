<template>
    <div class="Navbar">
        <div class="Links">
            <router-link :to="{name : 'home'}">Home</router-link>
            <router-link :to="{name : 'GamesView'}">Games</router-link>
        </div>

        <div class="Authentication">
            <p>Login</p>
            <p>Register</p>
            <p>Logout</p>
        </div>
    </div>
</template>

<script>

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
    
        p {
            margin: 0 1rem;
            cursor: pointer;
            
            &:hover {
            text-decoration: underline;
            }
        }
    }


</style>

