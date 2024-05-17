<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title class="text-h5">Set Your Accomplishment Name</v-card-title>
        <v-card-text>
          <v-text-field v-model="accomplishmentName" label="Accomplishment Name" autofocus></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="saveAccomplishmentName">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <AccomplishmentsCalendar :accomplishment-name="accomplishmentName"/>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AccomplishmentsCalendar from '@/components/AccomplishmentsCalendar.vue';

const dialog = ref(true);
const accomplishmentName = ref(localStorage.getItem('accomplishmentName') || '');

const saveAccomplishmentName = () => {
  localStorage.setItem('accomplishmentName', accomplishmentName.value);
  dialog.value = false;
};

onMounted(() => {
  if (accomplishmentName.value) {
    dialog.value = false;
  }
});
</script>
