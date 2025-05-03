<template>
    <div @click="toggleStatus" class="cursor-pointer">
        <template v-if="isLoading">
            <div class="w-full">
                <SpinnerComponent class="w-5 h-5" />
            </div>
        </template>
        <template v-else>
            <span v-if="post.is_banned === true"
                class="px-2 py-1 rounded-full text-xs bg-red-500/20 text-red-500 hover:bg-red-500/30">
                Stopped
            </span>
            <span v-else class="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400 hover:bg-green-500/30">
                Published
            </span>
        </template>
    </div>
</template>

<script setup>
import SpinnerComponent from '@/components/SpinnerComponent.vue';
import { ref } from 'vue';
import axios from 'axios';
// import { useApiStore } from '@/store/apiStore';

const props = defineProps({
    post: Object
});

const emit = defineEmits(['statusUpdated']);
// const apiStore = useApiStore();
const isLoading = ref(false);

const toggleStatus = async () => {
    if (isLoading.value) return;
    isLoading.value = true;
    try {
        await axios.patch(`post/${props.post.id}/status`);
        // await apiStore.postsList(false);
        emit('statusUpdated');
    } catch (error) {
        console.log('Error while toggling status:', error);
    } finally {
        isLoading.value = false;
    }
};
</script>