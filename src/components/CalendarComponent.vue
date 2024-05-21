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
import { ref, onMounted, watch } from 'vue';

interface Day {
  _id: string;
  date: string;
  day: string;
  isActive: boolean;
}

const props = defineProps({
  initialDays: {
    type: Array as () => Day[],
    default: () => []
  },
  initialCalendarName: {
    type: String,
    default: null
  },
  fetchDaysFn: {
    type: Function,
    default: null
  },
  toggleDayFn: {
    type: Function,
    default: null
  }
});

const days = ref<Day[]>(props.initialDays);
const calendarName = ref<string | null>(props.initialCalendarName);

watch(() => props.initialDays, (newDays) => {
  days.value = newDays;
});

watch(() => props.initialCalendarName, (newName) => {
  calendarName.value = newName;
});

async function fetchDays() {
  if (props.fetchDaysFn) {
    const result = await props.fetchDaysFn();
    days.value = result.days;
    calendarName.value = result.calendarName;
  }
}

async function toggleDay(dayId: string) {
  if (props.toggleDayFn) {
    await props.toggleDayFn(dayId);
    await fetchDays();
  }
}

function isNewMonth(dateString: string) {
  const date = new Date(dateString);
  return date.getDate() === 1;
}

function monthName(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleString('default', { month: 'long' });
}

onMounted(fetchDays);
</script>
