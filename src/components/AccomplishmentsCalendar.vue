<template>
  <v-container class="max-w-screen-md mx-auto p-4">
    <div v-if="accomplishmentName" class="text-h5 text-center my-4">
      {{ accomplishmentName }}
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
import ApiService from '@/services/ApiService'

interface Day {
  _id: string; // Unique ID for the day
  date: string; // Full date string for internal use
  day: string;  // Day number for display
  isActive: boolean;
}

const props = defineProps({
  accomplishmentName: String
});


const days = ref<Day[]>([]);

const fetchDays = async () => {
  days.value = await ApiService.getDays();
};

const toggleDay = async (id: string) => {
  await ApiService.toggleDay(id);
  await fetchDays(); // Refresh the days list after toggling
};

// Check if it is the start of a new month
const isNewMonth = (dateString: string) => {
  const date = new Date(dateString);
  return date.getDate() === 1;
};

// Get the month name from a date string
const monthName = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('default', { month: 'long' });
};

onMounted(fetchDays);
</script>
