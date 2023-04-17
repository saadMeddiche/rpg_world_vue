<template>
  
  
  <navbar v-show="show_navbar"/>
  <router-view v-if="show_navbar"/>

  <loading></loading>
  
  <div v-if="!show_navbar" class="admin-layout">
    <sidebar />
    <div class="admin-content">
      <router-view />
    </div>
  </div>
  
  
</template>
<script>
  import navbar from '@/components/navebar.vue'
  import sidebar from '@/components/Admin/sidebar.vue'
  import loading from '@/components/loading'

  export default{
    components:{
      navbar,
      sidebar,
      loading,
    },
    data(){
      return{
        show_navbar:true
      }
    },
    watch:{
      $route(){
        this.show_navbar = (this.$route.meta.status != 'admin') ? true : false;
        
        (this.show_navbar == true) ? document.body.style.margin = '8px': document.body.style.margin = '0px';
      }
    }
  }
</script>
<style lang="scss" >


  body{
    margin:0px !important;
  }
  
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin:0px;
  }
  

</style>
