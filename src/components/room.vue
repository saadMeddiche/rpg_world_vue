<template>
    <div class="BoxOfChat" ref="chatBox">
        <p class="showmore" @click="show_more" v-show="display_show_more_button">Show more</p>
        <p class="NoneYet" v-if="!messages.length">No {{reference}} Yet</p>
        <div class="Message" v-for="(message,key) in loaded_messages" :key="key">
            <div class="Sender">
                <p>{{ message.username }}</p>
            </div>
            <div class="Content">
                <p>{{message.content}}</p>
            </div>
        </div>
    </div>

    <div class="FieldOfMessage" v-if="show_field">
        <input type="text" v-model="message_in_field" placeholder="Message...">
        <button @click="send_message">send</button>
    </div>
</template>

<script>
    import {chat_show_more , chat_send_message, chat_fetch_messages} from '@/utils/chatFunctions';
    import {fetch_server ,get_user_information} from '@/utils/apiFunctions';


   export default{
        async mounted(){
            this.$store.commit('display_loading_message')

            this.user =  await get_user_information()
            await fetch_server(this)
            this.check_owner_ship()
            await this.fetch_messages()
            

        },
        data(){
            return{
                user:{},
                server:'',
                message_in_field:'',
                show_field:false,
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
            },
            check_owner_ship(){

                if(this.reference == 'announces'){
                    if(this.user.id ==  this.server.user_id){
                        this.show_field = true
                    }
                }else{
                    this.show_field = true
                }
                
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
  $primary-color: #0077ff;
  $secondary-color: #ff6600;
  $thirdly-color: #999999;
  $fourthly-color: #e0e0e0;



.showmore{
    border-top: 1px solid $fourthly-color;
    border-bottom: 1px solid $fourthly-color;
    animation: ellipsis 1s infinite;
    cursor: pointer;

    @keyframes ellipsis {
        0% {
            opacity: 0.2;
        }
        100% {
            opacity: 1;
        }
    }

    p{
        margin: 0px;
    }
}

.NoneYet{
    border-top: 1px solid $fourthly-color;
    border-bottom: 1px solid $fourthly-color;
    cursor: pointer;
    animation: ellipsis 1s infinite;

    @keyframes ellipsis {
        0% {
            opacity: 0.2;
        }
        100% {
            opacity: 1;
        }
    }

    p{
        margin: 0px;
    }

}
.BoxOfChat {
  border: 1px solid $primary-color;
  border-radius: 4px;
  padding: 1rem;
  height: 400px;
  overflow-y: scroll;
  margin-bottom: 1rem;
}

.Message {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  .Sender {
    align-self: flex-start;
    font-weight: bold;

    p{
        margin: 0px;
    }
  }

  .Content {
    text-align: start;
    word-wrap: break-word;
    width: fit-content;
    background-color: $fourthly-color;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    margin-bottom: 0.5rem;
    border:2px solid $secondary-color;

    p{
        margin:0px;
    }
  }
}

.FieldOfMessage {
  display: flex;
  align-items: center;
  margin: 15px;

  input{
    flex: 1;
    border: 1px solid $primary-color;
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