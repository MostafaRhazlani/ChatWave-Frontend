import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import axios from 'axios';

const router = createRouter({
  history: createWebHistory(),
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
        role: ['user'],
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
        role: ['user'],
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
        role: ['user'],
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
        role: ['user'],
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
        role: ['user'],
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
        role: ['user', 'admin'],
        showSidebar: true,
        showHeader: true
      },
    },
    {
      path: '/saves/posts',
      name: 'SavesPosts',
      component: () => import('../views/pages/SavesPostsVue.vue'),
      meta: {
        requiresAuth: true,
        role: ['user'],
        showSidebar: true,
        showHeader: true
      },
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../views/pages/admin/DashboardVue.vue'),
      meta: {
        requiresAuth: true,
        role: ['admin'],
        showSidebar: true,
        showHeader: true
      },
    },
    {
      path: '/admin/posts',
      name: 'AdminPosts',
      component: () => import('../views/pages/admin/PostsVue.vue'),
      meta: {
        requiresAuth: true,
        role: ['admin'],
        showSidebar: true,
        showHeader: true
      },
    },
    {
      path: '/admin/users',
      name: 'AdminUsers',
      component: () => import('../views/pages/admin/UsersVue.vue'),
      meta: {
        requiresAuth: true,
        role: ['admin'],
        showSidebar: true,
        showHeader: true
      },
    },
    {
      path: '/admin/tags',
      name: 'AdminTags',
      component: () => import('../views/pages/admin/TagsVue.vue'),
      meta: {
        requiresAuth: true,
        role: ['admin'],
        showSidebar: true,
        showHeader: true
      },
    },
    {
      path: '/authorization',
      name: 'Authorization',
      component: () => import('../views/pages/AuthorizationVue.vue'),
      meta: {
        requiresAuth: true,
        showSidebar: true,
        showHeader: true
      },
    },
  ],
});


router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const token = authStore.token;

  if (to.meta.requiresAuth) {
    
    if(!token) {
      return next({ name: 'Login' });
    }

    try {
      const response = await axios.get('/check-user-auth');
      const user = response.data.user;
      const role = user.role;
      authStore.setUser(user);
      authStore.userRole = role;

      if(user.is_banned === true) {
        return next({ name: 'Login' });
      }

      if(to.meta.role && !to.meta.role.includes(role)) {
        if(to.name !== 'Authorization') {
          return next({ name: 'Authorization' });
        }
      }
      return next();

    } catch (error) {
      authStore.logout();
      return next({ name: 'Login' });
    }
  } else {
    return next();
  }
});

export default router;
