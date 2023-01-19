<script setup>
import urlVar from '../config.ts';

const props = defineProps({
   cocktails: Array
})
const emit = defineEmits(['show-cocktail-info', 'emit-cocktail-info', 'emit-click-event'])
function handleClick(cocktail) {
  emit('show-cocktail-info'),
  emit('emit-cocktail-info', cocktail),
  console.log("emit to craftview successful")
}
</script>


<template>
  <v-container>
    <v-card
      class="d-flex flex-row" 
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
                  v-bind:src="urlVar.url + ':' + urlVar.imgPort + '/' + coc.name.toLowerCase().replaceAll(' ', '_') + '.jpg'"
                  aspect-ratio="1"
                  cover
                  class="bg-white"
                >
                </v-img>
              </v-card>
            </v-item>
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
