<template>
    <div class="Login">
        <div class ="Errors" v-for="(error , key) in errors" :key="key">{{ error[0] }}</div>
      <form @submit.prevent="Login" class="Login-Form" action="">
        <input class="Email" type="email" placeholder="Enter Your Email" v-model="form.email" >
        <input class="Password" type="password" placeholder="Enter Your Password" v-model="form.password" >
        <button class="Login-Button">Login</button>
      </form>
    </div>
</template>

<script>
    import axios from 'axios';


    export default{

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
                        this.stock_token(responce.data.token)
                        this.$router.push('/games')
                    })
                    .catch(AxiosError => {
                        this.display_errors(AxiosError.response.data.errors)
                    })
            },
            display_errors(errors){
                this.errors = errors
            },  
            stock_token(token){
                localStorage.setItem('token',token)
            }
        }
    }
</script>
  
<style lang="scss">
.Login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  .Errors {
    color: red;
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }

  .Login-Form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 400px;
    padding: 2rem;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);

    @media screen and (max-width: 600px) {
      max-width: 90%;
    }
  }

  .Email,
  .Password {
    display: block;
    width: 100%;
    margin-bottom: 1rem;
    padding: 0.5rem;
    font-size: 1.2rem;
    border: 2px solid #ccc;
    border-radius: 5px;
    transition: border-color 0.3s ease-in-out;

    &:focus {
      outline: none;
      border-color: #007bff;
    }
  }

  .Login-Button {
    display: inline-block;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    font-size: 1.2rem;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;

    &:hover {
      background-color: #0062cc;
    }
  }
}

    

</style>
