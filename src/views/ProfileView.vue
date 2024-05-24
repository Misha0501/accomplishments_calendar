<template>
  <v-container fluid>
    <v-row>
      <!-- Navigation for larger screens -->
      <v-col class="d-none d-md-block" cols="12" md="3">
        <v-navigation-drawer
          v-model="drawer"
          app
          permanent
          hide-overlay
          class="v-navigation-drawer--close"
        >
          <v-list dense>
            <v-list-item-group v-model="selectedItem">
              <v-list-item
                v-for="(item, index) in items"
                :key="index"
                @click="navigateTo(item.route)"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
      </v-col>
      <!-- Navigation for smaller screens -->
      <v-col class="d-md-none" cols="12">
        <v-toolbar dense flat>
          <v-tabs
            v-model="selectedItem"
            show-arrows
            align-with-title
            background-color="primary"
            grow
            dark
          >
            <v-tab
              v-for="(item, index) in items"
              :key="index"
              @click="navigateTo(item.route)"
            >
              {{ item.title }}
            </v-tab>
          </v-tabs>
        </v-toolbar>
      </v-col>
      <v-col cols="12" md="9">
        <router-view></router-view>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth } from 'firebase/auth';

const router = useRouter();

const items = [
  { title: 'Profile', route: '/profile/info' },
  { title: 'Calendars', route: '/profile/calendars' },
  { title: 'Log out', route: '/logout' }
];

const selectedItem = ref(0);
const drawer = ref(true);

const navigateTo = (route) => {
  if (route === '/logout') {
    logout();
  } else {
    router.push(route);
  }
};

const logout = async () => {
  const auth = getAuth();
  await auth.signOut();
  router.push('/');
};
</script>

<style>
.v-main {
  padding-left: 0;
}

</style>
