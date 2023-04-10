<template>
    <div class="Button">
        <button @click="go_back()">Back</button>
    </div>
</template>

<script>
    export default{
       
        methods:{
            go_back(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style lang="scss" scoped>
    button{
        width: 100%;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
        font-size: 16px;
        box-sizing: border-box;
        background-color:#007bff;
        color:white;
        cursor: pointer;
    }
</style>