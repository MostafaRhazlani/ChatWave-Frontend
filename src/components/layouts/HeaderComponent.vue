<script setup>
    import { useAuthStore } from '@/store/auth';
    import { useSidebarStore } from '@/store/sidebarStore';
    import { Bell, MessageSquareText } from 'lucide-vue-next';
    import CardAccount from '../CardAccountComponent.vue';
    import { useApiStore } from '@/store/apiStore';
    import { useRoute } from 'vue-router';
    import { ref, computed, onMounted } from 'vue';

    const apiStore = useApiStore();
    const authStore = useAuthStore();
    const route = useRoute();
    const sidebarStore = useSidebarStore();
    const isCardVisible = ref(false);

    const hasUnreadNotifications = computed(() => {
        return apiStore.notifications.some(notification => notification.is_read === false);
    });

    const hasUnreadMessages = computed(() => {
        return apiStore.statusMessages.some(status => status.is_read === false);
    });

    const dropdawnAccount = () => {
        isCardVisible.value = !isCardVisible.value;  
    }

    // Toggle notification
    const toggleNotification = () => {
        sidebarStore.toggleNotification();
    };

    onMounted(async () => {
        await apiStore.getAllNotifications();
    })
</script>

<template>
    <div class="fixed z-30 top-0 bg-slate-800 opacity-96 p-3 w-full h-18 md:hidden flex items-center justify-between">
        <div class="flex items-center">
            <div class="font-bold text-lg flex items-center gap-3">
                <img width="40" height="40" src="/images/logo-chatwave.png" alt="">
            </div>
        </div>
        <div class="flex">
            <div @click="toggleNotification" :class="{ 'bg-slate-700 rounded-md' : sidebarStore.isNotificationOpen }" class="relative p-2 hover:bg-gray-700 rounded-md flex items-center cursor-pointer">
                <span v-if="hasUnreadNotifications" class="absolute top-1 left-8 w-2 h-2 bg-red-500 rounded-full"></span>
                <Bell :size="30" :stroke-width="1.5"/>
            </div>
            <RouterLink class="relative p-2 hover:bg-gray-700 rounded-md flex items-center cursor-pointer" :to="`/messages/${apiStore.firstFriend}`">
                <span v-if="hasUnreadMessages" class="absolute top-1 left-8 w-2 h-2 bg-red-500 rounded-full"></span>
                <MessageSquareText :size="30" :stroke-width="1.5"/>
            </RouterLink>

            <div class="relative">
                <transition name="fade">
                    <CardAccount class="top-16 right-0" v-if="isCardVisible"/>
                </transition>
                
                <div class="flex items-center ml-4" @click="dropdawnAccount">
                    <img :src="`http://127.0.0.1:8000/storage/images/${authStore.user.image}`" alt="Profile" class="w-12 h-12 object-cover rounded-full mr-2" />
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