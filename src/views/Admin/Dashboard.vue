<template>
   <h1>Dashboard</h1>
   <router-link :to="{name :'home'}">Home</router-link>
</template>

<script>
   import axios from 'axios';
   export default{
      mounted(){

      },
      data(){
         return{

         }
      },
      methods:{
         fetch_user_count(){
            axios.get('')

         }
      }

   }
</script>

<style>

</style>
