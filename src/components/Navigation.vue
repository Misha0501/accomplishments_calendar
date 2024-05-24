<template>
  <v-app-bar app>
    <v-toolbar-title @click="goToHome" class="cursor-pointer">Accomplishments calendar</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn v-if="user" @click="goToProfile">Profile</v-btn>
    <v-btn v-if="user" @click="logout">Logout</v-btn>
    <v-btn v-else @click="goToAuth">Login / Register</v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { IAuthService } from '@/interfaces/IAuthService'
import type { ApplicationUser } from '@/types/ApplicationUser'

const router = useRouter()
const authService = inject<IAuthService>('authService')
const user = ref<ApplicationUser | null>(null)

const updateUser = (currentUser: ApplicationUser | null) => {
  user.value = currentUser
}

// Watch for authentication state changes
onMounted(() => {
  authService?.onAuthStateChanged(updateUser)
})

// Navigate to profile page
const goToProfile = () => {
  router.push({ name: 'ProfileInfo' })
}

// Navigate to authentication page
const goToAuth = () => {
  router.push({ name: 'Auth' })
}

// Navigate to authentication page
const goToHome = () => {
  console.log('goToHome')
  router.push({ name: 'Home' })
}

// Logout function
const logout = async () => {
  try {
    await authService?.logout()
    updateUser(null)
    goToHome()
  } catch (error) {
    console.error('Error signing out:', error)
  }
}
</script>
