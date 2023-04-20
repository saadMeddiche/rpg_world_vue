<template>
    <div class="admin-sidebar">
        <ul>
            <li v-for="(Menu , key) in Menus" :key="key">
                <router-link :to="{name : key}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" v-html="Menu.icon"></svg>
                    {{Menu.name}}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
  export default{
    data(){
      return {
        Menus:{
          'home' : {name:'Home', icon:'<path fill="white" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z"/>'},
          'Dashboard':{name:'Dashboard', icon:'<path fill="white" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2Zm0 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16Zm3.833 3.337a.596.596 0 0 1 .763.067a.59.59 0 0 1 .063.76c-2.18 3.046-3.38 4.678-3.598 4.897a1.5 1.5 0 0 1-2.122-2.122c.374-.373 2.005-1.574 4.894-3.602ZM17.5 11a1 1 0 1 1 0 2a1 1 0 0 1 0-2Zm-11 0a1 1 0 1 1 0 2a1 1 0 0 1 0-2Zm2.318-3.596a1 1 0 1 1-1.414 1.414a1 1 0 0 1 1.414-1.414ZM12 5.5a1 1 0 1 1 0 2a1 1 0 0 1 0-2Z"/>'},
          'Games':{name:'Games', icon:'<path fill="white" d="M14.998 5a7 7 0 0 1 .24 13.996l-.24.004H9.002a7 7 0 0 1-.24-13.996L9.001 5h5.996Zm-.248 7.5a1.25 1.25 0 1 0 0 2.5a1.25 1.25 0 0 0 0-2.5ZM8 9a.75.75 0 0 0-.743.648l-.007.102v1.498h-1.5a.75.75 0 0 0-.102 1.494l.102.007l1.5-.001v1.502a.75.75 0 0 0 1.493.102l.007-.102v-1.502h1.5a.75.75 0 0 0 .102-1.492l-.102-.007l-1.5-.001V9.75A.75.75 0 0 0 8 9Zm8.75 0a1.25 1.25 0 1 0 0 2.5a1.25 1.25 0 0 0 0-2.5Z"/>'},
          'Servers':{name:'Servers', icon:'<path fill="white" d="M0 2C0 .9.9 0 2 0h16a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm0 7c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V9zm0 7c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2zM12 2v2h2V2h-2zm4 0v2h2V2h-2zm-4 7v2h2V9h-2zm4 0v2h2V9h-2zm-4 7v2h2v-2h-2zm4 0v2h2v-2h-2z"/>'},
          'Roles':{name:'Roles', icon:'<path fill="white" d="M19 4h-4.18a3 3 0 0 0-5.64 0H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm-7 0a1 1 0 1 1-1 1a1 1 0 0 1 1-1Zm7 15H5v-4h14Zm0-6H5V9h14Z"/><circle cx="17" cy="11" r="1" fill="white"/><circle cx="14" cy="11" r="1" fill="white"/><circle cx="14" cy="17" r="1" fill="white"/><circle cx="17" cy="17" r="1" fill="white"/><path fill="white" d="M6 10h5v2H6zm0 6h5v2H6z"/>'},
          'Users':{name:'Users', icon:'<path fill="white" d="M16 17v2H2v-2s0-4 7-4s7 4 7 4m-3.5-9.5A3.5 3.5 0 1 0 9 11a3.5 3.5 0 0 0 3.5-3.5m3.44 5.5A5.32 5.32 0 0 1 18 17v2h4v-2s0-3.63-6.06-4M15 4a3.39 3.39 0 0 0-1.93.59a5 5 0 0 1 0 5.82A3.39 3.39 0 0 0 15 11a3.5 3.5 0 0 0 0-7Z"/>'},
        }
      }
    }  
  }
</script>

<style lang="scss">

  $primary-color: #00ff84;
  $secondary-color: #ff6c00;
  $thirdly-color: #e6e6e6;
  $fourthly-color: #0077ff;

 
  .admin-layout {
  display: grid;
  grid-template-columns: 160px;
  grid-template-rows: auto;
  grid-template-areas: "sidebar content";

  .admin-sidebar {
    grid-area: sidebar; 
    background-color: #292929;
    color: #fff;
    padding: 20px;
    height: 100vh; 
    position: fixed; 
    top: 0;
    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;

      li {
        margin-bottom: 10px;

        &:last-child {
          margin-bottom: 0;
        }

        a {
          border-radius: 5px;
          color: #fff;
          text-decoration: none;
          display: block;
          padding: 10px;


          &:hover {
            background-color: $fourthly-color;
          }

          &.router-link-active {
            font-weight: bold;
            background-color: $fourthly-color;
          }
        }
      }
    }
  }

  .admin-content {
    grid-area: content; 
    padding: 20px;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-template-areas: "sidebar" "content";
    

    .admin-sidebar {
      position: static;
      height: auto;
      margin-bottom: 20px;

      ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
    }

    .admin-content {
      margin: 0;
      padding-left: 20px;
      padding-right: 20px;
      box-sizing: border-box;
    }
  }
}

</style>
