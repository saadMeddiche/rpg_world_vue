<template>
  <div class="home">
    <h1 class="home__title">Welcome to Our Gaming Web Site!</h1>
    <div class="home__content">
      <p>We are a community of passionate gamers who love to connect, play and explore new games.</p>
      <p>Whether you are a casual player or a hardcore gamer, our website has something for everyone.</p>
      <button class="home__cta">Join Our Community</button>
    </div>
    <div class="home__server">
      <h2 class="home__server-title">Publish Your Own Server</h2>
      <p>At our website, you can easily publish your own server and get the exposure you need to build a thriving gaming community.</p>
      <p>We offer a range of features to help you promote your server such as server descriptions, and player reviews.</p>
      <button class="home__server-cta">Publish Your Server</button>
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
$accent-color: #de424d;

.home {
  background-color: $primary-color;
  color: $secondary-color;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  min-height: 100vh;

  &__title {
    font-size: 4rem;
    font-weight: bold;
    margin-bottom: 40px;
    text-align: center;
    text-shadow: 2px 2px $accent-color;
    color: $accent-color; /* added accent color */
  }

  &__content {
    max-width: 800px;
    margin-bottom: 40px;
    text-align: center;

    p {
      font-size: 1.5rem;
      line-height: 1.5;
      margin-bottom: 20px;
      text-shadow: 1px 1px $accent-color;
    }

    &__cta {
      background-color: $accent-color;
      color: $secondary-color;
      font-size: 1.5rem;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background-color: darken($accent-color, 10%);
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
      text-shadow: 1px 1px $accent-color;
      color: $accent-color; 
    }

    p {
      font-size: 1.25rem;
      line-height: 1.5;
      margin-bottom: 20px;
      text-align: center;
      color: lighten($secondary-color, 20%); 
    }

    &-cta {
      background-color: $accent-color;
      color: $secondary-color;
      font-size: 1.5rem;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background-color: darken($accent-color, 10%);
      }
    }
  }
}

</style>