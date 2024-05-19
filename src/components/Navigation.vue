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
import { ref, onMounted, inject } from 'vue';
import { useRouter } from 'vue-router';
import type { IAuthService } from '@/interfaces/IAuthService';
import type { ApplicationUser } from '@/interfaces/IApplicationUser';

const router = useRouter();
const authService = inject<IAuthService>('authService');
const user = ref<ApplicationUser | null>(null);

const updateUser = (currentUser: ApplicationUser | null) => {
  user.value = currentUser;
};

// Watch for authentication state changes
onMounted(() => {
  authService?.onAuthStateChanged(updateUser);
});

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
    await authService?.logout();
    updateUser(null);
    router.push({ name: 'Home' });
  } catch (error) {
    console.error('Error signing out:', error);
  }
};
</script>
