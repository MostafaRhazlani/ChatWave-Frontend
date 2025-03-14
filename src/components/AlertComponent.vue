<template>
    <div v-if="alertVisible" :class="alertClass" class="w-4/5 md:w-3/6 lg:w-2/6 flex items-center justify-between absolute top-2 right-2 px-3 py-2 text-white font-bold rounded-xl">
        <div class="flex items-center gap-4">
            <div class="px-2 py-1 drop-shadow-[0px_0px_2px_rgba(255,255,255)] text-2xl rounded-xl"
                :class="iconClass">
                <span><i :class="icon"></i></span>
            </div>
            <h1 class="text-md font-semibold text-gray-800" v-if="alertMessage">{{ alertMessage }}</h1>
        </div>
        <div @click="clearAlert" class="px-1 rounded duration-300 cursor-pointer hover:bg-opacity-30">
            <span class="text-gray-800"><i class="fa-solid fa-xmark"></i></span>
        </div>
    </div>
</template>

<script setup>
    import { useAlertStore } from '@/store/alert';
    import { computed } from 'vue';

    const alertStore = useAlertStore();

    const alertVisible = computed(() => alertStore.visible);
    const alertMessage = computed(() => alertStore.message);
    const alertType = computed(() => alertStore.type);

    const alertClass = computed(() => {
        return {
            success: 'bg-white',
            error: 'bg-white',
            warning: 'bg-white'
        }[alertType.value]
    });

    const iconClass = computed(() => {
        return {
            success: "bg-green-400",
            error: "bg-red-400",
            warning: "bg-yellow-400",
        }[alertType.value]
    });

    const icon = computed(() => {
        return {
            success: "fa-solid fa-circle-check",
            error: "fa-solid fa-triangle-exclamation",
            warning: "fa-solid fa-exclamation-circle",
        }[alertType.value]
    });

    function clearAlert() {
        alertStore.clearAlert();
    }
</script>
