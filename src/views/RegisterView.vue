<template>
  <v-container>
    <v-card class="mx-auto my-12" max-width="400">
      <v-card-title>Register</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field label="Email" v-model="registerForm.email" required></v-text-field>
          <v-text-field type="password" label="Password" v-model="registerForm.password" required></v-text-field>
          <v-btn color="primary" @click="handleRegister">Register</v-btn>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="$router.push('/login')">Login Instead</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const registerForm = ref({
  email: '',
  password: ''
});

const handleRegister = async () => {
  // Add your registration logic here
  console.log('Registering:', registerForm.value);
};
</script>
