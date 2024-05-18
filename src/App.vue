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

</script>

<style>
/* Add any additional styling here */
</style>
