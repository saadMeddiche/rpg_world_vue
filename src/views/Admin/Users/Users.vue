<template>
    <h1>Show users</h1>
    <div class="Users">
        <div class="User" v-for="(user,key) in users" :key="key">
            <div class="Name">
                <p>Name:{{ user.name }}</p>
            </div>
            <div class="Email">
                <p>Email:{{ user.email }}</p>
            </div>
            <div class="Roles">
                Roles:
                <p v-for="(role,key) in user.roles" :key="key">
                    {{ role.name }}
                </p>
            </div>
            <div>
                ================================================
            </div>
        </div>
    </div>
</template>

<script>
import {get_users_information} from '@/utils/apiFunctions'
    export default{
        async mounted(){
            this.users = await get_users_information()
        }
        ,
        data(){
            return {
                users:{}
            }
        }
    }
</script>