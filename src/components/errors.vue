<template>
    <div class="Errors">
        <div class="Error" v-for="(error , key) in errors" :key="key">
            <p> {{ error[0] }}</p>
        </div>
    </div>
</template>

<script>
    export default{
       
       data(){
            return{
                errors:null
            }
        }, 
        watch:{
            get_errors(){
                this.display_errors()
            }
        },
        methods:{
            display_errors(){

                this.errors = this.$store.state.errors

                setTimeout(() => {
                    this.errors = ''
                }, 5000)
            }
        },
        computed:{
            get_errors(){
                return this.$store.state.errors
            } 
        }
    }
</script>

<style lang="scss" scoped>
    
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
</style>