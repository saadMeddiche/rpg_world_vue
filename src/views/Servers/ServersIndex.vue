<template>
    <h1>{{game.name}} Servers</h1>
    <div class="Sheach">
        <input type="text" name="" id="" v-model="looking_for">
        <button @click="Clear">X</button>
    </div>
    <div class="Games" v-if="filtredServers.length">

        <div class="Game" v-for="server in filtredServers" :key="server">
            <div class="Image">
                <img :src=" 'http://localhost/RPG_World_Laravel/public/uploads/games/' + server.image" alt="">
            </div>
            <div class="Title">
                <p>{{server.name}}</p>
            </div>
            <div class="Description">
                <p>{{ server.description }}</p>
            </div>
        </div>
    </div>
    <div v-else>
        <h2>There is No Servers For This Game Yet</h2>
        <h4>Be The First Who add its Own Server</h4> 
    </div>
</template>

<script>
    import axios from 'axios';

    export default{
        data(){
            return {
                servers:{},
                game:null,
                looking_for:'',
            }
        },
        methods:{
            fetch_servers(){
                axios.get('http://127.0.0.1:8000/api/V1/servers')
                    .then((responce) => this.servers = responce.data.servers)
            }
            ,
            Clear(){
                this.looking_for = ''
            }
        },
        created(){
            this.game = this.$store.state.clicked_game;
            this.fetch_servers()
        },
        computed:{
            filtredServers(){
                return this.servers.filter(server => server.name.toLowerCase().includes(this.looking_for.toLowerCase()) && server.game_id == this.game.id)
            }
        }
    }

</script>

<style>

</style>