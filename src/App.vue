<script setup>
import { RouterView } from 'vue-router';
import Sidebar from '@/components/layouts/SidebarComponent.vue';
import Header from '@/components/layouts/HeaderComponent.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
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
