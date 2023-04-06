<template>
  <navbar v-if="show_navbar" />
  <router-view/>
  
</template>
<script>
  import navbar from '@/components/navebar.vue'
  import Dashboard from '@/views/Admin/Dashboard.vue'

  export default{
    components:{
      navbar,
      Dashboard
    },
    data(){
      return{
        show_navbar:true
      }
    },
    watch:{
      $route(){
        this.show_navbar = (this.$route.name == 'Dashboard') ? false : true
      }
    }
  }

</script>
<style lang="scss">

  @use "@/assets/scss/inc/_navebar.scss";

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  nav {
    padding: 30px;
  }

  nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  nav a.router-link-exact-active {
    color: #42b983;
  }


</style>
