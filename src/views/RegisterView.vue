<template>
  <v-container>
    <v-card class="mx-auto my-12" max-width="400">
      <v-card-title class="text-h5">Register</v-card-title>
      <v-card-text>
        <v-alert v-if="errorMessage" type="error" dismissible>
          {{ errorMessage }}
        </v-alert>
        <v-form v-model="isValid" ref="form" @submit.prevent="handleRegister">
          <v-text-field
            label="Email"
            v-model="registerForm.email"
            :rules="[rules.required, rules.validEmail]"
            required
            outlined
            dense
          ></v-text-field>
          <v-text-field
            label="Password"
            v-model="registerForm.password"
            :rules="[rules.required, rules.passwordMinLength]"
            type="password"
            required
            outlined
            dense
          ></v-text-field>
          <v-btn :disabled="!isValid" type="submit" color="primary" block>Register</v-btn>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="goToLogin">Login Instead</v-btn>
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
const registerForm = reactive({
  email: '',
  password: ''
});
const errorMessage = ref('');

const rules = {
  required: value => !!value || 'This field is required.',
  validEmail: value => /.+@.+\..+/.test(value) || 'E-mail must be valid',
  passwordMinLength: value => value.length >= 8 || 'Password must be at least 8 characters long'
};

const handleRegister = async () => {
  if (isValid.value && form.value?.validate()) {
    try {
      const response = await axios.post('/auth/register', registerForm);
      console.log("Registration successful:", response.data);
      localStorage.setItem('authToken', response.data.token);  // Save the token, if needed
      router.push({ name: 'Home' });  // Redirect to home or another appropriate page
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        errorMessage.value = "Registration failed: " + (error.response.data.message || "Please check your details and try again.");
      } else {
        errorMessage.value = "An unexpected error occurred. Please try again later.";
      }
    }
  }
};

const goToLogin = () => {
  router.push({ name: 'Login' });
};

</script>
