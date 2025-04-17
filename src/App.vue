<script setup>
import { RouterView } from 'vue-router';
import LoderComponent from '@/components/LoaderComponent.vue';
import Sidebar from '@/components/layouts/SidebarComponent.vue';
import Header from '@/components/layouts/HeaderComponent.vue';
import { useRoute } from 'vue-router';
import { useApiStore } from './store/apiStore';

const apiStore = useApiStore();
const route = useRoute();
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
