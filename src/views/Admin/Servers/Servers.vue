<template>
    <h1>Show Servers</h1>
    <router-link :to="{name : 'AddServer'}"><button class="Add-Button">Add Server</button></router-link>
    <search :object="servers"></search>
    <div class="Servers" v-if="servers.length">
      <div class="Server" v-for="(server, key) in filtredServers" :key="key">
          <div class="Buttons">
              <button class="Delete" @click="delete_server(server.id)">Delete</button>
              <button class="Update" @click="edit_server(server.id)">Update</button>
          </div>
          <div class="Image">
              <img :src="$imagePath+server.image" alt="">
          </div>
          <div class="Name">
              <p>{{ server.name }}</p>
          </div>
      </div>
    </div>
  </template>
  
<script>
  import { fetch_servers,destory } from '@/utils/apiFunctions';
  import { stock } from '@/utils/storageFunctions';
  import search from '@/components/search.vue';
  
  export default{
    components:{
      search,
    },
    created(){
      fetch_servers(this)
    },
    data(){
      return {
        servers:{},
        looking_for:''
      }
    },
    methods:{
      async delete_server(server_id){

        await destory(server_id , 'servers')
        fetch_servers(this)

      },
      edit_server(id){

        stock('server',id)
        this.$router.push({name : 'UpdateServer'})

      }
    },
    computed:{
      filtredServers(){
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
  
  .Servers {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 20px;
    
    .Server {
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