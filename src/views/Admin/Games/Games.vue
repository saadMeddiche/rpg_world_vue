<template>
  <h1>Show Games</h1>
  <router-link :to="{name : 'AddGame'}"><button class="Add-Button">Add Game</button></router-link>
  <div class="Sheach">
    <input type="text" name="" id="" v-model="looking_for">
    <button @click="Clear">X</button>
  </div>
  <div class="Games" v-if="games.length">
    <div class="Game" v-for="(game, key) in filtredGames" :key="key">
        <div class="Buttons">
            <button class="Delete" @click="delete_game(game.id)">Delete</button>
            <button class="Update" @click="edit_game(game.id)">Update</button>
        </div>
        <div class="Image">
            <img :src="'http://localhost/RPG_World_Laravel/public/uploads/games/'+game.image" alt="">
        </div>
        <div class="Name">
            <p>{{ game.name }}</p>
        </div>
    </div>
  </div>
</template>

<script>
import {destory,fetch_games} from '@/utils/apiFunctions';

  export default{
    created(){
      fetch_games(this)
    },
    data(){
      return {
        games:{},
        looking_for:''
      }
    },
    methods:{
      async delete_game(game_id){
        await destory(game_id,'games')
        fetch_games(this)
      },
      edit_game(id){
        this.stock_game_id(id)
        this.$router.push({name : 'UpdateGame'})
      },
      stock_game_id(id){
        localStorage.setItem('game',id)
      },
      Clear(){
        this.looking_for = ''
      }
    },
    computed:{
      filtredGames(){
        if(this.games) return this.games.filter(game => game.name.toLowerCase().includes(this.looking_for.toLowerCase()))
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

/* Style for the search bar */
.Sheach {
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  input {
    flex: 1;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
  }

  button {
    margin-left: 10px;
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: #ccc;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
  }
}







  
</style>