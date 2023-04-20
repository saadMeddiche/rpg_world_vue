<template>
   <div class="dashboard">
      <h1>Dashboard</h1>
      <div class="counts">
         <div class="count-item games">
            <p class="count">{{ count_games }}</p>
            <p class="count-label">Games</p>
         </div>
         <div class="count-item servers">
            <p class="count">{{ count_servers }}</p>
            <p class="count-label">Servers</p>
         </div>
         <div class="count-item users">
            <p class="count">{{ count_users }}</p>
            <p class="count-label">Users</p>
         </div>
      </div>
      <loading></loading>
   </div>
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

<style lang="scss" scoped>
.dashboard {
   max-width: 600px;
   margin: 0 auto;
   background-color: #1c1c1c;
   padding: 20px;
}

h1 {
   font-size: 40px;
   text-align: center;
   color: #fff;
   text-shadow: 2px 2px #ff6c00;
   margin-bottom: 30px;
}

.counts {
   display: flex;
   justify-content: space-between;
   margin: 20px 0;
   gap:20px;
}

.count-item {
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   width: 33.3%;
   height: 120px;
   background-color: #0077ff;
   border-radius: 10px;
   box-shadow: 2px 2px #00ff84;
   transition: all 0.3s ease-in-out;
   cursor: pointer;
   &:hover{
      transform: translateY(-5px);
   }
}



.games {
   background-color: #ff6c00;
   box-shadow: 2px 2px #e6e6e6;
   &:hover{
      box-shadow: 4px 4px #00ff84;
   }
}

.servers {
   background-color: #00ff84;
   box-shadow: 2px 2px #0077ff;
   &:hover{
      box-shadow: 4px 4px #ff6c00;
   }
}

.users {
   background-color: #e6e6e6;
   box-shadow: 2px 2px #ff6c00;
   &:hover{
      box-shadow: 4px 4px #0077ff;
   }
}

.count {
   font-size: 36px;
   color: #fff;
   text-shadow: 1px 1px #000;
   margin-bottom: 10px;
}

.count-label {
   font-size: 18px;
   color: #fff;
   text-shadow: 1px 1px #000;
}

</style>
