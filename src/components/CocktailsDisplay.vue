<script setup>
import urlVar from '../config.ts';

// pulls all cocktails from CraftView
const props = defineProps({
   cocktails: Array
})
// emits selected cocktail array to CraftView
const emit = defineEmits(['show-cocktail-info', 'emit-cocktail-info'])
function handleClick(cocktail) {
  emit('show-cocktail-info'),
  emit('emit-cocktail-info', cocktail)
}
</script>


<template>
  <v-container class="flex-column">
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
    <v-container>
      <v-card
        class="flex-row" 
        max-width="450"
        height="740"
        style="overflow-y: scroll"
        >
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

              <!-- cocktail name under cocktail image -->
              <v-btn
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
</template>


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
.v-btn {
  display: block;
  margin: 0 auto;
  bottom: 5px;
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
