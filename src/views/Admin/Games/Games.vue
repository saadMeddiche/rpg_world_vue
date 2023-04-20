<template>
  <h1>Show Games</h1>
  <router-link :to="{name : 'AddGame'}"><button class="Add-Button">Add Game</button></router-link>
  <search :object="games"></search>
  <div class="Games" v-if="games.length">
    <div class="Game" v-for="(game, key) in filtredGames" :key="key">
        <div class="Buttons">
            <button class="Delete" @click="delete_game(game.id)">Delete</button>
            <button class="Update" @click="edit_game(game.id)">Update</button>
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

.Add-Button{
  color: orange;
  background-color: white;
  border: 1px solid orange;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;

  margin-bottom: 10px;
  
  &:hover {
    background-color: orange;
    color: white;
  }
}

.Games {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 20px;
  
  .Game {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
    
    .Buttons {
      position: absolute;
      top: 0;
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 10px;
      
      .Delete {
        color: red;
        background-color: white;
        border: 1px solid red;
        border-radius: 5px;
        padding: 5px 10px;
        font-size: 14px;
        cursor: pointer;
        
        &:hover {
          background-color: red;
          color: white;
        }
      }
      
      .Update {
        color: blue;
        background-color: white;
        border: 1px solid blue;
        border-radius: 5px;
        padding: 5px 10px;
        font-size: 14px;
        cursor: pointer;
        
        &:hover {
          background-color: blue;
          color: white;
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