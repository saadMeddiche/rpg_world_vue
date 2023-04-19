<template>
    <div class="search">
      <input type="text" name="" id="" v-model="looking_for">
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
                    let data = this.object.filter(item => item.name.toLowerCase().includes(this.looking_for.toLowerCase()))
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

  // Define colors used in the style
  $primary-color: #0077ff;
  $secondary-color: #ff6600;
  $tertiary-color: #999999;

.search {
    margin: 10px;
    // padding: 1rem;

    input {
      width: 80%;
      padding: 0.5rem;
      border-radius: 4px;
      border: 2px solid $tertiary-color;
      font-size: 1.2rem;
      transition: all 0.3s ease;

      &:focus {
        outline: none;
        border-color: $primary-color;
      }
    }
  }
</style>