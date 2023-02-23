<template>
  <main>
    <v-container>
        <v-card 
            class="d-flex flex-row" 
            max-width="450" 
            height="740"
            style="overflow-y: scroll"
        >
        <v-card class="wrap-text" style="padding: calc(var(--section-gap) / 6);" :elevation="0">
          <Vue3Lottie
                  animationLink="https://assets5.lottiefiles.com/packages/lf20_5y8nt6xi.json"
                  background="transparent"
                  style="height:350px; width:350px"
            />
          Welcome to the Cocktail Database
        <v-expansion-panels class="mb-6" >
          <v-expansion-panel :elevation="0" style="background: #f5f2fd;">
            <v-expansion-panel-title class="wrap-text" style="font-size: 14px; color:#9688d1; text-align: center;">
              How to Navigate the Craft Page
            </v-expansion-panel-title>
            <v-expansion-panel-text class="wrap-text" style="font-size: 12px;">
              <br>
              &#10022; Select all ingredients that you have in your home bar/pantry or ingredients that you would like in your cocktail
              <br>
              <br>
              &#10022; Clicking the CRAFT button will display all possible cocktails you can create with the ingredients in your selection
              <br>
              <br>
              &#10022; Clicking the CRAFT button without selecting any ingredient will display all cocktails in the database
              <br>
              <br>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel :elevation="0" style="background: #f5f2fd;">
            <v-expansion-panel-title class="wrap-text" style="font-size: 14px; color:#9688d1; text-align: center;">
              Future Updates
            </v-expansion-panel-title>
            <v-expansion-panel-text class="wrap-text" style="font-size: 12px;">
              <br>
              &#10022; Option to export and import ingredient data 
              <br>
              &#10022; Enable cookies to save ingredient selections
              <br>
              &#10022; Toggle button on the Craft page to switch between cocktail results that 1) contain only the selected ingredients or 2) include but are not limited to the ingredient selection
              <br>
              &#10022; Search bar on the Cocktails page. Allow search via name and category.
              <br>
              &#10022; Compatibility to mobile and tablet devices
              <br>
              <br>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel :elevation="0" style="background: #f5f2fd;">
            <v-expansion-panel-title class="wrap-text" style="font-size: 14px; color:#9688d1; text-align: center;">
              References
            </v-expansion-panel-title>
            <v-expansion-panel-text class="wrap-text" style="font-size: 12px;">
              <br>
              Books:
              <br>
              &#10022; Death & Co: Modern Classic Cocktails by David Kaplan, Nick Fauchald, Alex Day
              <br>
              &#10022; Death & Co: Welcome Home by David Kaplan, Nick Fauchald, Alex Day
              <br>
              &#10022; Cocktail Codex by David Kaplan, Nick Fauchald, Alex Day
              <br>
              &#10022; Regarding Cocktails by Sasha Patraske
              <br>
              &#10022; Smuggler's Cove by Martin Cate
              <br>
              <br>
              Bars/Restaraunts:
              <br>
              &#10022; Death & Co, NY
              <br>
              &#10022; Fancy Radish, DC
              <br>
              &#10022; Copycat Co., DC
              <br>
              &#10022; Barcelona Wine Bar, VA
              <br>
              <br>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel :elevation="0" style="background: #f5f2fd;">
            <v-expansion-panel-title class="wrap-text" style="font-size: 14px; color:#9688d1; text-align: center;">
              Github
            </v-expansion-panel-title>
            <v-expansion-panel-text class="wrap-text" style="font-size: 12px;">
              <br>
              <v-btn variant="plain" 
              :href="'https://github.com/taccaeri/cocktail-pantry-client'">
              Front-End | Vue
              </v-btn>
              <br>
              <v-btn variant="plain" 
              :href="'https://github.com/taccaeri/cocktail-pantry'">
              Back-End | Django
            </v-btn>
              <br>
              <br>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
      </v-card>
    </v-container>
  </main>
</template>


<style scoped>
.v-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: calc(var(--section-gap) / 4);
  white-space: nowrap;
}.v-card {
  flex: 1 0 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  scrollbar-width: none;
}
.title {
  font-weight: 500;
  font-size: 30px;
  color: hsla(256, 38%, 65%, 0.9);
}
.subtitle {
  font-weight: 400;
  font-size: 18px;
  color: hsla(256, 38%, 65%, 0.9);
}
::-webkit-scrollbar {
   display: none;
}
.wrap-text {
  white-space: normal;
  -webkit-line-clamp: unset !important;
}
.v-expansion-panels {
  padding: calc(var(--section-gap) / 4);
}
</style>
  