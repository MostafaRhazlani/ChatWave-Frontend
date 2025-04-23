import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import axios from 'axios';

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
        requiresAuth: true, 
        role: 'user',
        showSidebar: true,
        showHeader: true
      },
    },
    {
      path: '/videos',
      name: 'Videos',
      component: () => import('../views/pages/VideosVue.vue'),
      meta: {
        requiresAuth: true, 
        role: 'user',
        showSidebar: true,
        showHeader: true
      },
    },
    {
      path: '/messages/:id',
      name: 'Messages',
      component: () => import('../views/pages/MessagesVue.vue'),
      meta: {
        requiresAuth: true, 
        role: 'user',
        showSidebar: true,
        showHeader: true
      },
    },
    {
      path: '/peoples',
      name: 'Peoples',
      component: () => import('../views/pages/PeoplesVue.vue'),
      meta: {
        requiresAuth: true, 
        role: 'user',
        showSidebar: true,
        showHeader: true
      },
    },
    {
      path: '/pages',
      name: 'Pages',
      component: () => import('../views/pages/PagesVue.vue'),
      meta: {
        requiresAuth: true,
        role: 'user',
        showSidebar: true,
        showHeader: true
      },
    },
    {
      path: '/page/:id',
      name: 'DetailsPage',
      component: () => import('../views/pages/DetailsPageVue.vue'),
      meta: {
        requiresAuth: true, 
        role: 'user',
        showSidebar: true,
        showHeader: true
      },
    },
    {
      path: '/profile/:id',
      name: 'Profile',
      component: () => import('../views/pages/ProfileVue.vue'),
      meta: {
        requiresAuth: true,
        role: 'user',
        showSidebar: true,
        showHeader: true
      },
    },
    {
      path: '/account/settings',
      name: 'AccountSettings',
      component: () => import('../views/pages/AccountSettingsVue.vue'),
      meta: {
        requiresAuth: true,
        role: 'user',
        showSidebar: true,
        showHeader: true
      },
    },
  ],
});


router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const token = authStore.token;
  const userRole = authStore.userRole;

  if (to.meta.requiresAuth) {
    
    if(!token) {
      return next({ name: 'Login' });
    }

    try {
      const response = await axios.get('/check-user-auth');

      authStore.setUser(response.data.user);
      next();

    } catch (error) {
      authStore.logout();
      return next({ name: 'Login' });
    }
    if (to.name !== 'login') {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
