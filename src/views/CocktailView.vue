<template>
  <v-container class="flex-column" v-if="show_main">
    <v-col style="max-width: 450px; max-height: 50px;">
      <v-autocomplete
        v-model="searched_cocktail"
        label="Search Cocktails"
        :items="cocktails"
        item-title="name"
        item-value="id"
        :highlight="true"
        :ignoreCase="true"
        :ignoreAccent="true"
        :menu-props="{maxHeight: 400}"
        variant="underlined"
        clearable
        single-line
        hide-details
      >
      </v-autocomplete>
    </v-col>
    <v-container v-if="show_main">
      <v-card
        class="flex-row" 
        max-width="450"
        height="740"
        style="overflow-y: scroll"
      >
        <!-- <v-tabs 
          v-model="activeTab" 
          direction="vertical" 
          >
          <v-tab
            v-for="cat in Object.keys(category)"
            @click="() => filterIngredients(cat)"
            :key="cat"
            :value="category[cat]"
            :ripple="false"
            :hide-slider="true"
          >
            {{ category[cat] }}
          </v-tab>
        </v-tabs> -->
        <v-item-group>
          <v-row align="center" no-gutters>
            <v-col
              v-for="(coc, index) in cocktails"
              :key="index"
              cols="12"
              md="6"
            >
              <v-item>
                <v-card
                  :class="['ma-6 fill-height']"
                  class="img-card"
                  v-ripple="false"
                  @click="() => {handleClick(coc)}"
                >
                  <v-img
                    v-bind:src="urlVar.url + ':' + urlVar.imgPort + urlVar.imgPath + '/' + coc.name.toLowerCase().replaceAll(' ', '_') + '.jpg'"
                    aspect-ratio="1"
                    cover
                    class="bg-white"
                  >
                  </v-img>
                </v-card>
              </v-item>
              <v-btn class="cocktail-name"
                size="small"
                variant="plain"
                width="175px"
                v-ripple="false"
                @click="() => {handleClick(coc)}"
                >
                {{ coc.name }}
              </v-btn>
            </v-col>
          </v-row>
        </v-item-group>
        </v-card>
    </v-container>
  </v-container>

  <!--CocktailInfo Component-->
  <div v-if="show_cocktail_detail">
    <CocktailInfo :cocktail="selected_cocktail"/>
  </div>

  <!--Buttons-->
  <div v-show="show_back_btn">
    <v-btn
      class="button"
      variant="flat"
      icon
      @click="() => {showMain()}"
      :ripple="false"
    >
    Back
    </v-btn>
  </div>

</template>


<script setup>
import urlVar from '../config.ts';
</script>

<script>
import axios from 'axios'
import CocktailInfo from '@/components/CocktailInfo.vue';

export default {
  name: 'CocktailView',
  components: {
    CocktailInfo
  },
  data () {
    return {
      cocktails: [],
      filtered_cocktails: [],
      selected_cocktail: null,
      category: [],
      show_main: true,
      show_cocktail_detail: false,
      show_back_btn: false,
      searched_cocktail: null,
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
        console.log(this.cocktails)
      })
    },
    getCategories() {
        axios({
            method:'get',
            url: urlVar.url + ':' + urlVar.port + '/' + 'cocktail_categories/',
        }).then(response => {
          this.category = response.data
        });
    },
    // filterCocktailsByCategory(cat_name) {
    //   this.filtered_cocktails = [...this.cocktails];
    //   this.filtered_cocktails = this.filtered_cocktails.filter(coc => {
    //       return coc.category.includes(cat_name)
    //   })
    // },
    handleClick(cocktail) {
      this.selected_cocktail=cocktail,
      this.show_main=!this.show_main,
      this.show_cocktail_detail=true,
      this.show_back_btn=true
    },
    showMain() {
      this.show_main=true,
      this.show_cocktail_detail=!this.show_cocktail_detail,
      this.show_back_btn=!this.show_back_btn
    }
  }
}
</script>
  

<style scoped>
.v-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: calc(var(--section-gap) / 4);
  white-space: nowrap;
  scrollbar-width: none;
}
.v-card {
  flex: 1 0 100%;
  scrollbar-width: none;
}
.img-card {
  transition: all .2s ease-in-out;
}
.img-card:hover {
  transform: scale(1.1);
}
.cocktail-name {
  display: block;
  margin: 0 auto;
  bottom: 5px;
}
.button {
  position: absolute;
  right: -630px;
  bottom: 380px;
  height: 70px;
  width: 70px;
  background-color: #e3def3;
  transition: all .2s ease-in-out;
}
.v-btn.button:hover {
  transform: scale(1.1);
}
::-webkit-scrollbar {
   display: none;
}
@media screen and (max-width: 1024px) {
  .v-container {
    min-width: 58%;
  }
}
</style>
  