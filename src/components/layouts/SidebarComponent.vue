<script setup>

import { House, TvMinimalPlay, Search, Users, User, Layers2, Bell, MessageSquareText, ChevronRight, LayoutDashboard, FileTextIcon, Tags } from 'lucide-vue-next';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import { useSidebarStore } from '@/store/sidebarStore.js';
import { useApiStore } from '@/store/apiStore';
import CardAccount from '@/components/CardAccountComponent.vue';
import Notification from '@/views/pages/NotificationVue.vue';
import SearchVue from '@/views/pages/SearchVue.vue';
import { onMounted, ref, watch, computed } from 'vue';

const authStore = useAuthStore();
const sidebarStore = useSidebarStore();
const apiStore = useApiStore();
const route = useRoute();
const isCardVisible = ref(false);
const sidebarWidth = ref('lg:w-80');
const statusSidebar = ref('');
const statusLayout = ref('')
const typeArrow = ref("rotate-0");

const dropdawnAccount = () => {
    isCardVisible.value = !isCardVisible.value;  
}

watch(isCardVisible, (newValue) => {
    typeArrow.value = newValue ? "-rotate-90" : "rotate-0";
});

const hasUnreadNotifications = computed(() => {
    return apiStore.notifications.some(notification => notification.is_read === false);
});

const hasUnreadMessages = computed(() => {
        return apiStore.statusMessages.some(status => status.is_read === false);
    });

onMounted(async () => {
    await apiStore.listContacts();
    await apiStore.getAllNotifications();
    
})


// Toggle notification
const toggleNotification = () => {
    sidebarStore.toggleNotification();
    if (sidebarStore.isNotificationOpen || sidebarStore.isSearchOpen) {
        sidebarWidth.value = "lg:w-16";
        statusSidebar.value = "lg:hidden";
        statusLayout.value = "lg:justify-center";
    } else {
        sidebarWidth.value = "lg:w-80";
        statusSidebar.value = "lg:block";
        statusLayout.value = "lg:justify-start";
    }
};

const toggleSearch = () => {
    sidebarStore.toggleSearch();
    if (sidebarStore.isNotificationOpen || sidebarStore.isSearchOpen) {
        sidebarWidth.value = "lg:w-16";
        statusSidebar.value = "lg:hidden";
        statusLayout.value = "lg:justify-center";
    } else {
        sidebarWidth.value = "lg:w-80";
        statusSidebar.value = "lg:block";
        statusLayout.value = "lg:justify-start";
    }
}
</script>

<template lang="">
    <!-- Left sidebar -->
    <div :class="[ sidebarWidth ]" class="duration-300 ease-in-out w-full md:flex md:flex-col md:items-center md:w-16 md:h-screen h-16 bg-slate-800 px-2 md:py-6 py-2 fixed z-30 md:static left-0 bottom-0">
        <div :class="[ statusLayout ]" class="w-full hidden md:flex items-center md:justify-center lg:justify-start mb-16">
            <div class="font-bold text-lg flex items-center gap-3">
                <img width="40" height="40" src="/images/logo-chatwave.png" alt="">
                <span :class="[ statusSidebar ]" class="duration-300 ease-in-out text-2xl md:hidden lg:block">ChatWave</span>
            </div>
        </div>

        <div class="flex flex-col justify-between h-full w-full">
            <nav>
                <div v-if="authStore.userRole === 'user'" class="flex justify-between md:flex-col space-y-1">
                    <div :class="{ 'bg-slate-700 rounded-md' : route.name === 'Home' }">  
                        <RouterLink to="/" class="flex p-2 hover:bg-slate-700 rounded-md items-center md:justify-center lg:justify-start gap-2 cursor-pointer">
                            <House :size="26" :stroke-width="1.5"/>
                            <span :class="[ statusSidebar ]" class="hidden lg:block">Home</span>
                        </RouterLink>
                    </div>
                    <div :class="{ 'bg-slate-700 rounded-md' : route.name === 'Videos' }">  
                        <RouterLink to="/videos" class="flex p-2 hover:bg-slate-700 rounded-md items-center md:justify-center lg:justify-start gap-2 cursor-pointer">
                            <TvMinimalPlay :size="26" :stroke-width="1.5"/>
                            <span :class="[ statusSidebar ]" class="hidden lg:block">Videos</span>
                        </RouterLink>
                    </div>
                    <div :class="{ 'bg-slate-700 rounded-md' : route.name === 'Messages' }">  
                        <RouterLink :to="`/messages/${apiStore.firstFriend}`" class="flex p-2 hover:bg-slate-700 rounded-md items-center md:justify-center lg:justify-start gap-2 cursor-pointer relative">
                            <span v-if="hasUnreadMessages" class="absolute top-1 left-8 w-2 h-2 bg-red-500 rounded-full"></span>
                            <MessageSquareText :size="26" :stroke-width="1.5"/>
                            <span :class="[ statusSidebar ]" class="hidden lg:block">Messages</span>
                        </RouterLink>
                    </div>
                    <div @click="toggleSearch" :class="{ 'bg-slate-700 rounded-md' : sidebarStore.isSearchOpen }" class="flex p-2 hover:bg-slate-700 rounded-md items-center md:justify-center lg:justify-start gap-2 cursor-pointer">
                        <Search :size="26" :stroke-width="1.5"/>
                        <span :class="[ statusSidebar ]" class="hidden lg:block">Search</span>
                    </div>
                    <div @click="toggleNotification" :class="{ 'bg-slate-700 rounded-md' : sidebarStore.isNotificationOpen }" class="hidden md:flex items-center md:justify-center lg:justify-start gap-2 p-2 hover:bg-slate-700 rounded-md cursor-pointer relative">
                        <Bell :size="26" :stroke-width="1.5"/>
                        <span v-if="hasUnreadNotifications" class="absolute top-1 left-8 w-2 h-2 bg-red-500 rounded-full"></span>
                        <span :class="[ statusSidebar ]" class="hidden lg:block">Notification</span>
                    </div>
                    <div :class="{ 'bg-slate-700 rounded-md' : route.name === 'Peoples' }">  
                        <RouterLink to="/peoples" class="flex p-2 hover:bg-slate-700 rounded-md items-center md:justify-center lg:justify-start gap-2 cursor-pointer">
                            <Users :size="26" :stroke-width="1.5"/>
                            <span :class="[ statusSidebar ]" class="hidden lg:block">People</span>
                        </RouterLink>
                    </div>
                    <div :class="{ 'bg-slate-700 rounded-md' : route.params.id == authStore.user.id }">    
                        <RouterLink :to="`/profile/${authStore.user.id}`" class="flex p-2 hover:bg-slate-700 rounded-md items-center md:justify-center lg:justify-start gap-2 cursor-pointer">
                            <User :size="26" :stroke-width="1.5"/>
                            <span :class="[ statusSidebar ]" class="hidden lg:block">Profile</span>
                        </RouterLink>
                    </div>
                </div>
                <div v-else-if="authStore.userRole === 'admin'" class="flex justify-between md:flex-col space-y-1">
                    <div :class="{ 'bg-slate-700 rounded-md' : route.name === 'Dashboard' }">  
                        <RouterLink to="/dashboard" class="flex p-2 hover:bg-slate-700 rounded-md items-center md:justify-center lg:justify-start gap-2 cursor-pointer">
                            <LayoutDashboard absoluteStrokeWidth :size="26" :stroke-width="1.5"/>
                            <span :class="[ statusSidebar ]" class="hidden lg:block">Dashboard</span>
                        </RouterLink>
                    </div>
                    <div :class="{ 'bg-slate-700 rounded-md' : route.name === 'AdminPosts' }">  
                        <RouterLink to="/admin/posts" class="flex p-2 hover:bg-slate-700 rounded-md items-center md:justify-center lg:justify-start gap-2 cursor-pointer">
                            <FileTextIcon absoluteStrokeWidth :size="26" :stroke-width="1.5"/>
                            <span :class="[ statusSidebar ]" class="hidden lg:block">Posts</span>
                        </RouterLink>
                    </div>
                    <div :class="{ 'bg-slate-700 rounded-md' : route.name === 'AdminUsers' }">  
                        <RouterLink to="/admin/users" class="flex p-2 hover:bg-slate-700 rounded-md items-center md:justify-center lg:justify-start gap-2 cursor-pointer">
                            <Users :size="26" :stroke-width="1.5"/>
                            <span :class="[ statusSidebar ]" class="hidden lg:block">Users</span>
                        </RouterLink>
                    </div>
                    <div :class="{ 'bg-slate-700 rounded-md' : route.name === 'AdminTags' }">  
                        <RouterLink to="/admin/tags" class="flex p-2 hover:bg-slate-700 rounded-md items-center md:justify-center lg:justify-start gap-2 cursor-pointer">
                            <Tags absoluteStrokeWidth />
                            <span :class="[ statusSidebar ]" class="hidden lg:block">Tags</span>
                        </RouterLink>
                    </div>
                </div>
            </nav>

            <!-- card account -->
            <div class="relative hidden md:block">
                <transition name="fade">
                    <CardAccount v-if="isCardVisible" class="-top-80" />
                </transition>

                <!-- account -->
                <div @click="dropdawnAccount" class="flex lg:gap-1 justify-center px-2 cursor-pointer">
                    <div class="max-w-10 max-h-10 min-w-10 min-h-10 rounded-full overflow-hidden">
                        <img :src="`http://127.0.0.1:8000/storage/images/${authStore.user.image}`" alt="Profile" class="w-full h-full object-cover" />
                    </div>
                    <div :class="[ statusSidebar ]" class="hidden lg:flex items-center justify-between gap-3 w-full">
                        <span class="hidden lg:block">{{ authStore.user.full_name }}</span>
                        <span class="hidden lg:block duration-150" :class="typeArrow"><ChevronRight /></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <transition name="slide">
        <div v-if="sidebarStore.isNotificationOpen" class="w-80 mt-[4.5rem] md:mt-0 transition-transform duration-300 ease-in-out fixed h-screen top-0 md:left-[3.9rem] z-20">
            <Notification />
        </div>
    </transition>

    <transition name="slide">
        <div v-show="sidebarStore.isSearchOpen" class="w-full sm:w-80 mt-[4.5rem] md:mt-0 transition-transform duration-300 ease-in-out fixed h-screen top-0 md:left-[3.9rem] z-20">
            <SearchVue />
        </div>
    </transition>
</template>

<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.5s;
    }
    .fade-enter-from, .fade-leave-to {
        opacity: 0;
    }

    .slide-enter-active,
    .slide-leave-active {
        transition: transform 0.3s ease-in-out;
    }
    .slide-enter-from,
    .slide-leave-to {
        transform: translateX(-100%);
    }
</style>