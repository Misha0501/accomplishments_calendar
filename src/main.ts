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
import { auth } from '@/config/firebase'

const vuetify = createVuetify({
  components,
  directives,
})

let app;

auth.onAuthStateChanged(user => {
  if (!app) {
    app = createApp(App);
    app.use(createPinia())
    app.use(router);
    app.use(vuetify);
    app.mount('#app');
    axios.defaults.baseURL = 'http://localhost:3000'; // API base URL
  }

  if (user) {
    console.log('User signed in:', user);
  } else {
    console.log('No user signed in');
  }
});
