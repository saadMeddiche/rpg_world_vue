<template>

    <div class="Title">
        <h1>Update Server</h1>
        <backbutton></backbutton>
    </div>
    <errors/>
    <successMessage :message="success_message"></successMessage>
    <div class="Server">
        <div class="Game">
            <select type="text" class="SelectServer" v-model="server.game_id">
                <option v-for="(game,key) in games" :key="key" :value="game.id">{{ game.name }}</option>
            </select>
        </div>
        <div class="Name">
            <input type="text" name="" id="" v-model="server.name" placeholder="Name ...">
        </div>
        <div class="Description">
            <textarea name="" id="" cols="30" rows="10" v-model="server.description" placeholder="Description ..."></textarea>
        </div>
        <div class="Adress">
            <input type="text" v-model="server.address" placeholder="Adress ... (optionel)">
        </div>
        <div class="Image">
            <input type="file" name="" id="" @change="onFileSelected" ref="fileInput1">
        </div>
        <div class="Update">
            <button @click="modify_server()">Update</button>
        </div>
    </div>
</template>

<script>
    import backbutton from '@/components/backbutton.vue';
    import {update_server,fetch_server,fetch_games} from '@/utils/apiFunctions';
    import errors from '@/components/errors.vue';
    import successMessage from '@/components/successMessage.vue';



    export default{
        components:{
            backbutton,
            errors,
            successMessage
        },
        async created(){
            this.$store.commit('display_loading_message')
            await fetch_server(this)
            this.server.image = ''
            await fetch_games(this)
            this.$store.commit('display_loading_message')


        },
        data(){
            return {
                server:{
                    name:'',
                    description:'',
                    address:'',
                    image:'',
                    game_id:'',
                    method:'put'
                },
                games:{},
                success_message:'Server Updated Successfuly'

            }
        },
        methods:{
            modify_server(){
                update_server(this)
            },
            onFileSelected(){
                this.server.image = this.$refs.fileInput1.files[0]
            }
        }
    }
</script>

<style lang="scss" scoped>

.Title{
    display: flex;
    justify-content: center;
    align-items: center;
    gap:10px;
}

.SelectServer {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
    box-sizing: border-box;
}

.Server {
display: flex;
flex-direction: column;
align-items: center;
margin: 0 auto;
max-width: 600px; // adjust as needed

.Game,
.Name,
.Description,
.Adress,
.Image,
.Update {
  width: 100%;
  margin-bottom: 20px;

  input,
  textarea,
  button {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
    box-sizing: border-box;
  }
}

button {
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

@media (max-width: 768px) {
  max-width: 100%;
  margin: 0 20px;
}
}
</style>