<template>
  <div class="calendar">
    <!-- Check and display month name if it's the start of a new month -->
    <div v-for="(day, index) in days" :key="index">
      <div v-if="isNewMonth(day.date)" class="month-header">
        {{ monthName(day.date) }}
      </div>
      <div class="day" :class="{ 'active': day.isActive }" @click="toggleDay(index)">
        {{ day.date }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Day {
  date: string;
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
        let localDate = formatDate(date);
        days.value.push({
          date: localDate,
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

<style scoped>
.calendar {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.month-header {
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
}
.day {
  padding: 10px;
  background-color: grey;
  cursor: pointer;
  text-align: center;
}
.day.active {
  background-color: green;
}
</style>
