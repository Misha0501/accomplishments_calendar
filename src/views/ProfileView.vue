<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <v-navigation-drawer app permanent>
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
      <v-col cols="9">
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

<style scoped>
.v-navigation-drawer {
  height: 100vh;
}
</style>
