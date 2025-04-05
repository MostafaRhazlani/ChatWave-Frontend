<script setup>
    import { Search } from 'lucide-vue-next';
    import { useNotificationsStore } from '@/store/notificationsStore';

    const notificationsStore = useNotificationsStore();

    const notifications = [
        { owner: 'Othmane Rhazlani', content: "sent you a new message"},
        { owner: 'Othmane Rhazlani', content: "sent you a new message"},
        { owner: 'Othmane Rhazlani', content: "sent you a new message"},
        { owner: 'Othmane Rhazlani', content: "sent you a new message"},
        { owner: 'Othmane Rhazlani', content: "sent you a new message"},
        { owner: 'Othmane Rhazlani', content: "sent you a new message"},
        { owner: 'Othmane Rhazlani', content: "sent you a new message"},
        { owner: 'Othmane Rhazlani', content: "sent you a new message"},
        { owner: 'Othmane Rhazlani', content: "sent you a new message"},
        { owner: 'Othmane Rhazlani', content: "sent you a new message"},
    ]
</script>

<template>
    <div :class="notificationsStore.isNotificationOpen ? 'translate-x-0' : '-translate-x-full'" class="w-80 h-full border-r md:border-x border-gray-700 flex flex-col bg-slate-800 transition-transform duration-300 ease-in-out">
        <div class="p-4">
            <h2 class="text-white text-2xl font-semibold mb-2">Notifications</h2>
        </div>

        <!-- Notifications -->
        <div class="overflow-y-auto p-2 space-y-1">
            <div v-for="(notification, index) in notifications" :key="index" class="p-2 cursor-pointer hover:bg-slate-700 rounded-lg transition-colors">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0">
                        <img src="" alt="" class="w-full h-full rounded-full" />
                    </div>
                    <div class="min-w-52">
                        <div class="flex justify-between items-center">
                            <p class="text-white font-medium text-[13px]">{{ notification.owner }} <span class="font-light">{{ notification.content }}</span></p>
                        </div>
                        <span class="text-gray-400 text-xs">2h ago</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="mb-20">
    </div>
</template>

<style>
</style>