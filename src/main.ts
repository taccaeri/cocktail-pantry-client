import { createApp } from "vue"
import { createVuetify } from 'vuetify'
import { createPinia } from "pinia"

import Vue3Lottie from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'

import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from "./App.vue"
import router from "./router"

import "./assets/main.css"

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives,
  ssr: true,
});

app.use(vuetify)
app.use(router)
app.use(createPinia())
app.use(Vue3Lottie)

app.mount("#app")
