import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
import ProfileView from '@/views/ProfileView.vue'
import CalendarView from '@/views/CalendarView.vue'
import { inject } from 'vue';
import type { IAuthService } from '@/interfaces/IAuthService'
import UserCalendars from '@/components/UserCalendars.vue'
import ProfileInfo from '@/components/ProfileInfo.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/profile',
    component: ProfileView,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'info',
        name: 'ProfileInfo',
        component: ProfileInfo
      },
      {
        path: 'calendars',
        name: 'UserCalendars',
        component: UserCalendars
      }
    ]
  },
  {
    path: '/calendar/:id',
    name: 'CalendarView',
    component: CalendarView,
    meta: { requiresAuth: true }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: AuthView
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// Use a function to inject the authService
const getAuthService = (): IAuthService => {
  return inject<IAuthService>('authService') as IAuthService;
};

router.beforeEach(async (to, from, next) => {
  const authService = getAuthService();

  // Wait for the auth state to be resolved
  await authService.getAuthState();

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if the user is authenticated
    if (!authService.isAuthenticated()) {
      next({ name: 'Auth' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
