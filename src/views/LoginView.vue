<template>
  <v-container>
    <v-card class="mx-auto my-12" max-width="400">
      <v-card-title class="text-h5">Login</v-card-title>
      <v-card-text>
        <v-alert v-if="errorMessage" type="error" dismissible>
          {{ errorMessage }}
        </v-alert>
        <v-form v-model="isValid" ref="form" @submit.prevent="handleLogin">
          <v-text-field
            label="Email"
            v-model="loginForm.email"
            type="email"
            :rules="[rules.required, rules.validEmail]"
            required
            outlined
            dense
          ></v-text-field>
          <v-text-field
            label="Password"
            v-model="loginForm.password"
            :rules="[rules.required]"
            type="password"
            required
            outlined
            dense
          ></v-text-field>
          <v-btn :disabled="!isValid" type="submit" color="primary" block>Login</v-btn>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="goToRegister">Register Instead</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const form = ref(null);
const isValid = ref(false);
const loginForm = reactive({
  email: '',
  password: ''
});
const errorMessage = ref('');

const rules = {
  required: value => !!value || 'This field is required.',
  validEmail: value => /.+@.+\..+/.test(value) || 'E-mail must be valid'
};

const handleLogin = async () => {
  if (isValid.value && form.value?.validate()) {
    try {
      const response = await axios.post('/auth/login', loginForm);
      console.log("Login successful:", response.data);
      localStorage.setItem('authToken', response.data.token);  // Save the token
      router.push({ name: 'Home' });  // Redirect to home or dashboard
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        errorMessage.value = "Login failed: " + (error.response.data.message || "Incorrect credentials");
      } else {
        errorMessage.value = "An unexpected error occurred. Please try again later.";
      }
    }
  }
};

const goToRegister = () => {
  router.push({ name: 'Register' });
};

</script>
