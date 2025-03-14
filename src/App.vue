<script setup>
import { RouterView } from 'vue-router';
import Sidebar from '@/components/layouts/SidebarComponent.vue';
import Header from '@/components/layouts/HeaderComponent.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
    <Sidebar v-if="route.meta.showSidebar"/>
    <Header v-if="route.meta.showHeader"/>
    <div class="h-screen flex items-center justify-center bg-slate-900">
      <RouterView />
    </div>
</template>
