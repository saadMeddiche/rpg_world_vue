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
            <a class="Delete" @click="delete_server(server.id)">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:20px;">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </a>
            <a class="Update" @click="edit_server(server.id)">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:20px;">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            </a>
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
          <router-link :to="{name :'Server'}" class="Chat">Chat</router-link>
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
  import {fetch_servers} from '@/utils/apiFunctions';
  import {get_server_status} from '@/utils/statusFunctions';
  import search from '@/components/search.vue'
  import { stock } from '@/utils/storageFunctions';
  import loading from '@/components/loading';
  import {get_user_information , destory} from '@/utils/apiFunctions';


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
      test(ss){
        alert(ss)
      },
      status(status){
        return status ? 'Online' : 'Offline';
      },
      players(OnlinePlayers,MaxPlayers){
        return OnlinePlayers != null  && MaxPlayers  ? OnlinePlayers+' / '+MaxPlayers : 'Unkown'
      },
      display_server_content(id){
        stock('server' , id)
        this.$router.push({name : 'Server'})
      },
      edit_server(id){
        stock('server',id)
        this.$router.push({name : 'UpdateServer_User'})
      },
      async delete_server(server_id){
        await destory(server_id , 'servers',this)
        fetch_servers(this)

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
      position: relative;
  
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
      position: absolute;
      top: 0;
      left:0;
      display: flex;
      justify-content: space-between;
      width: 320px;
      padding: 10px;
      
      .Delete {
        color: white;
        background-color: rgb(125, 14, 14);
        border: 4px solid rgb(125, 14, 14);
        border-radius: 5px;
        padding: 5px 10px;
        font-size: 14px;
        cursor: pointer;
        
        &:hover {
          background-color: white;
          color: rgb(125, 14, 14);
        }
      }
      
      .Update {
        color: white;
        border: 4px solid rgb(201, 155, 6);
        border-radius: 5px;
        padding: 5px 10px;
        font-size: 10px;
        cursor: pointer;
        background-color: rgb(201, 155, 6);

        
        &:hover {
          background-color: white;
          color: rgb(201, 155, 6);
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

        .Chat{
          text-decoration: none;
          color: $secondary-color;
          background-color: white;
          border: 1px solid $secondary-color;
          border-radius: 5px;
          padding: 5px 10px;
          font-size: 14px;
          cursor: pointer;
          
          &:hover {
            background-color: $secondary-color;
            color: white;
          }
        }

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