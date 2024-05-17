<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>My Application</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- Updated navigation buttons using the `to` attribute in `v-btn` -->
      <v-btn text :to="{ name: 'Login' }">Login</v-btn>
      <v-btn text :to="{ name: 'Register' }">Register</v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>


<script setup>
import { ref } from 'vue';

const showLoginDialog = ref(false);
const loginForm = ref({
  email: '',
  password: ''
});

const handleLogin = () => {
  console.log('Logging in:', loginForm.value);
  // Implement login logic here
  showLoginDialog.value = false;
};

const handleRegister = () => {
  console.log('Registering:', loginForm.value);
  // Implement registration logic here
  showLoginDialog.value = false;
};
</script>

<style>
/* Add any additional styling here */
</style>
