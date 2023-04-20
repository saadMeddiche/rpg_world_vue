<template>
  <div class="BigTitle">
    <h1>Games</h1>
  </div>
  <router-link :to="{name : 'AddGame'}"><button class="Add-Button">Add Game</button></router-link>
  <search :object="games"></search>
  <div class="Games" v-if="games.length">
    <div class="Game" v-for="(game, key) in filtredGames" :key="key">
        <div class="Buttons">
            <button class="Delete" @click="delete_game(game.id)">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:20px;">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>
            <button class="Update" @click="edit_game(game.id)">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:20px;">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            </button>
        </div>
        <div class="Image">
            <img :src="$imagePath+game.image" alt="">
        </div>
        <div class="Name">
            <p>{{ game.name }}</p>
        </div>
    </div>
  </div>
</template>

<script>
  import {destory,fetch_games} from '@/utils/apiFunctions';
  import { stock }from '@/utils/storageFunctions';
  import search from '@/components/search.vue';


  export default{
    components:{
      search,
    },
    async created(){
      this.$store.commit('display_loading_message')
      await fetch_games(this)
      this.$store.commit('display_loading_message')

    },
    data(){
      return {
        games:{},
        looking_for:''
      }
    },
    methods:{
      async delete_game(game_id){
        
        await destory(game_id,'games',this)
        fetch_games(this)

      },
      edit_game(id){

        stock('game' ,id)
        this.$router.push({name : 'UpdateGame'})

      }
    },
    computed:{
      filtredGames(){
        return this.$store.state.filtred_object
      }
    }
  }
</script>

<style lang="scss" scoped>
  $primary-color: #00ff84;
  $secondary-color: #ff6c00;
  $thirdly-color: #e6e6e6;
  $fourthly-color: #0077ff; 
.Add-Button{
  color: $secondary-color;
  background-color: white;
  border: 1px solid $secondary-color;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;

  margin-bottom: 10px;

  transition: all 0.3s ease;

  &:hover {
    background-color: $secondary-color;
    color: white;
  }
}

  .BigTitle{
    color:$fourthly-color;
    display: flex;
    justify-content: center;
    align-items: center;
    gap:10px;
    font-size: 26px;
    font-weight: bold;
    text-shadow: 2px 2px 2px $secondary-color;

    h1{
      margin: 0px;
    }
  }

.Games {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 20px;
  filter: drop-shadow(2px 1px 10px $fourthly-color);

  
  .Game {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
    text-shadow: 2px 2px 2px $secondary-color;
    
    .Buttons {
      position: absolute;
      top: 0;
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 10px;
      transition: all 0.3s;
      
      .Delete {
        color: white;
        background-color: rgb(125, 14, 14);
        border: 2px solid rgb(125, 14, 14);
        border-radius: 5px;
        padding: 5px 10px;
        font-size: 14px;
        cursor: pointer;
        transition: 0.3s ease;

        &:hover {
          background-color: white;
          color: rgb(125, 14, 14);
        }
      }
      
      .Update {
        color: white;
        background-color: rgb(201, 155, 6);
        border: 2px solid rgb(201, 155, 6);
        border-radius: 5px;
        padding: 5px 10px;
        font-size: 14px;
        cursor: pointer;
        transition: 0.3s ease;

        
        &:hover {
          background-color: white;
          color: rgb(201, 155, 6);
        }
      }
    }
    
    .Image {
      width: 200px;
      height: 200px;
      overflow: hidden;
      border-radius: 50%;
      margin-bottom: 10px;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    
    .Name {
      text-align: center;
      font-size: 20px;
      font-weight: bold;
    }
  }
}









  
</style>