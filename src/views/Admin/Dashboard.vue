<template>
   <h1>Dashboard</h1>
   <p>Games :{{ count_games }}</p>
   <p>Servers :{{ count_servers }}</p>
   <p>Users :{{ count_users }}</p>
   <loading></loading>
   <router-link :to="{name :'home'}">Home</router-link>
</template>

<script>
   import {count} from '@/utils/apiFunctions'
   import loading from '@/components/loading.vue'
   export default{
      components:{
         loading,
      },
      async mounted(){
         this.$store.commit('display_loading_message')
         count('count_games',this)
         count('count_servers',this)
         await count('count_users',this)
         this.$store.commit('display_loading_message')

      },
      data(){
         return{
            count_games:null,
            count_servers:null,
            count_users:null
         }
      }

   }
</script>

<style>

</style>
