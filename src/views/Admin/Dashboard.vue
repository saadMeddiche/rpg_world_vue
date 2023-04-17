<template>
   <h1>Dashboard</h1>
   <p>{{ count_games }}</p>
   <p>{{ count_servers }}</p>
   <router-link :to="{name :'home'}">Home</router-link>
</template>

<script>
   import {count} from '@/utils/apiFunctions'

   export default{
      mounted(){
         count('count_games',this)
         count('count_servers',this)
      },
      data(){
         return{
            count_games:null,
            count_servers:null
         }
      }

   }
</script>

<style>

</style>
