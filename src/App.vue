<script setup>
import { RouterView } from 'vue-router';
import LoderComponent from '@/components/LoaderComponent.vue';
import Sidebar from '@/components/layouts/SidebarComponent.vue';
import Header from '@/components/layouts/HeaderComponent.vue';
import { useRoute } from 'vue-router';
import { useApiStore } from './store/apiStore';
import { useAuthStore } from './store/auth';
import { onMounted } from 'vue';

const apiStore = useApiStore();
const authStore = useAuthStore();
const route = useRoute();

onMounted(async () => {
  window.Echo.private(`comment-post.${authStore.user.id}`)
  .listen('.comment.added', (event) => {
      apiStore.notifications.unshift(event);
    }
  );
  
  window.Echo.private(`post-created.${authStore.user.id}`)
  .listen('.post.created', (event) => {
    apiStore.notifications.unshift(event);
  }
);

window.Echo.private(`chat.${authStore.user.id}`)
  .listen('.message.sent', (event) => {
    if(event.message.receiver_id == authStore.user.id) {
      apiStore.statusMessages.push(event.message);
    }
  }
);

window.Echo.channel('user-status')
  .listen('.user.status', (event) => {
    apiStore.user_status[event.user_status.userId] = event.user_status;
  }
);
await apiStore.getStatusMessage();
})
</script>

<template>

    <LoderComponent v-if="apiStore.isLoading" />
    <Header v-if="route.meta.showHeader"/>
    <div class="flex h-screen">
      <Sidebar v-if="route.meta.showSidebar"/>
      <div class="w-full h-full overflow-y-scroll scrollbar-hide flex items-center justify-center bg-slate-900">
        <div class="w-full h-full">
          <RouterView />
        </div>
      </div>
    </div>
</template>

<style>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
</style>
