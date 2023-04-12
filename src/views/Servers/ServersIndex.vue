<template>
  <div class="Title">
    <h1>{{game.name}} Servers</h1>
    <backbutton></backbutton>
  </div>
  
  <div class="Sheach">
    <input type="text" name="" id="" v-model="looking_for">
    <button @click="Clear">X</button>
  </div>
  <div v-if="servers.length">
    <div class="Servers" v-if="filtredServers.length">

      <div class="Server" v-for="server in filtredServers" :key="server" @click="display_server_content(server)">
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
  </div>
    
</template>

<script>
  import axios from 'axios';
  import backbutton from '@/components/backbutton.vue'

  export default{
    components:{
      backbutton,
    },
    created(){
      this.get_game()
      this.fetch_servers()
    },
    data(){
      return {
        servers:{},
        game:null,
        looking_for:'',
      }
    },
    methods:{
      get_game(){
        let data = localStorage.getItem('game')
        this.game = JSON.parse(data)
      },
      fetch_servers(){
        axios.get('http://127.0.0.1:8000/api/V1/servers')
          .then((responce) => this.servers = responce.data.servers)
          .then(() => this.get_server_status())
      }
      ,
      Clear(){
        this.looking_for = ''
      },
      //async /await : https://stackoverflow.com/questions/54955426/how-to-use-async-await-in-vue-js
      //For...Of : https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop
      async get_server_status(){
        if(this.game.name == 'MineCraft'){
          for(let server of this.filtredServers){
            let status = await this.get_server_status_minecraft(server.address);
            server["online"]=status.online;
            if(status.players){
              server["OnlinePlayers"]=status.players.online;
              server["MaxPlayers"]=status.players.max;
            } 
          }
        }
      },
      async get_server_status_minecraft(address){
        return axios.get('https://api.mcstatus.io/v2/status/java/' + address)
          .then((responce) =>  responce.data)
      },
      status(status){
        
        return status ? 'Online' : 'Offline';
      },
      players(OnlinePlayers,MaxPlayers){
        // why ? != null , so when the online player are 0 , it do not display unkonwn
        return OnlinePlayers != null  && MaxPlayers  ? OnlinePlayers+' / '+MaxPlayers : 'Unkown'
      },
      display_server_content(server){
        this.$store.commit("change_server", server) 
        this.$router.push({name : 'Server'})
      }
    },
    computed:{
      filtredServers(){
        return this.servers.filter(server => server.name.toLowerCase().includes(this.looking_for.toLowerCase()) && server.game_id == this.game.id)
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