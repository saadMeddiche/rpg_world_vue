<template>
  <loading></loading>
  <h1>Games</h1>
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
/* Style for the Games section */
.Games {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
}

/* Style for each Game card */
.Game {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 20px;
  width: 300px;
}

/* Style for the Game image */
.Image {
  height: 200px;
  margin-bottom: 10px;
  overflow: hidden;

  img {
    display: block;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}

/* Style for the Game title */
.Title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

/* Style for the Game description */
.Description {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 20px;
}



/* Style for the Games title */
h1 {
  font-size: 30px;
  margin-bottom: 20px;
}

</style>