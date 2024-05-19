<template>
  <v-app>
    <Navigation />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import Navigation from './components/Navigation.vue';
</script>

<style>
/* Add any additional styling here */
</style>
