<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <header>
    <img
      alt="Home-logo"
      class="logo"
      src="@/assets/logo.svg"
      width="140"
      height="140"
    />

    <div class="wrapper">
      <HelloWorld msg="Cocktail Database"/>

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/craft">Create</RouterLink>
        <RouterLink to="/cocktails">Cocktails</RouterLink>
        <RouterLink to="/mypantry">MyPantry</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
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
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding: calc(var(--section-gap) / 4);
    white-space: nowrap;
  }

  .logo {
    position: relative;
    margin: 0 1rem 1rem 0;
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
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
