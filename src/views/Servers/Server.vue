<template>
    <div class="Title">
        <h1>{{ server.name }}</h1>
        <button class="switchPageButton" @click="switchPage($event)">News</button>
        <backbutton></backbutton>
    </div>
    
    <div v-if="chat_page">
        <div class="BoxOfChat" ref="chatBox">
            <p class="showmore" @click="showMore" v-if="messages.length != loaded_messages.length">show more</p>   
            <div class="Message" v-for="(message,key) in loaded_messages" :key="key">
                <div class="Sender">
                    <p>{{ message.username }}</p>
                </div>
                <div class="Content">
                    <p>{{message.content}}</p>
                </div>
            </div>
        </div>

        <div class="FieldOfMessage">
            <input type="text" v-model="message_in_field">
            <button @click="send_message">send</button>
        </div>
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
    import firebase from '@/firebase.js';
    import backbutton from '@/components/backbutton.vue'

    export default{
        created(){
            this.get_server()
        },
        mounted(){
            this.fetch_messages()
        },
        components:{
            backbutton,
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
            get_server(){
                this.server = this.$store.state.clicked_server
            },
            fetch_messages(){

                let messageRef = firebase.database().ref("messages"+this.server.id)

                messageRef.on('value',snapshot =>{

                    let data = snapshot.val();
                    let messages = [];

                    if(data){
                        Object.keys(data).forEach(key =>{
                            messages.push({
                                id:key,
                                username: data[key].username,
                                content: data[key].content
                            })
                        })

                        //stock messages
                        this.messages = messages

                        //display only the last 5 messages
                        this.loaded_messages = this.messages.slice(-5)

                        //Update the scroll height of the chat box
                        this.update_scroll_height(this.$refs.chatBox)
                        
                    }
                
                })
            },
            send_message(){
                let messageRef = firebase.database().ref("messages"+this.server.id)

                if(this.message_in_field == '' || this.message_in_field == null){
                    return;
                }

                const message = {
                    username:'Saad Meddiche',
                    content:this.message_in_field
                }

                messageRef.push(message)

                this.message_in_field=""
            },
            update_scroll_height(element){
                //source:: https://stackoverflow.com/questions/47634258/what-is-nexttick-and-what-does-it-do-in-vue-js
                this.$nextTick(() => {
                    if(element != null && element)
                        element.scrollTop = element.scrollHeight;
                });
            },
            showMore() {
                const endIndex = this.loaded_messages.length + 5;
                this.loaded_messages = this.messages.slice(-endIndex);
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

.BoxOfNews,
.BoxOfChat {
  border: 1px solid $secondary-color;
  border-radius: 4px;
  padding: 1rem;
  height: 400px;
  overflow-y: scroll;
  margin-bottom: 1rem;
}
.Announce,
.Message {
  display: flex;
  flex-direction: column;

  .Sender {
    align-self: flex-start;
    font-weight: bold;
  }

  .Content {
    text-align: start;
    word-wrap: break-word;
    width: 90%;
    background-color: $secondary-color;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    margin-bottom: 0.5rem;
  }
}
.FieldOfAnnounce,
.FieldOfMessage {
  display: flex;
  align-items: center;

  input[type="text"] {
    flex: 1;
    border: 1px solid $secondary-color;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    margin-right: 1rem;
  }

  button {
    background-color: $primary-color;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: darken($primary-color, 10%);
    }
  }
}







</style>