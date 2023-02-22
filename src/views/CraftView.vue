<template>
  <v-container v-if="show_default">
    <v-card class="d-flex flex-row" max-width="450" height="740">

      <!--Ingredient category tabs-->
      <v-tabs v-model="activeTab" direction="vertical">
        <v-tab
          v-for="(cat, index) in Object.keys(category)"
          @click="() => filterIngredients(cat)"
          :key="cat"
          :value="cat"
          :ripple="false"
          :hide-slider="true"
        >
          {{ cat }}
        </v-tab>
      </v-tabs>

      <!-- Tab contents -->
      <v-window v-model="activeTab" style="overflow-y: scroll">
        <v-window-item
          v-for="(cat, index) in Object.keys(category)"
          :value="cat"
        >
          <v-card flat>
            <v-list lines="one" select-strategy="multiple">
              <template v-for="sub_cat in Object.keys(category[cat])">
                <v-list-item
                  v-if="typeof(category[cat]) == 'object'"
                  :key="category[cat][sub_cat]"
                  :value="category[cat][sub_cat]"
                  class="noclick"
                >
                  <v-list-item-title>
                    {{ category[cat][sub_cat] }}
                  </v-list-item-title>
                </v-list-item>
                <template v-for="(ing, index) in filtered_ingredients">
                  <v-list-item
                    v-ripple="false"
                    v-if="ing.category.includes(sub_cat)"
                    :key="ing"
                    :title="ing.name"
                    :value="index"
                    @click="() => {handleClick(ing)}"
                    :class="{select: this.selection.includes(ing)}"
                  >
                  </v-list-item>
                </template>
              </template>
              <v-list-item
                v-ripple="false"
                v-for="(ing, index) in filtered_ingredients"
                v-if="typeof(category[cat]) == 'string'"
                :key="ing"
                :title="ing.name"
                :value="index"
                @click="() => {handleClick(ing)}"
                :class="{select: this.selection.includes(ing)}"
              >
              </v-list-item>
            </v-list>
          </v-card>
        </v-window-item>
      </v-window>
    </v-card>
  </v-container>

  <!--CocktailsDisplay Component-->
  <div v-if="show_cocktail_list">
    <CocktailsDisplay 
    :cocktails="this.cocktails" 
    @show-cocktail-info="showInfo" 
    @emit-cocktail-info="storeCocktailInfo"/>
  </div>

  <!--CocktailInfo Component-->
  <div v-if="show_cocktail_detail">
    <CocktailInfo :cocktail="this.selected_cocktail"/>
  </div>

  <!--Buttons-->
  <div v-show="show_craft_btn">
    <v-btn
      class="button"
      variant="flat"
      start
      icon
      @click="() => {getCocktails(), hideCard()}"
      :ripple="false"
    >
    Craft
    </v-btn>
  </div>
  <div v-show="show_back1_btn">
    <v-btn
      class="button"
      variant="flat"
      icon
      @click="() => {showCard()}"
      :ripple="false"
    >
    Back
    </v-btn>
  </div>
  <div v-show="show_back2_btn">
    <v-btn
      class="button"
      variant="flat"
      icon
      @click="() => {hideInfo()}"
      :ripple="false"
    >
    Back
    </v-btn>
  </div>
</template>


<script>
import urlVar from '../config.ts'
import CocktailsDisplay from '../components/CocktailsDisplay.vue'
import CocktailInfo from '../components/CocktailInfo.vue'
import axios from 'axios'

export default {
  name: 'Craft',
  components: {
    CocktailsDisplay: CocktailsDisplay,
    CocktailInfo: CocktailInfo
  },
  data () {
    return {
      ingredients: [],
      filtered_ingredients: [],
      selection: [],
      cocktails: [],
      activeTab: "spirits",
      category: [],
      display_category: [],
      selected_cocktail: null,
      show_default: true,
      show_cocktail_list: false,
      show_cocktail_detail: false,
      show_craft_btn: true,
      show_back1_btn: false,
      show_back2_btn: false
    }
  },
  mounted () {
    this.getIngredients();
    this.getCategories();
  },
  methods: {
    getIngredients() {
        axios({
            method:'get',
            url: urlVar.url + ':' + urlVar.port + '/' + 'ingredients/',
        }).then(response => {
          this.ingredients = response.data;
          this.filtered_ingredients = this.ingredients.filter(ing => {
            return ing.category.includes("spirits")
          });
        });
    },
    getCategories() {
        axios({
            method:'get',
            url: urlVar.url + ':' + urlVar.port + '/' + 'categories/',
        }).then(response => {
          this.category = response.data
          this.display_category = Object.keys(this.category)
        });
    },
    // Add selected ingredients to an array which will be passed as params to GET cocktails
    handleClick(item) {
      if (this.selection.includes(item)) {
        this.selection.splice(this.selection.indexOf(item), 1);
      } else {
        this.selection.push(item);
      }
      requestAnimationFrame(() => {
        this.selection.includes(item);
      })
    },
    // Filter ingredients by ingredient category 
    filterIngredients(cat_name) {
      this.filtered_ingredients = [...this.ingredients];
      this.filtered_ingredients = this.filtered_ingredients.filter(ing => {
          return ing.category.includes(cat_name)
      })
    },
    // Pass cocktail params to GET request
    getCocktails() {
      var param_list = [["show_related", "true"]];
      for (var i = 0; i < this.selection.length; i++) {
        param_list.push(["ingredient", this.selection[i].id]);
      }
      const params = new URLSearchParams(param_list);
      axios.get(urlVar.url + ':' + urlVar.port + '/' + 'cocktails/',
          { params }
      ).then(response => {
        this.cocktails = response.data;
        console.log(this.cocktails)
      })
    },
    // Send selected cocktail array to CocktailsDisplay as prop
    storeCocktailInfo(cocktail) {
      this.selected_cocktail=cocktail;
    },
    // Toggle components invisible and visible based on button clicks
    hideCard() {
      this.show_default=!this.show_default,
      this.show_cocktail_list=true,
      this.show_craft_btn=!this.show_craft_btn,
      this.show_back1_btn=true
    },
    showCard() {
      this.show_default=true,
      this.show_cocktail_list=!this.show_cocktail_list,
      this.show_craft_btn=true,
      this.show_back1_btn=!this.show_back1_btn
    },
    showInfo() {
      this.show_cocktail_detail=true,
      this.show_cocktail_list=!this.show_cocktail_list,
      this.show_back1_btn=!this.show_back1_btn,
      this.show_back2_btn=true
    },
    hideInfo() {
      this.show_cocktail_detail=!this.show_cocktail_detail,
      this.show_cocktail_list=true,
      this.show_back1_btn=true,
      this.show_back2_btn=!this.show_back2_btn
    }
  }
}
</script>


<style scoped>
.v-container {
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  padding: calc(var(--section-gap) / 4);
  scrollbar-width: none;
}
.v-tab:hover {
  color: hsla(245, 40%, 43%, 0.60);
  background-color: hsla(245, 40%, 90%, 0.1);
}
.v-list {
  padding-left: 10px;
  width: 450px;
}
.v-list-item-title {
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: hsla(245, 60%, 27%, 0.45);
}
.v-list-item.noclick {
  pointer-events: none;
}
.v-list-item:hover {
  color: hsla(245, 40%, 43%, 0.60);
  background-color: hsla(245, 40%, 90%, 0.1);
}
.v-list-item.select {
  color: hsla(245, 35%, 55%, 0.9);
  background-color: hsla(245, 40%, 90%, 0.1);
}
.v-window {
  scrollbar-width: none;
}
.v-btn.button {
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
@media only screen and (min-width: 1024px) {
  .v-container {
    min-width: 420px;
  }
}
@media only screen and (max-width: 1300px) {
}
</style>
