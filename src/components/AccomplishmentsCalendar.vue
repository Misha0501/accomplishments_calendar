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
        <div :class="['bg-gray-400 p-3 text-center text-xl', {'bg-green-500 text-xl': day.isActive}]" @click="toggleDay(index)">
          {{ day.day }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Day {
  date: string; // Full date string for internal use
  day: string;  // Day number for display
  isActive: boolean;
}

const days = ref<Day[]>([]);

// Toggles the active state of a day
const toggleDay = (index: number) => {
  days.value[index].isActive = !days.value[index].isActive;
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

// Initializes days array with all days of the current year
const initializeDays = () => {
  const year = new Date().getFullYear();
  for (let month = 0; month < 12; month++) {
    for (let day = 1; day <= 31; day++) {
      let date = new Date(year, month, day);
      if (date.getMonth() === month) { // Check to ensure the date is valid
        let fullDate = formatDate(date);
        let dayOnly = date.getDate().toString().padStart(2, '0');
        days.value.push({
          date: fullDate,
          day: dayOnly,
          isActive: false
        });
      }
    }
  }
};

// Format date to 'YYYY-MM-DD' as local date string
const formatDate = (date: Date): string => {
  let d = new Date(date);
  let month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
};

// Initialize days on component mount
onMounted(() => {
  initializeDays();
});
</script>
