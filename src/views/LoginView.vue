<template>
  <v-container>
    <v-card class="mx-auto my-12" max-width="500">
      <v-card-title class="text-h5">Login</v-card-title>
      <v-card-text>
        <!-- Error Alert -->
        <v-alert v-if="errorMessage" type="error" dismissible @input="errorMessage = ''">
          {{ errorMessage }}
        </v-alert>

        <v-form @submit.prevent="handleLogin" ref="form">
          <v-text-field
            label="Email"
            v-model="loginForm.email"
            required
            type="email"
            :rules="[rules.required, rules.validEmail]"
          ></v-text-field>
          <v-text-field
            label="Password"
            v-model="loginForm.password"
            required
            type="password"
            :rules="[rules.required]"
          ></v-text-field>
          <v-btn type="submit" color="primary" block>Login</v-btn>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="goToRegister">Register Instead</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const form = ref(null);

const loginForm = ref({
  email: '',
  password: ''
});
const errorMessage = ref('');

const rules = {
  required: (value: string) => !!value || 'Required.',
  validEmail: (value: string) => /.+@.+\..+/.test(value) || 'E-mail must be valid',
};

const handleLogin = async () => {
  if (form.value?.validate()) {
    try {
      const response = await axios.post('/auth/login', loginForm.value);
      console.log('Login successful:', response.data);
      localStorage.setItem('authToken', response.data.token);
      router.replace({ name: 'Home' });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Here you might want to handle different kinds of errors differently
        errorMessage.value = error.response.data.message || 'Failed to login. Please try again.';
      } else {
        errorMessage.value = 'Login failed due to unexpected issues. Please try again later.';
      }
    }
  }
};

const goToRegister = () => {
  router.push({ name: 'Register' });
};
</script>
