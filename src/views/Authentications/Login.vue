<template>
    <div class="Login">
        <errors></errors>
      <form @submit.prevent="Login" class="Login-Form" action="">
        <input class="Email" type="email" placeholder="Enter Your Email" v-model="form.email" >
        <input class="Password" type="password" placeholder="Enter Your Password" v-model="form.password" >
        <button class="Login-Button">Login</button>
      </form>
    </div>
</template>

<script>
  import axios from 'axios';
  import errors from '@/components/errors.vue';
  import { stock } from '@/utils/storageFunctions';


  export default{
    components:{
      errors
    },
    data(){
      return {
        form:{
          email:'',
          password:''
        },
        errors:[] 
      }
    },
    methods:{

      Login(){
        axios.post("http://127.0.0.1:8000/api/V1/login",this.form)
          .then( responce => {
            stock('token',responce.data.token)
            this.$router.push('/games')
          })
          .catch(AxiosError => {
            this.$store.commit('add_errors' , AxiosError.response.data.errors)
          })
      }
    }
  }
</script>
  
<style lang="scss">
.Login {
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

  .Login-Form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    width: 100%;

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

    .Login-Button {
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
    .Login-Form {
      max-width: 400px;
    }
  }
}

    

</style>
