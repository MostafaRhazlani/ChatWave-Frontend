<script setup>

import { House, TvMinimalPlay, Search, Users, User, Layers2, Bell, MessageSquareText, ChevronRight } from 'lucide-vue-next';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import CardAccount from '@/components/CardAccountComponent.vue';
import { ref, watch } from 'vue';

const authStore = useAuthStore();
const route = useRoute();
const isCardVisible = ref(false);
const typeArrow = ref("rotate-0");

const dropdawnAccount = () => {
    isCardVisible.value = !isCardVisible.value;  
}

watch(isCardVisible, (newValue) => {
    typeArrow.value = newValue ? "-rotate-90" : "rotate-0";
});


</script>

<template lang="">
    <!-- Left sidebar -->
    <div class="w-full md:flex md:flex-col md:items-center md:w-16 lg:w-72 md:h-screen h-16 bg-slate-800 px-2 md:py-6 py-2 fixed z-30 md:static left-0 bottom-0">
        <div class="w-full hidden md:flex items-center md:justify-center lg:justify-start mb-16">
            <div class="font-bold text-lg flex items-center gap-3">
                <img width="40" height="40" src="/images/logo-chatwave.png" alt="">
                <span class="text-2xl md:hidden lg:block">ChatWave</span>
            </div>
        </div>

        <div class="flex flex-col justify-between h-full w-full">
            <nav class="flex justify-between md:flex-col gap-2">
                <div :class="{ 'bg-slate-700 rounded-md' : route.name === 'Home' }">  
                    <RouterLink to="/" class="flex p-2 hover:bg-slate-700 rounded-md items-center md:justify-center lg:justify-start gap-2 cursor-pointer">
                        <House :size="30" :stroke-width="1.5"/>
                        <span class="hidden lg:block">Home</span>
                    </RouterLink>
                </div>
                <div :class="{ 'bg-slate-700 rounded-md' : route.name === 'Videos' }">  
                    <RouterLink to="/videos" class="flex p-2 hover:bg-slate-700 rounded-md items-center md:justify-center lg:justify-start gap-2 cursor-pointer">
                        <TvMinimalPlay :size="30" :stroke-width="1.5"/>
                        <span class="hidden lg:block">Videos</span>
                    </RouterLink>
                </div>
                <div :class="{ 'bg-slate-700 rounded-md' : route.name === 'Messages' }">  
                    <RouterLink to="/messages" class="flex p-2 hover:bg-slate-700 rounded-md items-center md:justify-center lg:justify-start gap-2 cursor-pointer">
                        <MessageSquareText :size="30" :stroke-width="1.5"/>
                        <span class="hidden lg:block">Messages</span>
                    </RouterLink>
                </div>
                <div class="p-2 hover:bg-slate-700 rounded-md flex items-center md:justify-center lg:justify-start gap-2 cursor-pointer">
                    <Search :size="30" :stroke-width="1.5"/>
                    <span class="hidden lg:block">Search</span>
                </div>
                <div class="hidden md:flex items-center md:justify-center lg:justify-start gap-2 p-2 hover:bg-slate-700 rounded-md cursor-pointer">
                    <Bell :size="30" :stroke-width="1.5"/>
                    <span class="hidden lg:block">Notification</span>
                </div>
                <div :class="{ 'bg-slate-700 rounded-md' : route.name === 'Peoples' }">  
                    <RouterLink to="/peoples" class="flex p-2 hover:bg-slate-700 rounded-md items-center md:justify-center lg:justify-start gap-2 cursor-pointer">
                        <Users :size="30" :stroke-width="1.5"/>
                        <span class="hidden lg:block">People</span>
                    </RouterLink>
                </div>
                <div class="p-2 hover:bg-slate-700 rounded-md flex items-center md:justify-center lg:justify-start gap-2 cursor-pointer">
                    <Layers2 :size="30" :stroke-width="1.5"/>
                    <span class="hidden lg:block">Pages</span>
                </div>
                <div :class="{ 'bg-slate-700 rounded-md' : route.name === 'Profile' }">    
                    <RouterLink to="/profile" class="flex p-2 hover:bg-slate-700 rounded-md items-center md:justify-center lg:justify-start gap-2 cursor-pointer">
                        <User :size="30" :stroke-width="1.5"/>
                        <span class="hidden lg:block">Profile</span>
                    </RouterLink>
                </div>
            </nav>

            <!-- card account -->
            <div class="relative hidden md:block">
                <transition name="fade">
                    <CardAccount v-if="isCardVisible" class="-top-80" />
                </transition>

                 <!-- account -->
                <div @click="dropdawnAccount" class="flex justify-center px-2 cursor-pointer">
                    <img :src="`http://127.0.0.1:8000/storage/images/${authStore.user.image}`" alt="Profile" class="w-8 h-8 rounded-full lg:mr-3" />
                    <div class="hidden lg:flex items-center justify-between gap-3 w-full">
                        <span class="hidden lg:block">{{ authStore.user.full_name }}</span>
                        <span class="hidden lg:block duration-150" :class="typeArrow"><ChevronRight /></span>
                    </div>
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