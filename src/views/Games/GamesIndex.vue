<template>
    <h1>Games</h1>
    <div class="Sheach">
        <input type="text" name="" id="" v-model="looking_for">
        <button @click="Clear">X</button>
    </div>
    <div class="Games" v-if="games">
        <div class="Game" v-for="game in filtredGames" :key="game" @click="DisplayServers(game.id)">
            <div class="Image">
                <img :src=" 'http://localhost/RPG_World_Laravel/public/uploads/games/'+game.image" alt="">
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
    import axios from 'axios';

    export default{
        data(){
            return {
                games:{},
                looking_for:''
            }
        },
        methods:{
            fetch_games(){
                axios.get('http://127.0.0.1:8000/api/V1/games')
                    .then((responce) => this.games = responce.data.games)
            },
            Clear(){
                this.looking_for = ''
            },
            DisplayServers(game_id){
                this.$store.commit("change_game", game_id);
                this.$router.push('/servers');
            }
        },
        created(){
            this.fetch_games()
        },
        computed:{
            filtredGames(){
              if(this.games)
                return this.games.filter(game => game.name.toLowerCase().includes(this.looking_for.toLowerCase()))
                
            }
        }
    }
</script>

<style lang="scss">
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

/* Style for the Games title */
h1 {
  font-size: 30px;
  margin-bottom: 20px;
}

</style>