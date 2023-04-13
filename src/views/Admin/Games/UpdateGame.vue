<template>
    <div class="Title">
        <h1>Update Game</h1>
        <backbutton></backbutton>
    </div>

    <errors></errors>

    <successMessage :message="success_message"></successMessage>

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
            <button @click="modify_game()">Update</button>
        </div>
    </div>
</template>

<script>
    import backbutton from '@/components/backbutton.vue';
    import { fetch_game,update_game } from '@/utils/apiFunctions';
    import errors from '@/components/errors.vue';
    import successMessage from '@/components/successMessage.vue';


    export default{
        components:{
            backbutton,
            errors,
            successMessage
        },
        async created(){
            await fetch_game(this)
            this.game.image = ''
        },
        data(){
            return {
                game:{
                    name:'',
                    description:'',
                    image:'',
                    method:'put'
                },
                success_message:'Game Updated Successfuly'
            }
        },
        methods:{
            modify_game(){
                update_game(this)
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