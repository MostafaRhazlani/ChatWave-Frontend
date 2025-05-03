<!-- src/components/UserBanStatus.vue -->
<template>
    <div class="cursor-pointer" @click="toggleBanUser">
        <template v-if="isLoading">
            <div class="w-full">
                <SpinnerComponent class="w-5 h-5" />
            </div>
        </template>
        <template v-else>
            <span v-if="isBanned"
                class="px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30">
                Banned
            </span>
            <span v-else class="px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400">
                Not Banned
            </span>
        </template>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import SpinnerComponent from '@/components/SpinnerComponent.vue';

const props = defineProps({
    userId: Number,
    isBanned: Boolean
});

const emit = defineEmits(['updated']);
const isLoading = ref(false);

const toggleBanUser = async () => {
    if (isLoading.value) return;
    isLoading.value = true;

    try {
        await axios.patch(`user/${props.userId}/ban`);
        emit('updated');
    } catch (error) {
        console.error('Failed to toggle ban', error);
    } finally {
        isLoading.value = false;
    }
};
</script>