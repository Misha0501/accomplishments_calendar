// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import './assets/main.css';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import axios from 'axios';
import AuthService from '@/services/authService'

const vuetify = createVuetify({
  components,
  directives,
});

// Initialize the Vue app
const app = createApp(App);
app.use(router);
app.use(vuetify);

// Create an instance of AuthService
const authService = new AuthService();

// Provide the authService
app.provide('authService', authService);

app.mount('#app');

// Set Axios base URL
axios.defaults.baseURL = 'http://localhost:3000'; // API base URL

// Handle authentication state changes
authService.onAuthStateChanged(user => {
  if (user) {
    console.log('User signed in:', user);
  } else {
    console.log('No user signed in');
  }
});
