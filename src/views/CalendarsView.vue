<template>
  <v-container>
    <v-row>
      <!-- Card for creating a new calendar -->
      <v-col cols="12" sm="6" md="4">
        <v-card
          class="d-flex justify-center align-center"
          outlined
          elevation="2"
          @click="createNewCalendar"
          style="height: 200px; cursor: pointer;"
        >
<!--          <v-icon size="56">mdi-plus</v-icon>-->
        </v-card>
      </v-col>

      <!-- Existing calendars -->
      <v-col
        v-for="calendar in calendars"
        :key="calendar.id"
        cols="12" sm="6" md="4"
      >
        <v-card
          class="pa-4"
          outlined
          @click="goToCalendar(calendar.id)"
        >
          <v-card-title>{{ calendar.name }}</v-card-title>
          <v-card-text>
            Click to view details.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter();
const calendars = ref([]);

// Dummy function to fetch calendars
function fetchCalendars() {
  calendars.value = [
    { id: 1, name: "Personal Goals" },
    { id: 2, name: "Work Projects" }
    // add more calendars as needed
  ];
}

function createNewCalendar() {
  router.push({ name: 'CreateCalendar' });
}

function goToCalendar(calendarId) {
  router.push({ name: 'CalendarDetails', params: { id: calendarId } });
}

onMounted(() => {
  fetchCalendars();
});
</script>
