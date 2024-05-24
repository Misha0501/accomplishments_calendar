<template>
  <v-container>
    <v-row>
      <!-- Card for creating a new calendar -->
      <v-col cols="12" sm="6" md="4">
        <v-card
          class="d-flex justify-center align-center"
          outlined
          elevation="2"
          @click="showDialog"
          style="height: 116px; cursor: pointer;"
        >
          <Plus />
        </v-card>
      </v-col>

      <!-- Existing calendars -->
      <v-col
        v-for="calendar in calendars"
        :key="calendar._id"
        cols="12" sm="6" md="4"
      >
        <v-card
          class="pa-4"
          outlined
          @click="goToCalendar(calendar._id)"
        >
          <v-card-title>{{ calendar.name }}</v-card-title>
          <v-card-text>
            Click to view details.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialog for creating a new calendar -->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Create New Calendar</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              v-model="newCalendarName"
              label="Calendar Name"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="submitForm">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import Plus from '@/components/icons/Plus.vue';
import { onMounted, ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import type { IAuthService } from '@/interfaces/IAuthService';

const router = useRouter();
const calendars = ref([]);
const dialog = ref(false);
const newCalendarName = ref('');
const form = ref(null);
const authService = inject<IAuthService>('authService');

async function fetchCalendars() {
  const user = authService?.getCurrentUser();

  if (user) {
    try {
      const token = await user.getIdToken();
      const response = await axios.get('/api/calendars/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      calendars.value = response.data;
    } catch (error) {
      console.error("Error fetching calendars:", error);
    }
  } else {
    console.error("User is not authenticated");
  }
}

function showDialog() {
  dialog.value = true;
}

function closeDialog() {
  dialog.value = false;
  newCalendarName.value = '';
}

async function submitForm() {
  if (form.value.validate()) {
    await createNewCalendar();
    closeDialog();
  }
}

async function createNewCalendar() {
  const user = authService?.getCurrentUser();

  if (user) {
    try {
      const token = await user.getIdToken();
      const response = await axios.post('/api/calendars/create', {
        name: newCalendarName.value
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const newCalendar = response.data.calendar;
      calendars.value.push(newCalendar);
      console.log("New calendar created:", newCalendar);
      router.push({ name: 'CalendarView', params: { id: newCalendar._id } });
    } catch (error) {
      console.error("Error creating calendar:", error);
    }
  } else {
    console.error("User is not authenticated");
  }
}

function goToCalendar(calendarId) {
  router.push({ name: 'CalendarView', params: { id: calendarId } });
}

onMounted(() => {
  fetchCalendars();
});
</script>
