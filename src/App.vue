<script setup>
import { RouterView } from 'vue-router';
import Sidebar from '@/components/layouts/SidebarComponent.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
    <Sidebar v-if="route.meta.showSidebar"/>
    <div class="h-screen flex items-center justify-center bg-slate-900">
      <RouterView />
    </div>
</template>
