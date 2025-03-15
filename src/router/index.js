import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/store/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/auth/RegisterVue.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/auth/LoginVue.vue'),
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/pages/HomeVue.vue'),
      meta: {
        showSidebar: true,
        showHeader: true
      },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/pages/ProfileVue.vue'),
      meta: {
        requiresAuth: true, 
        role: 'user', 
        showSidebar: true,
        showHeader: true
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const token = authStore.token;
  const userRole = authStore.userRole;

  if (to.meta.requiresAuth && !token) {
    if (to.name !== 'login') {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else if (to.meta.role && to.meta.role !== userRole) {
    if (to.name !== 'Home') {
      next({ name: 'Home' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
