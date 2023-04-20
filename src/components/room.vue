<template>
    <div class="BoxOfChat" ref="chatBox">
        <p class="showmore" @click="show_more" v-show="display_show_more_button">show more</p>
        <p v-if="!messages.length">No Messages Yet</p>
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
    import {chat_show_more , chat_send_message, chat_fetch_messages} from '@/utils/chatFunctions';
    import {fetch_server} from '@/utils/apiFunctions';


   export default{
        async mounted(){
            this.$store.commit('display_loading_message')

            await fetch_server(this)
            await this.fetch_messages()

        },
        data(){
            return{
                server:'',
                message_in_field:'',
                messages:{},
                loaded_messages:[],
            }
        },
        props:[
            'reference'
        ],
        methods:{
            async fetch_messages(){
                chat_fetch_messages(this , this.reference)
            },
            send_message(){
                chat_send_message(this , this.reference)
            },
            show_more(){
                chat_show_more(this.loaded_messages , this.messages , this)
            }

        },
        computed:{
            display_show_more_button(){
                return (this.messages.length != this.loaded_messages.length && this.messages.length) ? true : false
            }
        }

    }
</script>

<style lang="scss" scoped>
$primary-color: #3f51b5;
$secondary-color: #e0e0e0;


.showmore{
    cursor: pointer;
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