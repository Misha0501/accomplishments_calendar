<template>
  <v-app-bar app>
    <v-toolbar-title>My App</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn v-if="user" @click="goToProfile">Profile</v-btn>
    <v-btn v-if="user" @click="logout">Logout</v-btn>
    <v-btn v-else @click="goToAuth">Login / Register</v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from '@/config/firebase';
import { User } from 'firebase/auth';

const router = useRouter();
const user = ref<User | null>(null);

const updateUser = () => {
  user.value = auth.currentUser;
};

// Watch for authentication state changes
auth.onAuthStateChanged(updateUser);

// Navigate to profile page
const goToProfile = () => {
  router.push({ name: 'Profile' });
};

// Navigate to authentication page
const goToAuth = () => {
  router.push({ name: 'Auth' });
};

// Logout function
const logout = async () => {
  try {
    await auth.signOut();
    updateUser();
    router.push({ name: 'Home' });
  } catch (error) {
    console.error('Error signing out:', error);
  }
};
</script>
