<script setup>
import urlVar from '../config.ts';

const props = defineProps({
   cocktail: Object,
})
</script>

<template>
  <v-container>
    <v-card
      class="d-flex flex-column"
      width="450"
      height="740"
      style="overflow-y: scroll"
    >
      <v-list lines="one">
        <v-img
        v-bind:src="urlVar.url + ':' + urlVar.imgPort + urlVar.imgPath + '/' + cocktail.name.toLowerCase().replaceAll(' ', '_') + '.jpg'"
        aspect-ratio="1"
        cover
        class="mx-auto"
        >
        </v-img>
        <br>
        <br>
        <v-list-subheader class="text-h5">{{ cocktail.name }}</v-list-subheader>
        <br>
        <v-list-subheader>&mdash; Category &mdash;</v-list-subheader>
        <v-list-item 
          v-for="cat in cocktail.display_category"
          :title="cat"/>
        <v-list-subheader v-if="cocktail.bartender!=''">Bartender</v-list-subheader>
        <v-list-item v-if="cocktail.bartender!=''" :title="cocktail.bartender"/>
        <v-list-subheader>&mdash; Glassware &mdash;</v-list-subheader>
        <v-list-item :title="cocktail.display_glassware"/>
        <v-list-subheader>&mdash; Ingredients &mdash;</v-list-subheader>
        <v-list-item
          v-for="ing in cocktail.ingredients"
          :key="ing.ingredient"
          :title="ing.ingredient"
          :subtitle="ing.quantity + ' ' + ing.display_unit"
        >
          <div style="color: gray" v-if="ing.recommended!=''">
            Rec &LongRightArrow; {{ ing.recommended }}
          </div>
          <div style="color: gray" v-if="ing.optional!=null">
            &#10036; Optional
          </div>
          <div style="color: gray; font-size: 10pt;" v-if="ing.notes!=''" class="wrap-text">
            {{ ing.notes }}
          </div>
        </v-list-item>
        <v-list-subheader v-if="cocktail.notes!=''">&mdash; Notes &mdash;</v-list-subheader>
        <v-list-item class="wrap-text" v-if="cocktail.notes!=''">
          {{ cocktail.notes }}
        </v-list-item>
        <v-list-subheader>&mdash; Method &mdash;</v-list-subheader>
        <v-list-item class="wrap-text">
          {{ cocktail.method }}
        </v-list-item>
        <v-list-subheader v-if="cocktail.variations!=null">&mdash; Variations &mdash;</v-list-subheader>
        <v-list-item class="wrap-text" v-if="cocktail.variations!=''" v-for="entry in cocktail.variations">
          &#10023; {{ entry }}
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<style scoped>
.v-card {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: calc(var(--section-gap) / 8);
  white-space: nowrap;
  scrollbar-width: none;
}
.v-list {
  scrollbar-width: none;
}
.v-list-subheader {
  scrollbar-width: none;
  justify-content: center;
  align-items: center;
  color: hsla(245, 40%, 43%, 0.60);
  font-weight: bold !important;
}
.v-list-item {
  justify-content: center;
  align-items: center;
  text-align: center;
}
::-webkit-scrollbar {
  display: none;
}
.wrap-text {
  white-space: normal;
  -webkit-line-clamp: unset !important;
}
.v-img {
  opacity: 90%;
  border-radius:220px;
  width: 90%;
}
@media screen and (max-width: 1024px) {
  .v-container {
    min-width: 58%;
  }
}
</style>
