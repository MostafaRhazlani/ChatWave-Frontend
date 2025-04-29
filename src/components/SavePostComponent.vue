<script setup>
    import axios from 'axios';
    import { defineProps, ref } from 'vue';
    import { Star } from 'lucide-vue-next';
    import { useApiStore } from '@/store/apiStore';

    const isLoading = ref(false);
    const apiStore = useApiStore();
    const props = defineProps({
        postId: Number,
        isSaved: Boolean,
        savesCount: Number
    })
    const toggleSavePost = async (postId) => {
        if(isLoading.value) return
        isLoading.value = true;
        try {
            await axios.post(`save/${postId}/post`);
            apiStore.postsList(false);
            if(apiStore.showModal === true) {
                apiStore.openModelDetailsPost(props.postId);
            }
        } catch (error) {
            console.log("Error fetching save post", error);
        } finally {
            isLoading.value = false;
        }
    }
</script>

<template>
    <div class="flex items-center gap-1">
        <button @click="toggleSavePost(props.postId)" class="cursor-pointer flex items-center justify-center rounded-full">
            <Star :class="[ props.isSaved ? 'fill-white' : 'text-whate' ]" :size="28" stroke-width="1.6" class="hover:scale-110 transition-transform duration-150 ease-in-out" />
        </button>
        <span class="text-sm ml-1">{{ props.savesCount }}</span>
    </div>
</template>

<style>
    
</style>