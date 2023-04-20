<template>
  <loading></loading>
  <div class="BigTitle">
    <h1>Games</h1>
  </div>
  <search :object="games"></search>
  <div class="Games" v-if="games.length">
    <div class="Game" v-for="game in filtredGames" :key="game" @click="display_servers(game.id)">
      <div class="Image">
          <img :src="$imagePath+game.image" alt="">
      </div>
      <div class="Title">
          <p>{{game.name}}</p>
      </div>
      <div class="Description">
          <p>{{ game.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>

  import {fetch_games} from '@/utils/apiFunctions'
  import { stock } from '@/utils/storageFunctions'
  import search from '@/components/search.vue'
  import loading from '@/components/loading'

  
  export default{
    components:{
      search,
      loading
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
      display_servers(id){
        stock('game',id)
        this.$router.push('/servers')
      },
    
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

  .BigTitle{
   display: flex;
    justify-content: center;
    align-items: center;
    gap:10px;
    font-size: 26px;
    font-weight: bold;
    text-shadow: 2px 2px $secondary-color;
  }
.Games {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;

  .Game {

    background-color: #222;
    transition: all 0.3s ease;
    // border:2px solid $secondary-color;
    box-shadow: 4px 2px $secondary-color;
    border-radius: 10px;
    margin-bottom: 20px;
    padding: 20px;
    width: 300px;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }

    .Image {
      height: 150px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .Title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
      color: white;

      p {
        font-size: 1.2rem;
        font-weight: bold;
        margin: 0;
      }
    }

    .Description {
      margin-top: 1rem;
      color: white;
      font-size: 1.1rem;
      text-align: justify;
    }

    .Status {
      margin-top: 1rem;
      color: $secondary-color;
      font-size: 1.1rem;
      font-weight: bold;

      span {
        color: $primary-color;
        font-weight: normal;
      }
    }
  }
}


/* Style for the Games title */
/* Style for the Games title */
h1 {
  color: black;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

</style>