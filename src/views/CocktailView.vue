<template>
  <CocktailDisplay :cocktails="this.cocktails"/>
</template>

<script>
import urlVar from '../config.ts'
import CocktailsDisplay from '../components/CocktailsDisplay.vue'
import axios from 'axios'

export default {
  name: 'Cocktails',
  components: {
    CocktailsDisplay: CocktailsDisplay
  },
  data () {
    return {
      cocktails: [],
      filtered_cocktails: [],
      category: []
    }
  },
  mounted () {
    this.getCocktails();
    this.getCategories();
  },
  methods: {
    getCocktails() {
      axios({
        method: 'get',
        url: urlVar.url + ':' + urlVar.port + '/' + 'cocktails/',
      }).then(response => {
        this.cocktails = response.data;
        this.filtered_cocktails = this.cocktails.filter(ing => {
          return ing.category.includes("classic")
        });
      })
    },
    getCategories() {
        axios({
            method:'get',
            url: urlVar.url + ':' + urlVar.port + '/' + 'coc_categories/',
        }).then(response => {
          this.category = response.data
        });
    },
    filterocktails(cat_name) {
      this.filtered_cocktails = [...this.cocktails];
      this.filtered_cocktails = this.filtered_cocktails.filter(coc => {
          return coc.category.includes(cat_name)
      })
    },
  }
}
</script>
  
<!-- <style scoped>
.v-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: calc(var(--section-gap) / 4);
  white-space: nowrap;
  scrollbar-width: none;
}.v-card {
  flex: 1 0 100%;
  scrollbar-width: none;
}
::-webkit-scrollbar {
   display: none;
}
</style> -->
  