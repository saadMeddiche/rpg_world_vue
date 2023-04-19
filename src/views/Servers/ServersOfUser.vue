<template>

    <loading></loading>
  
    <div class="Tools">
      <router-link :to="{name : 'AddServerByUser'}">Add New Server</router-link>
      <backbutton></backbutton>
    </div>
    
    <search :object="servers"></search>
    <div class="Servers" v-if="filtredServers.length">
      <div class="Server" v-for="server in filtredServers" :key="server">
        <div class="Buttons">
            <button class="Delete" >Delete</button>
            <button class="Update" >Update</button>
        </div>
        <div class="Image">
          <img :src="$imagePath + server.image">
        </div>
        <div class="Title">
          <p>{{server.name}}
            <span :class="{'online' : server.online , 'offline': !server.online}" >
              {{ status(server.online) }}
            </span>
          </p>
          <button class="Update" @click="this.$router.push({name : 'home'})">Chat</button>
        </div>
        <div class="Description">
          <p>{{ server.description }}</p>
        </div>
        <div class="Status" >
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
      <h2>You don't own any servers</h2>
    </div>
      
</template>
  
<script>
  import backbutton from '@/components/backbutton.vue';
  import {fetch_game ,fetch_servers} from '@/utils/apiFunctions';
  import {get_server_status} from '@/utils/statusFunctions';
  import search from '@/components/search.vue'
  import { stock,get } from '@/utils/storageFunctions';
  import loading from '@/components/loading';
  import {get_user_information} from '@/utils/apiFunctions';


  export default{
  
    components:{
      backbutton,
      search,
      loading,
    },
    async created(){
      //Display the loading page
      this.$store.commit('display_loading_message')

      this.user = await get_user_information()
      await fetch_servers(this)
      await get_server_status(this)

      //Hide THe Loading Page
      this.$store.commit('display_loading_message')
    },
    data(){
      return {
        servers:{},
        user:{},
        game:{
          name:'MineCraft'
        },
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
        if(filtred_servers) return filtred_servers.filter(server => server.user_id == this.user.id)
      
      }
    }
  }
  
</script>
  
<style lang="scss" scoped>
    
  // Define colors used in the style
  $primary-color: #0077ff;
  $secondary-color: #ff6600;
  $tertiary-color: #999999;

  // Define styles for Tools component
  .Tools {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: $primary-color;

    a {
      display: inline-block;
      padding: 0.5rem;
      background-color: $secondary-color;
      color: white;
      border-radius: 4px;
      transition: all 0.3s ease;

      &:hover {
        background-color: darken($secondary-color, 10%);
      }
    }

    button {
      background-color: transparent;
      color: white;
      border: 2px solid white;
      border-radius: 4px;
      padding: 0.5rem;
      transition: all 0.3s ease;

      &:hover {
        background-color: white;
        color: $primary-color;
      }
    }
  }

  // Define styles for Servers component
  .Servers {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;

    .Server {
      background-color: #222;
      transition: all 0.3s ease;

      border-radius: 10px;
      margin-bottom: 20px;
      padding: 20px;
      width: 300px;

      &:hover {
        // transform: translateY(-5px);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      }
      .Buttons {
      // position: absolute;
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

        .online {
          color: #00ff00;
        }

        .offline {
          color: #ff0000;
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

  // Define styles for no servers message
  h2 {
    color: black;
    text-align: center;
    margin-top: 2rem;
  }
</style>