import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/RegisterVue.vue'),
    },
    {
      path: '/login',
      name: 'login',
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
  ],
});

export default router;
