<template>
  <v-container class="max-w-screen-md mx-auto p-4">
    <CalendarComponent
      :initialDays="days"
      :initialCalendarName="calendarName ?? ''"
      :fetchDaysFn="fetchDays"
      :toggleDayFn="toggleDay"
    />
    <!-- Dialog for setting calendar name -->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Create new calendar</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              v-model="inputCalendarName"
              :rules="[v => !!v || 'Calendar Name is required']"
              label="Calendar Name"
              required
              :error-messages="calendarNameErrorMessages"
              @input="clearError"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click="saveCalendarName">Save</v-btn>
        </v-card-actions>
        <v-card-actions v-if="!isAuthenticated">
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" @click="goToRegister">Login/Register</v-btn>
        </v-card-actions>
        <v-card-actions v-if="isAuthenticated">
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click="viewCalendars">View Calendars</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import CalendarComponent from '@/components/CalendarComponent.vue';
import { formatDate } from '@/utils/dateUtils';
import type { IAuthService } from '@/interfaces/IAuthService';
import type { ApplicationUser } from '@/types/ApplicationUser';
import type { Day } from '@/types/Day';

const days = ref<Day[]>([]);
const calendarName = ref<string | null>(null);
const inputCalendarName = ref<string | null>(null);
const dialog = ref<boolean>(false);
const form = ref(null);
const calendarNameErrorMessages = ref<string[]>([]);
const router = useRouter();
const authService = inject<IAuthService>('authService');
const isAuthenticated = ref<boolean>(false);

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

function openDialog() {
  dialog.value = true;
}

function goToRegister() {
  router.push({ name: 'Auth' });
}

function viewCalendars() {
  router.push({ name: 'UserCalendars' });
}

function clearError() {
  calendarNameErrorMessages.value = [];
}

async function saveCalendarName() {
  if (!inputCalendarName.value) {
    calendarNameErrorMessages.value = ['Calendar Name is required'];
    return; // Do not submit if the field is empty
  }
  if (form.value.validate()) {
    if (isAuthenticated.value && authService?.getCurrentUser()) {
      try {
        const token = await (authService?.getCurrentUser() as ApplicationUser).getIdToken();
        const response = await axios.post('/api/calendars/create', { name: inputCalendarName.value }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        router.push(`/calendar/${response.data.calendar._id}`);
      } catch (error) {
        console.error("Error creating calendar:", error);
      }
    } else {
      localStorage.setItem('calendarName', inputCalendarName.value);
      calendarName.value = inputCalendarName.value;
      dialog.value = false;
    }
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

onMounted(async () => {
  checkCalendarName();
  await authService?.getAuthState();
  isAuthenticated.value = authService?.isAuthenticated() ?? false;
});
</script>
