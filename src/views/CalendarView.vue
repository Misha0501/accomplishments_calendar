<template>
  <CalendarComponent
    :initialDays="days"
    :initialCalendarName="calendarName"
    :fetchDaysFn="fetchDays"
    :toggleDayFn="toggleDay"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { getAuth } from 'firebase/auth'
import CalendarComponent from '@/components/CalendarComponent.vue'

interface Day {
  _id: string;
  date: string;
  day: string;
  isActive: boolean;
}

const route = useRoute();
const days = ref<Day[]>([]);
const calendarId = route.params.id;
const calendarName = ref<string | null>(null);

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
      return { days: response.data.days, calendarName: response.data.calendarName };
    } catch (error) {
      console.error("Error fetching days:", error);
      return { days: [], calendarName: null };
    }
  } else {
    console.error("User is not authenticated");
    return { days: [], calendarName: null };
  }
}

async function toggleDay(dayId: string) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    try {
      const token = await user.getIdToken();
      await axios.post(`/api/calendars/${calendarId}/days/toggle`, {
        _id: dayId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error("Error toggling day:", error);
    }
  } else {
    console.error("User is not authenticated");
  }
}
</script>
