<template>
  <div class="Title">
    <h1 v-if="game">{{game.name}} Servers</h1>
    <backbutton></backbutton>
  </div>
  
  <search :object="servers"></search>
  <div class="Servers" v-if="filtredServers.length">
    <div class="Server" v-for="server in filtredServers" :key="server" @click="display_server_content(server.id)">
      <div class="Image">
        <img :src=" 'http://localhost/RPG_World_Laravel/public/uploads/games/' + server.image" alt="">
      </div>
      <div class="Title">
        <p>{{server.name}}
          <span :class="{'online' : server.online , 'offline': !server.online}" v-if="server.address">
            {{ status(server.online) }}
          </span>
        </p>
      </div>
      <div class="Description">
        <p>{{ server.description }}</p>
      </div>
      <div class="Status" v-if="server.address">
        <p>
          Players : 
          <span>
            {{ players(server.OnlinePlayers,server.MaxPlayers) }}
          </span>
        </p>
      </div>
    </div>
      
  </div>
  <div v-else>
    <h2>There is No Servers For This Game Yet</h2>
    <h4>Be The First Who add its Own Server</h4> 
  </div>
    
</template>

<script>
  import backbutton from '@/components/backbutton.vue';
  import {fetch_game ,fetch_servers} from '@/utils/apiFunctions';
  import {get_server_status} from '@/utils/statusFunctions';
  import search from '@/components/search.vue'
  import { stock,get } from '@/utils/storageFunctions';


  export default{
    components:{
      backbutton,
      search
    },
    async created(){
      fetch_game(this)  
      await fetch_servers(this)
      get_server_status(this)
    },
    data(){
      return {
        servers:{},
        game:null,
      }
    },
    methods:{
      status(status){
        return status ? 'Online' : 'Offline';
      },
      players(OnlinePlayers,MaxPlayers){
        return OnlinePlayers != null  && MaxPlayers  ? OnlinePlayers+' / '+MaxPlayers : 'Unkown'
      },
      display_server_content(id){
        stock('server' , id)
        this.$router.push({name : 'Server'})
      }
    },
    computed:{
      filtredServers(){
        let filtred_servers = this.$store.state.filtred_object 

        if(filtred_servers) return filtred_servers.filter(server => server.game_id == get('game') )
      
      }
    }
  }

</script>

<style lang="scss" scoped>
.Title{
  display: flex;
  justify-content: center;
  align-items: center;
  gap:10px;
}
p {
  font-size: 16px;
  margin: 0;
  
  span {
    font-weight: bold;
    
    &.online {
      color: green;
    }
    
    &.offline {
      color: red;
    }
  }
  

}

/* Style for the Games section */
.Servers {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
}

/* Style for each Game card */
.Server {
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