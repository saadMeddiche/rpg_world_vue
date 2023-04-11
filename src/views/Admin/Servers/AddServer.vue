<template>
    <div class="Title">
        <h1>Add Server</h1>
        <backbutton></backbutton>
    </div>
    <div class="Errors">
        <div class="Error" v-for="(error , key) in errors" :key="key">
            <p> {{ error[0] }}</p>
        </div>
    </div>
    <div class="Success_Message" v-show="show_success_message">
        <p>Server Created Successfuly</p>
    </div>
    <div class="Server">
        
        <div class="Game">
            <select type="text" class="SelectGame" v-model="server.game_id">
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
            <input type="file" name="" id="" @change="onFileSelected" ref="fileInput">
        </div>
        <div class="Insert">
            <button @click="Insert()">Add</button>
        </div>
    </div>
    
</template>

<script>
    import axios from 'axios';
    import backbutton from '@/components/backbutton.vue'


    export default{
        components:{
            backbutton,
        },
        created(){
            this.fetch_games()
        },
        data(){
            return {
                server:{
                    name:'',
                    description:'',
                    address:'',
                    image:'',
                    game_id:'',
                    method:'post'
                },
                games:{},
                errors:null,
                show_success_message:false
            }
        },
        methods:{
            Insert(){
                //source :https://www.itsolutionstuff.com/post/laravel-vue-js-image-upload-example-with-demoexample.html
                const config = {
                    headers: { 'content-type': 'multipart/form-data' }
                }

                axios.post('http://127.0.0.1:8000/api/V1/servers', this.server, config)
                    .then( (responce) => this.success_message(responce))
                    .catch( (AxiosError) => this.display_errors(AxiosError.response.data.errors))
            },
            onFileSelected(){
                this.server.image = this.$refs.fileInput.files[0]
            },
            display_errors(errors){

                this.errors = errors

                setTimeout(() => {
                    this.errors = ''
                }, 5000)
            },
            success_message(responce){
                console.log(responce)
                this.show_success_message = true

                setTimeout(() => {
                   this.$router.push({name : 'Servers'})
                }, 2000)
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

.SelectGame {
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
  .Insert {
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