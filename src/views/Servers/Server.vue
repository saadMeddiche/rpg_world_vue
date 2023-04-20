<template>
    <div class="Title">
        <div class="Tit">
            <a class="switchPageButton" @click="switch_page($event)">News</a>
            <h1>{{ server.name }}</h1>
        </div>
        
        <backbutton></backbutton>
    </div>
    <div v-if="chat_page">
        <room reference="messages"></room>
    </div>
    <div v-else>
        <room reference="announces"></room>
    </div>
    
</template>
<script>

    import backbutton from '@/components/backbutton.vue';
    import room from '@/components/room.vue';
    import {fetch_server} from '@/utils/apiFunctions';

    export default{
        components:{
            backbutton,
            room
        },
        created(){
            fetch_server(this)
            
        },
        data(){
            return{
                server:'',
                chat_page:true
            }
        },
        methods:{
            switch_page(e){
                e.target.innerHTML = (e.target.innerHTML == 'News') ? 'Chat' : 'News'
                this.chat_page = this.chat_page ? false : true
            }
        },
    }
</script>

<style lang="scss" scoped>

  $primary-color: #0077ff;
  $secondary-color: #ff6600;
  $tertiary-color: #999999;

.Title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    padding-top: 0;
    padding-bottom: 0;
    background-color: $primary-color;

    .Tit{
        display: flex;
        align-items: center;
        gap:10px
    }


    a {
      display: inline-block;
      padding: 0.5rem;
      background-color: $secondary-color;
      color: white;
      border-radius: 4px;
      transition: all 0.3s ease;
      cursor: pointer;

      &:hover {
        background-color: darken($secondary-color, 10%);
      }
    }
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
</style>