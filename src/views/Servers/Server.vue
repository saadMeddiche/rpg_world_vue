<template>
    <h1>{{ server.name }}</h1>
</template>
<script>
    export default{
        created(){
            this.get_server()
        },
        data(){
            return{
                server:'',
            }
        },
        methods:{
            get_server(){
                this.server = this.$store.state.clicked_server
            }
        }
    }
</script>

<style>

</style>