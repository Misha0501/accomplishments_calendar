// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'
import axios from 'axios'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)

axios.defaults.baseURL = 'http://localhost:3000'; // API base URL

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
