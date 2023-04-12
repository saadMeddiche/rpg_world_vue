<template>
    <h1>{{ server.name }}</h1>
    <div class="BoxOfChat" ref="chatBox">
        <p class="showmore" @click="showMore">show more</p>   
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

</template>
<script>
    import firebase from '@/firebase.js';

    export default{
        created(){
            this.get_server()
        },
        mounted(){

            let messageRef = firebase.database().ref("messages")

            messageRef.on('value',snapshot =>{

                let data = snapshot.val();
                let messages = [];

                Object.keys(data).forEach(key =>{
                    messages.push({
                        id:key,
                        username: data[key].username,
                        content: data[key].content
                    })
                })
                

                this.messages = messages
                this.loaded_messages = this.messages.slice(-5)

               //source:: https://stackoverflow.com/questions/47634258/what-is-nexttick-and-what-does-it-do-in-vue-js
                this.$nextTick(() => {
                    const chatBox = this.$refs.chatBox;
                    if(chatBox)
                        chatBox.scrollTop = chatBox.scrollHeight;
                });
            })

        },
        data(){
            return{
                server:'',
                message_in_field:'',
                messages:{},
                loaded_messages:[]
            }
        },
        methods:{
            get_server(){
                this.server = this.$store.state.clicked_server
            },
            send_message(){
                let messageRef = firebase.database().ref("messages")

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
            showMore() {
                const endIndex = this.loaded_messages.length + 5;
                this.loaded_messages = this.messages.slice(-endIndex);
            }

        },

    }
</script>

<style lang="scss" scoped>

$primary-color: #3f51b5;
$secondary-color: #e0e0e0;
.showmore{
    cursor: pointer;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.BoxOfChat {
  border: 1px solid $secondary-color;
  border-radius: 4px;
  padding: 1rem;
  height: 400px;
  overflow-y: scroll;
  margin-bottom: 1rem;
}

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