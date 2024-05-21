<template>
  <v-container class="max-w-screen-md mx-auto p-4">
    <CalendarComponent
      :initialDays="days"
      :initialCalendarName="calendarName ?? ''"
      :fetchDaysFn="fetchDays"
      :toggleDayFn="toggleDay"
    />
    <!-- Button to register -->
    <v-row>
      <v-col cols="12" class="text-center">
        <v-btn @click="goToRegister">Register</v-btn>
      </v-col>
    </v-row>
    <!-- Dialog for setting calendar name -->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Set Calendar Name</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              v-model="inputCalendarName"
              label="Calendar Name"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="saveCalendarName">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import CalendarComponent from '@/components/CalendarComponent.vue';
import { formatDate } from '@/utils/dateUtils'; // Assume you have a utility function for formatting dates

interface Day {
  _id: string;
  date: string;
  day: string;
  isActive: boolean;
}

const days = ref<Day[]>([]);
const calendarName = ref<string | null>(null);
const inputCalendarName = ref<string | null>(null); // New ref for input field
const dialog = ref<boolean>(false);
const form = ref(null);
const router = useRouter();

function saveDaysToLocalStorage() {
  localStorage.setItem('unregisteredCalendar', JSON.stringify(days.value));
}

function loadDaysFromLocalStorage() {
  const data = localStorage.getItem('unregisteredCalendar');
  if (data) {
    days.value = JSON.parse(data);
  } else {
    initializeDays();
  }
}

function initializeDays() {
  const year = new Date().getFullYear();
  const newDays = [];
  for (let month = 0; month < 12; month++) {
    for (let day = 1; day <= 31; day++) {
      const date = new Date(year, month, day);
      if (date.getMonth() === month) {
        const formattedDate = formatDate(date);
        const dayOnly = date.getDate().toString().padStart(2, '0');
        newDays.push({
          _id: `${year}-${(month + 1).toString().padStart(2, '0')}-${dayOnly}`,
          date: formattedDate,
          day: dayOnly,
          isActive: false
        });
      }
    }
  }
  days.value = newDays;
  saveDaysToLocalStorage();
}

function toggleDay(id: string) {
  const day = days.value.find(d => d._id === id);
  if (day) {
    day.isActive = !day.isActive;
    saveDaysToLocalStorage();
  }
}

function goToRegister() {
  router.push({ name: 'Auth' });
}

function saveCalendarName() {
  if (form.value.validate()) {
    localStorage.setItem('calendarName', inputCalendarName.value as string);
    calendarName.value = inputCalendarName.value; // Update calendarName after saving
    dialog.value = false;
  }
}

function checkCalendarName() {
  const name = localStorage.getItem('calendarName');
  if (name) {
    calendarName.value = name;
  } else {
    dialog.value = true;
  }
}

function fetchDays() {
  loadDaysFromLocalStorage();
  return { days: days.value, calendarName: calendarName.value };
}

onMounted(() => {
  checkCalendarName();
});
</script>
