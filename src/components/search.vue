<template>
    <div class="Sheach">
      <input type="text" name="" id="" v-model="looking_for">
      <button @click="Clear">X</button>
    </div>
</template>

<script>
    export default{
       
        data(){
            return {
                looking_for:''
            }
        },
        props:[
            'object'
        ],
        watch:{
            wanted_object(){
                this.filtre()
            },
            wanted_looking_for(){
                this.filtre()
            }
        },
        methods:{
            Clear(){
                this.looking_for = ''
            },
            filtre(){
                if(this.object){
                    let data =this.object.filter(item => item.name.toLowerCase().includes(this.looking_for.toLowerCase()))
                    this.$store.commit('store_filtred_object',data)
                }  
            }
        },
        computed:{
            wanted_object(){
                if(this.object) return this.object
            },
            wanted_looking_for(){
                return this.looking_for
            }
        }
    }

</script>

<style lang="scss" scoped>
.Sheach {
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  input {
    flex: 1;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
  }

  button {
    margin-left: 10px;
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: #ccc;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
  }
}
</style>