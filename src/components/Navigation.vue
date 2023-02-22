<template>
  <header>
    <v-container>
      <img
          alt="Home-logo"
          class="logo"
          src="@/assets/logo.svg"
          width="140"
          height="140"
      />
    </v-container>
    <v-container>
      <div class="wrapper">
        <HelloWorld msg="Cocktail Database"/>

        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/craft">Craft</RouterLink>
          <RouterLink to="/cocktails">Cocktails</RouterLink>
          <RouterLink to="/mypantry">MyPantry</RouterLink>
        </nav>
      </div>
    </v-container>
  </header>
</template>


<script>
import { RouterLink } from "vue-router";
import HelloWorld from "./HelloWorld.vue";

export default {
  name: 'Navigation',
  components: {
    HelloWorld: HelloWorld,
  }
}
</script>


<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
.logo {
  display: block;
  margin: 0 auto 2rem;
}
#app .shifted {
  position: relative;
  top: 35%;
}

nav {
  width: 100%;
  font-size: 16px;
  text-align: center;
  margin-top: 2rem;
  top: -8px;
  left: 7px;
}
nav a.router-link-exact-active {
  color: var(--color-text);
}
nav a.router-link-exact-active:hover {
  background-color: transparent;
}
nav a {
  display: inline-block;
  padding: 0 1rem;
  transition: all .2s ease-in-out;
}
nav a:hover {
  transform: scale(1.1);
}
nav a:first-of-type {
  border: 0;
}
@media screen and (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding: calc(var(--section-gap) / 4);
    white-space: nowrap;
  }
  .logo {
    position: relative;
    margin: 0 -1rem 1rem 0;
    background-color: transparent
  }
  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
  nav {
    text-align: left;
    margin-left: -1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
@media screen and (max-width: 1024px) {
  nav {
    font-size: 15px;
  }
}
</style>

