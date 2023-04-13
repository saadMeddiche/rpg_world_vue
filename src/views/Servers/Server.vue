<template>
    <div class="Title">
        <h1>{{ server.name }}</h1>
        <button class="switchPageButton" @click="switchPage($event)">News</button>
        <backbutton></backbutton>
    </div>
    
    <div v-if="chat_page">
        <chat></chat>
    </div>
    <div v-else>
        <div class="BoxOfNews">
            <p class="showmore">show more</p>   
            <div class="Announce">
                <div class="Sender">
                    <p>Admin</p>
                </div>
                <div class="Content">
                    <p>ToDay will be an event at 10:00</p>
                </div>
            </div>
        </div>
        <div class="FieldOfAnnounce">
            <input type="text" v-model="message_in_field">
            <button >send</button>
        </div>
    </div>
    

</template>
<script>
    import axios from 'axios';
    import firebase from '@/firebase.js';
    import backbutton from '@/components/backbutton.vue';
    import chat from '@/components/chat.vue';
    export default{
        created(){
            this.fetch_server()
        },
        components:{
            backbutton,
            chat
        },
        data(){
            return{
                server:'',
                message_in_field:'',
                messages:{},
                loaded_messages:[],
                chat_page:true
            }
        },
        methods:{
            fetch_server(){
                //get the server id from local storage
                let server_id = localStorage.getItem('server')
                axios.get('http://127.0.0.1:8000/api/V1/servers/'+server_id)
                    .then((request) => this.server = request.data.server)    
                    .then((res) => this.fetch_messages())        
            },
            switchPage(e){
                e.target.innerHTML = (e.target.innerHTML == 'News') ? 'Chat' : 'News'
                this.chat_page = this.chat_page ? false : true
            }

        },

    }
</script>

<style lang="scss" scoped>

$primary-color: #3f51b5;
$secondary-color: #e0e0e0;

.Title{
    display: flex;
    justify-content: center;
    align-items: center;
    gap:10px;
}
.showmore{
    cursor: pointer;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
</style>