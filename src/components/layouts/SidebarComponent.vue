<script setup>

import router from '@/router';
import { useAuthStore } from '@/store/auth';
import CardAccount from '@/components/CardAccountComponent.vue';
import { ref, watch } from 'vue';

const authStore = useAuthStore();
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
    <div class="w-full md:flex md:flex-col md:items-center md:w-16 lg:w-60 md:h-screen h-16 bg-gray-800 px-2 md:py-6 py-2 fixed left-0 bottom-0">
        <div class="w-full hidden md:flex items-center md:justify-center lg:justify-start mb-16">
            <div class="font-bold text-lg flex items-center gap-3">
                <img width="40" height="40" src="/images/logo-chatwave.png" alt="">
                <span class="text-2xl md:hidden lg:block">ChatWave</span>
            </div>
        </div>

        <div class="flex flex-col justify-between h-full w-full">
            <nav class="flex justify-between md:flex-col gap-2">
                <div class="bg-gray-700 p-2 rounded-md flex justify-center items-center lg:justify-start gap-2 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path
                            d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    <span class="hidden lg:block">Home</span>
                </div>
                <div class="p-2 hover:bg-gray-700 rounded-md flex items-center md:justify-center lg:justify-start gap-2 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path
                            d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm12.553 1.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    </svg>
                    <span class="hidden lg:block">Videos</span>
                </div>
                <div class="hidden md:flex items-center md:justify-center lg:justify-start gap-2 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                        <path
                            d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                    </svg>
                    <span class="hidden lg:block">Messages</span>
                </div>
                <div class="p-2 hover:bg-gray-700 rounded-md flex items-center md:justify-center lg:justify-start gap-2 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clip-rule="evenodd" />
                    </svg>
                    <span class="hidden lg:block">Search</span>
                </div>
                <div class="hidden md:flex items-center md:justify-center lg:justify-start gap-2 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path
                            d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                    </svg>
                    <span class="hidden lg:block">Notification</span>
                </div>
                <div class="p-2 hover:bg-gray-700 rounded-md flex items-center md:justify-center lg:justify-start gap-2 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path
                            d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    <span class="hidden lg:block">People</span>
                </div>
                <div class="p-2 hover:bg-gray-700 rounded-md flex items-center md:justify-center lg:justify-start gap-2 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path
                            d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                    </svg>
                    <span class="hidden lg:block">Pages</span>
                </div>
                <div class="p-2 hover:bg-gray-700 rounded-md flex items-center md:justify-center lg:justify-start gap-2 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clip-rule="evenodd" />
                    </svg>
                    <span class="hidden lg:block">Profile</span>
                </div>
            </nav>

            <!-- card account -->
            <div class="relative hidden md:block">
                <transition name="fade">
                    <CardAccount v-if="isCardVisible" class="-top-74" />
                </transition>

                 <!-- account -->
                <div @click="dropdawnAccount" class="flex justify-center px-2 cursor-pointer">
                    <img src="https://i.pravatar.cc/40?img=12" alt="Profile" class="w-8 h-8 rounded-full lg:mr-3" />
                    <div class="hidden lg:flex items-center justify-between w-full">
                        <span class="hidden lg:block">{{ authStore.user.full_name }}</span>
                        <span class="hidden lg:block"><i :class="typeArrow" class="fa-solid fa-chevron-right duration-150"></i></span>
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