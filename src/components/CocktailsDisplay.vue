<script setup lang="ts">
defineProps<{
  cocktails: array;
}>();
</script>

<template>
  <v-container class="justify-center">
    <v-card
      class="d-flex flex-row"
      max-width="450"
      height="740"
      >
      <v-item-group>
        <div style="height: 740px; width: 455px; overflow-y: scroll">
          <v-row
            align="center"
            no-gutters
            style="right: 3px"
          >
            <v-col
              v-for="(coc, index) in cocktails"
              :key="index"
              cols="12"
              md="6"
            >
              <v-item>
                <v-card
                  :class="['ma-5 align-center fill-height']"
                  @mouseover="isHovering = true"
                  @mouseout="isHovering = false"
                  v-ripple="false"
                >
                  <v-img
                    src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
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
                position="relative"
                width="175px"
                style="left:18px; bottom:5px"
                v-ripple="false"
                @click=""
                >
                {{ coc.name }}
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-item-group>
    </v-card>
  </v-container>
</template>

<style scoped>
.v-container {
  display: flex;
  place-items: center;
  padding: calc(var(--section-gap) / 3);
  white-space: nowrap;
}
::-webkit-scrollbar {
   display: none;
}
</style>
