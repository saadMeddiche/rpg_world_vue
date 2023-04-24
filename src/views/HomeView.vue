<template>
  <div class="home">
    <h1 class="home__title">Welcome to RPG World</h1>
    <h4 class="">Gaming Web Site</h4>
    <div class="home__content">
      <p>We are a community of passionate gamers who love to connect, play and explore new games.</p>
      <router-link :to="{name : 'Register'}" class="home__btn">Join Our Community</router-link >
    </div>
    <div class="home__server">
      <h2 class="home__server-title">Publish Your Own Server</h2>
      <p>At our website, you can easily publish your own server and get the exposure you need to build a thriving gaming community.</p>
      <p>We offer a range of features to help you promote your server such as server descriptions, and player reviews.</p>
      <router-link :to="{ name : 'ServersOfuser'}" class="home__server-btn">Publish Your Server</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style lang="scss" scoped>
  $primary-color: #1c2024;
  $secondary-color: #f4f4f4;
  $thirly-color: #de424d;
  a{
    text-decoration: none;
  }
  .home {
    background-color: $primary-color;
    color: $secondary-color;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px;
    min-height: 100vh;

    &__btn{
      background-color: $secondary-color;
      color: black ;
      padding: 5px;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
          background-color: darken( $secondary-color, 10%);
        }
    }


    &__title {
      font-size: 4rem;
      font-weight: bold;
      margin-bottom: 1px;
      text-align: center;
      text-shadow: 2px 2px $thirly-color;
      color: $thirly-color;
    }

    &__content {
      max-width: 800px;
      margin-bottom: 40px;
      text-align: center;

      p {
        font-size: 1.5rem;
        line-height: 1.5;
        margin-bottom: 20px;
        text-shadow: 1px 1px $thirly-color;
      }

      &__btn {
        text-decoration: none;
        background-color: $thirly-color;
        color: $secondary-color;
        font-size: 1.5rem;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
          background-color: darken($thirly-color, 10%);
        }
      }
    }

    &__server {
      background-color: lighten($primary-color, 10%);
      color: $secondary-color;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 40px;
      max-width: 800px;

      &-title {
        font-size: 2.5rem;
        font-weight: bold;
        margin-bottom: 20px;
        text-align: center;
        text-shadow: 1px 1px $thirly-color;
        color: $thirly-color; 
      }

      p {
        font-size: 1.25rem;
        line-height: 1.5;
        margin-bottom: 20px;
        text-align: center;
        color: lighten($secondary-color, 20%); 
      }

      &-btn {
        background-color: $thirly-color;
        color: $secondary-color;
        font-size: 1.5rem;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
          background-color: darken($thirly-color, 10%);
        }
      }
    }
  }

</style>