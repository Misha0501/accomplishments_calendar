<template>
  <v-container>
    <v-row>
      <!-- Display the days of the calendar -->
      <v-col
        v-for="day in days"
        :key="day._id"
        cols="12" sm="6" md="4"
      >
        <v-card
          class="pa-4"
          outlined
          @click="toggleDay(day._id)"
        >
          <v-card-title>{{ day.date }}</v-card-title>
          <v-card-text>
            <v-btn :color="day.isActive ? 'green' : 'grey'" block>
              {{ day.isActive ? 'Active' : 'Inactive' }}
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

const route = useRoute();
const days = ref([]);
const calendarId = route.params.id;

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
      days.value = response.data;
    } catch (error) {
      console.error("Error fetching days:", error);
    }
  } else {
    console.error("User is not authenticated");
  }
}

async function toggleDay(dayId) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    try {
      const token = await user.getIdToken();
      const response = await axios.post(`/api/calendars/${calendarId}/days/toggle`, {
        _id: dayId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const updatedDay = response.data;
      const index = days.value.findIndex(day => day._id === updatedDay._id);
      if (index !== -1) {
        days.value[index].isActive = updatedDay.newStatus;
      }
    } catch (error) {
      console.error("Error toggling day:", error);
    }
  } else {
    console.error("User is not authenticated");
  }
}

onMounted(() => {
  fetchDays();
});
</script>
