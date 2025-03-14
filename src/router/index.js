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
  ],
});

export default router;
