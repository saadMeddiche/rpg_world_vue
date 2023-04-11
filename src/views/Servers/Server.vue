<template>
    <h1>{{ server.name }}</h1>
    <h4>{{ message_in_field }}</h4>
    <div class="BoxOfChat">
        <div class="Message">
            <div class="Sender">
                <p>Saad Meddiche</p>
            </div>
            <div class="Content">
                <p>Hiii,Lucas How are You my Friend</p>
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
        data(){
            return{
                server:'',
                message_in_field:''
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
            }
        }
    }
</script>

<style lang="scss" scoped>
$primary-color: #0080ff;
$secondary-color: #f2f2f2;

.BoxOfChat {
  border: 1px solid $primary-color;
  padding: 10px;
  background-color: $secondary-color;

  .Message {
    margin-bottom: 10px;

    .Sender {
      font-weight: bold;
    }
  }
}

.FieldOfMessage {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;

  input[type="text"] {
    padding: 10px;
    border: none;
    border-radius: 5px;
    flex: 1;
    margin-right: 10px;
  }

  button {
    background-color: $primary-color;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: darken($primary-color, 10%);
    }
  }
}

</style>