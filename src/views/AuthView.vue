<template>
  <v-container>
    <v-card class="mx-auto my-12" max-width="500">
      <v-card-title class="text-h5">Login / Register</v-card-title>
      <v-card-text>
        <div id="firebaseui-auth-container"></div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue';
import { ui, uiConfig } from '../config/firebaseui';

onMounted(() => {
  ui.start('#firebaseui-auth-container', uiConfig);
});
</script>
