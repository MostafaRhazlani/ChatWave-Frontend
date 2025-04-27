<script setup>
    import { ref, onMounted } from 'vue';
    import { useApiStore } from '@/store/apiStore';
    import axios from 'axios';

    const apiStore = useApiStore();

    const clearNotifications = async () => {
        await axios.delete('notifications/clear');
        apiStore.getAllNotifications();
    }

    const markAllNotifactions = async () => {
        await axios.patch('notifications/mark');
        apiStore.getAllNotifications();
    }

    onMounted(() => {
        apiStore.getAllNotifications();
    })
</script>

<template>
    <div class="h-full border-r md:border-x border-gray-700 flex flex-col bg-slate-800 transition-transform duration-300 ease-in-out">
        <div class="p-4">
            <h2 class="text-white text-2xl font-semibold mb-2">Notifications</h2>
            <div class="flex justify-between mt-8">
                <span @click="clearNotifications" class="text-xs transition-colors duration-150 py-1 px-4 bg-slate-700 rounded-full hover:bg-slate-600 border border-gray-700 cursor-pointer">clear all</span>
                <span @click="markAllNotifactions" class="text-xs transition-colors duration-150 py-1 px-4 bg-slate-700 rounded-full hover:bg-slate-600 border border-gray-700 cursor-pointer">mark all</span>
            </div>
        </div>

        <!-- Notifications -->
        <div class="overflow-y-auto p-2 space-y-1">
            <div v-for="(notification, index) in apiStore.notifications" :class="{'bg-slate-700' : notification.is_read}" :key="index" class="p-2 cursor-pointer hover:bg-slate-600 transition-colors duration-150 rounded-lg">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0">
                        <img :src="`http://127.0.0.1:8000/storage/images/${notification.sender.image}`" alt="" class="w-full h-full rounded-full" />
                    </div>
                    <div class="min-w-52">
                        <div class="flex justify-between items-center">
                            <span class="">{{ notification.content }}</span>
                        </div>
                        <span class="text-gray-400 text-xs">{{ notification.created_at }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
</style>