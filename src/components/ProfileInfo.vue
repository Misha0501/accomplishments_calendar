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

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

const profile = ref({ email: '', name: '' });

async function fetchUserProfile() {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    try {
      const token = await user.getIdToken();
      const response = await axios.get('/api/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      profile.value = response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  } else {
    console.error("User is not authenticated");
  }
}

onMounted(() => {
  fetchUserProfile();
});
</script>
