import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import CalendarsView from '../views/CalendarsView.vue'
import AuthView from '../views/AuthView.vue'
import ProfileView from '@/views/ProfileView.vue'
import { inject } from 'vue';
import type { IAuthService } from '@/interfaces/IAuthService'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
  { path: '/calendars', name: 'Calendars', component: CalendarsView },
  { path: '/auth', name: 'Auth', component: AuthView },
  { path: '/profile', name: 'Profile', component: ProfileView, meta: { requiresAuth: true } }
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
