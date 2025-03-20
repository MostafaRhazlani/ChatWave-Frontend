<template>
    <div v-if="alertVisible" :class="alertClass" class="w-[300px] sm:w-[350px] flex items-center justify-between absolute top-20 md:top-2 z-40 right-2 px-3 py-2 text-white font-bold rounded-xl">
        <div class="flex items-center gap-4">
            <div class="w-8 h-8 drop-shadow-[0px_0px_2px_rgba(255,255,255)] text-2xl rounded-xl flex items-center justify-center"
                :class="iconClass">
                <span><component :is="icon" :size="18" :stroke-width="3"/></span>
            </div>
            <h1 class="text-md font-semibold text-gray-800" v-if="alertMessage">{{ alertMessage }}</h1>
        </div>
        <div @click="clearAlert" class="rounded duration-300 cursor-pointer hover:scale-125">
            <span class="text-gray-800"><X :size="17"/></span>
        </div>
    </div>
</template>

<script setup>
    import { useAlertStore } from '@/store/alert';
    import { Check, X, TriangleAlert, CircleX } from 'lucide-vue-next';
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
            error: "bg-red-600",
            warning: "bg-yellow-400",
        }[alertType.value]
    });

    const icon = computed(() => {
        return {
            success: Check,
            error: CircleX,
            warning: TriangleAlert,
        }[alertType.value]
    });

    function clearAlert() {
        alertStore.clearAlert();
    }
</script>
