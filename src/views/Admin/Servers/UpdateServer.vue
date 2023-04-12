<template>

    <div class="Title">
        <h1>Update Server</h1>
        <backbutton></backbutton>
    </div>
    <div class="Errors">
        <div class="Error" v-for="(error , key) in errors" :key="key">
            <p> {{ error[0] }}</p>
        </div>
    </div>
    <div class="Success_Message" v-show="show_success_message">
        <p>Server Updated Successfuly</p>
    </div>
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
            <button @click="Update()">Update</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import backbutton from '@/components/backbutton.vue'


    export default{
        components:{
            backbutton,
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
                errors:null,
                show_success_message:false
            }
        },
        created(){
            this.get_server()
            this.fetch_games()
        },
        methods:{
            Update(){
                const config = {
                    headers: { 'content-type': 'multipart/form-data' },
                }
                axios.post('http://127.0.0.1:8000/api/V1/servers/' + this.server.id , this.server, config )
                    .then( (responce) => this.success_message(responce))
                    .catch( (AxiosError) => this.display_errors(AxiosError.response.data.errors))
            },
            get_server(){
                let server_id = this.get_server_id()
                axios.get('http://127.0.0.1:8000/api/V1/servers/'+server_id)
                    .then((request) => this.server = request.data.server)
                    .then((res) => this.server.image = '' )
            },
            get_server_id(){
                return localStorage.getItem('server')
            },
            display_errors(errors){

                this.errors = errors

                setTimeout(() => {
                    this.errors = ''
                }, 5000)
            },
            success_message(){
                this.show_success_message = true

                setTimeout(() => {
                   this.$router.push({name : 'Servers'})
                }, 2000)
            },
            onFileSelected(){
                this.server.image = this.$refs.fileInput1.files[0]
            },
            fetch_games(){
                axios.get('http://127.0.0.1:8000/api/V1/games')
                    .then((responce) => this.games = responce.data.games)
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
.Success_Message {

    background-color: rgba(0, 255, 0, 0.8);
    color: white;
    font-weight: bold;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;

}

.SelectServer {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
    box-sizing: border-box;
}

.Errors {
display: flex;
flex-direction: column;
align-items: center;
margin-bottom: 20px;

.Error {
  width: 100%;
  padding: 5px; // decrease padding
  background-color: #dc3545;
  color: #fff;
  border-radius: 5px;
  margin-bottom: 5px; // decrease margin
  text-align: center;
  font-size: 14px; // decrease font size
}
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