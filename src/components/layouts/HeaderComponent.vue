<script setup>
    import CardAccount from '../cardAccountComponent.vue';
    import { ref } from 'vue';

    const isCardVisible = ref(false);

    const dropdawnAccount = () => {
        isCardVisible.value = !isCardVisible.value;  
    }
</script>

<template>
    <div class="fixed top-0 bg-slate-800 opacity-96 p-3 w-full h-18 md:hidden flex items-center justify-between">
        <div class="flex items-center">
            <div class="font-bold text-lg flex items-center gap-3">
                <img width="40" height="40" src="/images/logo-chatwave.png" alt="">
            </div>
        </div>
        <div class="flex">
            <div class="p-2 hover:bg-gray-700 rounded-md flex items-center space-x-3 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                        d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
            </div>
            <div class="p-2 hover:bg-gray-700 rounded-md flex items-center cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                    <path
                        d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
            </div>

            <div class="relative">
                <transition name="fade">
                    <CardAccount class="top-16 right-0" v-if="isCardVisible"/>
                </transition>
                
                <div class="flex items-center ml-4" @click="dropdawnAccount">
                    <img src="https://i.pravatar.cc/40?img=12" alt="Profile" class="w-12 h-12 rounded-full mr-2" />
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