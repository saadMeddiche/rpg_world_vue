<template>
    <div class="Register">
       <div v-for="(error , key) in errors" :key="key" class="Errors">{{ error[0] }}</div>
       <div v-if="message" class="Success_Message">{{ message }}</div>
      <form @submit.prevent="Register" class="Register-Form" action="">
        <input class="Name" type="text" placeholder="Enter Your Name" v-model="form.name" >
        <input class="Email" type="email" placeholder="Enter Your Email" v-model="form.email" >
        <input class="Password" type="password" placeholder="Enter Your Password" v-model="form.password" >
        <button class="Register-Button">Register</button>
      </form>
    </div>
</template>

<script>
import axios from 'axios';

export default{
    data(){
        return {
            form:{
                name:'',
                email:'',
                password:''
            },
            errors:[],
            message:null 
        }
    },
    methods:{
        Register(){
          
            axios.post('http://127.0.0.1:8000/api/V1/register',this.form)
                .then(() => 
                    this.display_success_message()
                )
                .catch(AxiosError => {
                    this.display_errors(AxiosError.response.data.errors)
                })
        },
        display_errors(errors){
            this.errors = errors
        },
        display_success_message(){
            const test = this;
            this.errors = [];
            this.message = 'Account Has Been Created Successfuly';
            setTimeout(function () {
              test.$router.push({ path: '/login' })
            }, 2000);

        }
    }
}
</script>

<style lang="scss">
 .Register {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin: 22vh auto;

  .Errors {
    color: red;
    font-size: 14px;
    margin-bottom: 10px;
  }

  .Success_Message {
    color: green;
    font-size: 14px;
    margin-bottom: 10px;
  }

  .Register-Form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    width: 100%;

    .Name,
    .Email,
    .Password {
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      border: none;
      border-radius: 5px;
      background-color: #f7f7f7;

      &:focus {
        outline: none;
        box-shadow: 0px 0px 5px #333;
      }

      &::placeholder {
        color: #333;
        opacity: 0.6;
      }
    }

    .Register-Button {
      width: 100%;
      padding: 10px;
      border: none;
      border-radius: 5px;
      background-color: #333;
      color: #fff;
      font-size: 16px;
      cursor: pointer;

      &:hover {
        background-color: #444;
      }

      &:active {
        background-color: #222;
      }
    }
  }

  // Responsive styles
  @media (min-width: 768px) {
    .Register-Form {
      max-width: 400px;
    }
  }
}


</style>
