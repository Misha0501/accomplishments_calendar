<script setup lang="ts">
import AccomplishmentsCalendar from '@/components/AccomplishmentsCalendar.vue'
</script>

<template>
  <header>
    <div class="">
      <AccomplishmentsCalendar/>
    </div>
    <v-bottom-sheet>
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" text="Click Me"></v-btn>
      </template>

      <v-card
        title="Bottom Sheet"
        text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut, eos? Nulla aspernatur odio rem, culpa voluptatibus eius debitis dolorem perspiciatis asperiores sed consectetur praesentium! Delectus et iure maxime eaque exercitationem!"
      ></v-card>
    </v-bottom-sheet>
  </header>
</template>

<style scoped></style>
