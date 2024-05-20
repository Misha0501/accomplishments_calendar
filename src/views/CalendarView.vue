<template>
  <v-container class="max-w-screen-md mx-auto p-4">
    <div v-if="calendarName" class="text-h5 text-center my-4">
      {{ calendarName }}
    </div>
    <!-- Outer container with Vuetify's grid setup -->
    <v-row>
      <template v-for="(day, index) in days" :key="index">
        <!-- Month header only on the first day of the month, using Vuetify's grid -->
        <v-col v-if="isNewMonth(day.date)" cols="12" class="text-h4 text-center my-2">
          {{ monthName(day.date) }}
        </v-col>
        <!-- Day boxes -->
        <v-col cols="1">
          <v-btn :color="day.isActive ? 'green' : 'grey lighten-1'" block text @click="toggleDay(day._id)">
            {{ day.day }}
          </v-btn>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

interface Day {
  _id: string; // Unique ID for the day
  date: string; // Full date string for internal use
  day: string;  // Day number for display
  isActive: boolean;
}

const route = useRoute();
const days = ref<Day[]>([]);
const calendarId = route.params.id;
const calendarName = ref<string | null>(null);

async function fetchDays() {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    try {
      const token = await user.getIdToken();
      const response = await axios.get(`/api/calendars/${calendarId}/days`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      days.value = response.data.days;
      calendarName.value = response.data.calendarName;
    } catch (error) {
      console.error("Error fetching days:", error);
    }
  } else {
    console.error("User is not authenticated");
  }
}

async function toggleDay(dayId: string) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    try {
      const token = await user.getIdToken();
      await axios.post(`/api/calendars/${calendarId}/days/toggle`, {
        _id: dayId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      await fetchDays(); // Refresh the days list after toggling
    } catch (error) {
      console.error("Error toggling day:", error);
    }
  } else {
    console.error("User is not authenticated");
  }
}

// Check if it is the start of a new month
function isNewMonth(dateString: string) {
  const date = new Date(dateString);
  return date.getDate() === 1;
}

// Get the month name from a date string
function monthName(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleString('default', { month: 'long' });
}

onMounted(fetchDays);
</script>
