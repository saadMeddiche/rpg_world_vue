<template>
    <div class="Title">
        <h1>Update Game</h1>
        <backbutton></backbutton>
    </div>
    <div class="Errors">
        <div class="Error" v-for="(error , key) in errors" :key="key">
            <p> {{ error[0] }}</p>
        </div>
    </div>
    <div class="Success_Message" v-show="show_success_message">
        <p>Game Updated Successfuly</p>
    </div>
    <div class="Game">
        <div class="Name">
            <input type="text" name="" id="" v-model="game.name" placeholder="Name ...">
        </div>
        <div class="Description">
            <textarea name="" id="" cols="30" rows="10" v-model="game.description" placeholder="Description ..."></textarea>
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
                game:{
                    name:'',
                    description:'',
                    image:'',
                    method:'put'
                },
                errors:null,
                show_success_message:false
            }
        },
        created(){
            this.get_game()
        },
        methods:{
            Update(){
                const config = {
                    headers: { 'content-type': 'multipart/form-data' },
                }
                axios.post('http://127.0.0.1:8000/api/V1/games/' + this.game.id , this.game, config )
                    .then( (responce) => this.success_message(responce))
                    .catch( (AxiosError) => this.display_errors(AxiosError.response.data.errors))
            
            },
            get_game(){
                let game_id = this.get_game_id()
                axios.get('http://127.0.0.1:8000/api/V1/games/'+game_id)
                    .then((request) => this.game = request.data.game)
                    .then((res) => this.game.image = '' )
            },
            get_game_id(){
                return localStorage.getItem('game')
            },
            display_errors(errors){

                this.errors = errors

                setTimeout(() => {
                    this.errors = ''
                }, 5000)
            },
            success_message(responce){
                // console.log(responce);
                this.show_success_message = true

                setTimeout(() => {
                   this.$router.push({name : 'Games'})
                }, 2000)
            },
            onFileSelected(){
                this.game.image = this.$refs.fileInput1.files[0]
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
.Game {
display: flex;
flex-direction: column;
align-items: center;
margin: 0 auto;
max-width: 600px; // adjust as needed

.Name,
.Description,
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