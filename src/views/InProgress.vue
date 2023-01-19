<template>
    <v-container>
        <v-card 
            class="d-flex flex-row" 
            max-width="450" 
            height="740"
        >
          <div>
            <Vue3Lottie
                  animationLink="https://assets10.lottiefiles.com/packages/lf20_gj47fo9f.json"
                  background="transparent"
                  style="height:350px; width:350px"
            />
            <div class="title">        
              Page under construction
              <div class="subtitle">
              I'll be up soon!
              </div>
            </div>
          </div>
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
}.v-card {
  flex: 1 0 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
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
</style>
  