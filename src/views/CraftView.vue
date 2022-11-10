<template>
  <!--Ingredient selection-->
  <v-container
    v-show="show_card1"
    class="justify-center"
  >
    <v-card
      class="d-flex flex-row"
      max-width="450"
      height="740"
    >
      <v-tabs
        v-model="activeTab"
        direction="vertical"
      >
        <v-tab
          class="hover"
          v-for="(cat, index) in Object.keys(category)"
          @click="() => filterIngredients(cat)"
          :key="cat"
          :value="category[cat]"
          :ripple="false"
          :hide-slider="true"
        >
          {{ cat }}
        </v-tab>
      </v-tabs>

      <v-window v-model="activeTab">
        <v-window-item
          v-for="(cat, index) in Object.keys(category)"
          :value="category[cat]"
        >
          <v-card flat>
            <v-list
              lines="one"
              select-strategy="multiple"
              style="height: 740px; width: 450px; overflow-y: scroll"
            >
              <template
                v-for="sub_cat in Object.keys(category[cat])"
              >
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
                <template
                  v-for="(ing, index) in filtered_ingredients"
                >
                  <v-list-item
                    class="hover"
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
                class="hover"
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

  <!--Cocktail Component-->
  <div
    v-show="show_card2"
    class="justify-center"
  >
    <Cocktails :cocktails="this.cocktails"/>
  </div>

  <!--Buttons-->
  <div
    class="button"
    v-show="show_btn1"
  >
    <v-btn
      variant="flat"
      icon
      color="#e3def3"
      style="height:70px; width:70px"
      @click="() => {getCocktails(), hideCard()}"
      :ripple="false"
    >
    <!-- <Vue3Lottie
      animationLink="https://assets5.lottiefiles.com/packages/lf20_nAnzcg/61 - Martini.json"
      speed="2"
      background="transparent"
      style="height:70px; width:70px"
    /> -->
    Craft
    </v-btn>
  </div>
  <div
    class="button"
    v-show="show_btn2"
  >
    <v-btn
      variant="flat"
      icon
      color="#e3def3"
      style="height:70px; width:70px"
      @click="() => {showCard()}"
      :ripple="false"
    >
    Back
    </v-btn>
  </div>
</template>

<script>
import CocktailsDisplay from '../components/CocktailsDisplay.vue';
import axios from 'axios'

export default {
  name: 'Ingredients',
  components: {
    Cocktails: CocktailsDisplay
  },
  data () {
    return {
      ingredients: [],
      filtered_ingredients: [],
      selection: [],
      cocktails: [],
      activeTab: "Spirits",
      category: [],
      display_category: [],
      show_card1: true,
      show_card2: false,
      show_btn1: true,
      show_btn2: false,
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
            url: 'http://127.0.0.1:8000/ingredients/',
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
            url: 'http://127.0.0.1:8000/categories/',
        }).then(response => {
          this.category = response.data
          this.display_category = Object.keys(this.category)
        });
    },
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
    filterIngredients(cat_name) {
      this.filtered_ingredients = [...this.ingredients];
      this.filtered_ingredients = this.filtered_ingredients.filter(ing => {
          return ing.category.includes(cat_name)
      })
    },
    getCocktails() {
      var param_list = [];
      for (var i = 0; i < this.selection.length; i++) {
        param_list.push(["ingredient", this.selection[i].id]);
      }
      const params = new URLSearchParams(param_list);
      axios.get('http://127.0.0.1:8000/cocktails/',
          { params }
      ).then(response => {
        this.cocktails = response.data;
        console.log(this.cocktails)
      })
    },
    hideCard() {
      this.show_card1=!this.show_card1,
      this.show_card2=true,
      this.show_btn1=!this.show_btn1,
      this.show_btn2=true
    },
    showCard() {
      this.show_card1=true,
      this.show_card2=!this.show_card2,
      this.show_btn1=true,
      this.show_btn2=!this.show_btn2
    },
  }
}
</script>

<style scoped>
::v-deep.hover:hover {
  color: hsla(245, 40%, 43%, 0.60);
  background-color: hsla(245, 40%, 90%, 0.1);
}
.select {
  color: hsla(245, 35%, 55%, 0.9);
  background-color: hsla(245, 40%, 90%, 0.1);
}
.noclick {
  pointer-events: none;
}
.v-list-item-title {
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: hsla(245, 60%, 27%, 0.45);
}
.button {
  position: absolute;
  right: -30px;
  top: 47%;
}
::-webkit-scrollbar {
   display: none;
}
@media only screen and (min-width: 600px) {
  .v-container {
    display: flex;
    place-items: center;
    white-space: nowrap;
    padding: calc(var(--section-gap) / 4);
  }
}
</style>
