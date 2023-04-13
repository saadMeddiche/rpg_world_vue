<template>
    <div class="Success_Message" v-show="show_success_message">
        <p v-if="message">{{message}}</p>
        <p v-else>Done !!</p>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                show_success_message:false,
            }
        },
        props: [
            'message',
            'path'
        ],
        watch:{
            status_message(){
                this.success_message()
            }
        },
        methods:{
            success_message(){
                this.show_success_message = this.$store.state.show_success_message

                setTimeout(() => {
                    if(this.path){
                        this.$router.push({name : this.path})
                    }else{
                        this.$router.go(-1)
                    }

                    
                }, 2000)
            }
        },
        computed:{
            status_message(){
                return this.$store.state.show_success_message
            }

        }

    }
</script>

<style lang="scss" scoped>
    .Success_Message {

        background-color: rgba(0, 255, 0, 0.8);
        color: white;
        font-weight: bold;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 10px;

    }
</style>