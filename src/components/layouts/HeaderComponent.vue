<script setup>
    import { useAuthStore } from '@/store/auth';
    import { useSidebarStore } from '@/store/sidebarStore';
    import { Bell, MessageSquareText } from 'lucide-vue-next';
    import CardAccount from '../CardAccountComponent.vue';
    import { ref } from 'vue';

    const authStore = useAuthStore();
    const sidebarStore = useSidebarStore();
    const isCardVisible = ref(false);

    const dropdawnAccount = () => {
        isCardVisible.value = !isCardVisible.value;  
    }

    // Toggle notification
    const toggleNotification = () => {
        sidebarStore.toggleNotification();
    };
</script>

<template>
    <div class="fixed z-30 top-0 bg-slate-800 opacity-96 p-3 w-full h-18 md:hidden flex items-center justify-between">
        <div class="flex items-center">
            <div class="font-bold text-lg flex items-center gap-3">
                <img width="40" height="40" src="/images/logo-chatwave.png" alt="">
            </div>
        </div>
        <div class="flex">
            <div @click="toggleNotification" :class="{ 'bg-slate-700 rounded-md' : sidebarStore.isNotificationOpen }" class="p-2 hover:bg-gray-700 rounded-md flex items-center space-x-3 cursor-pointer">
                <Bell :size="30" :stroke-width="1.5"/>
            </div>
            <div class="p-2 hover:bg-gray-700 rounded-md flex items-center cursor-pointer">
                <RouterLink to="/messages">
                    <MessageSquareText :size="30" :stroke-width="1.5"/>
                </RouterLink>
            </div>

            <div class="relative">
                <transition name="fade">
                    <CardAccount class="top-16 right-0" v-if="isCardVisible"/>
                </transition>
                
                <div class="flex items-center ml-4" @click="dropdawnAccount">
                    <img :src="`http://127.0.0.1:8000/storage/images/${authStore.user.image}`" alt="Profile" class="w-12 h-12 rounded-full mr-2" />
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.5s;
    }
    .fade-enter-from, .fade-leave-to {
        opacity: 0;
    }
</style>