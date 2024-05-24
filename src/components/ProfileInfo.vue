<template>
  <v-container>
    <v-card class="pa-4">
      <v-card-title>User Profile</v-card-title>
      <v-card-text>
        <div><strong>Email:</strong> {{ profile.email }}</div>
        <div><strong>Name:</strong> {{ profile.name }}</div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from 'vue';
import type { IAuthService } from '@/interfaces/IAuthService';
import type { ApplicationUser } from '@/types/ApplicationUser';

const profile = ref({ email: '', name: '' });
const authService = inject<IAuthService>('authService');

async function fetchUserProfile() {
  if (authService) {
    const user: ApplicationUser | null = authService.getCurrentUser();
    if (user) {
      profile.value.email = user.email || 'N/A';
      profile.value.name = user.displayName || 'N/A';
    } else {
      console.error("User is not authenticated");
    }
  } else {
    console.error("AuthService is not available");
  }
}

onMounted(() => {
  fetchUserProfile();
});
</script>
