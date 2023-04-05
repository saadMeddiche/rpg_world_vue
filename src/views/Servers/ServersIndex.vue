<template>
    <h1>Servers</h1>
    <div class="Sheach">
        <input type="text" name="" id="" v-model="looking_for">
        <button @click="Clear">X</button>
    </div>
    <div class="Games" v-if="servers">
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
</template>

<script>

    export default{
        data(){
            return {
                servers:{},
                game_id:null,
                looking_for:'',
            }
        },
        methods:{
            fetch_games(){
                axios.get('http://127.0.0.1:8000/api/V1/servers')
                    .then((responce) => this.servers = responce.data.servers)
            },
            Clear(){
                this.looking_for = ''
            }
        },
        created(){
            this.game_id = this.$store.state.clicked_game.slice();
            this.fetch_games()
        },
        computed:{
            filtredServers(){
                return this.servers.filter(server => server.name.toLowerCase().includes(this.looking_for.toLowerCase()) && server.game_id == this.game_id)
            }
        }
    }

</script>

<style>

</style>