<template>
  <v-container>
    <h1>Your Profile</h1>
    <p>This page is protected and only accessible to authenticated users.</p>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { auth } from '@/config/firebase';

const user = ref(auth.currentUser);
</script>
