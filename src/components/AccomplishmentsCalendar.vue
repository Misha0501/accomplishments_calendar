<template>
  <div class="max-w-screen-md mx-auto p-4">
    <!-- Outer container with the grid setup for 7 columns -->
    <div class="grid grid-cols-7 gap-2">
      <template v-for="(day, index) in days" :key="index">
        <!-- Month header only on the first day of the month, spanning full width -->
        <div v-if="isNewMonth(day.date)" class="col-span-7 font-bold text-4xl text-center my-2">
          {{ monthName(day.date) }}
        </div>
        <!-- Day boxes -->
        <div :class="['bg-gray-400 p-3 text-center text-xl', {'bg-green-500 text-xl': day.isActive}]" @click="toggleDay(day._id)">
          {{ day.day }}
        </div>
      </template>
    </div>
  </div>
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
