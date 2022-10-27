<template>
  <div class="pantry">
    <div class="card" v-for="ing in ingredients">
      <div class="card-content">
        <div class="content">
          <h1>{{ ing.name }}</h1>
          <h4 v-for="thing in ing.category">{{ thing }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Ingredients',
  data () {
    return {
      ingredients: []
    }
  },
  mounted () {
    this.get_Ingredients();
  },
  methods: {
    get_Ingredients() {
        axios({
            method:'get',
            url: 'http://127.0.0.1:8000/ingredients/',
        }).then(response => this.ingredients = response.data);
        console.log(this.ingredients);
    }
  }
}
</script>

<style>
@media (min-width: 1024px) {
  .pantry {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
