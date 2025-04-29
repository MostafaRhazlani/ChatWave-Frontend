<script setup>
    import axios from 'axios';
    import { defineProps, defineEmits, ref } from 'vue';
    import { Heart } from 'lucide-vue-next';
    import { useApiStore } from '@/store/apiStore';

    const apiStore = useApiStore();
    const props = defineProps({
        isLiked: Boolean,
        postId: Number,
        likesCount: Number,
    });

    const emit = defineEmits(['update:isLiked']);
    const isLoading = ref(false);

    const toggleLike = async () => {
        if(isLoading.value) return;
        isLoading.value = true;
        try {
            if(props.isLiked === false) {
                await axios.post('like/add', { post_id: props.postId });
            } else if(props.isLiked === true) {
                await axios.delete(`like/delete`, { data: { post_id: props.postId } });
            }
        } catch (error) {
            console.log('Error fetching like:', error);
        } finally {
            isLoading.value = false;
        }
        apiStore.postsList(false);
        if(apiStore.showModal === true) {
            apiStore.openModelDetailsPost(props.postId);
        }
    }
</script>

<template>
    <div class="flex items-center gap-2">
        <button @click="toggleLike()" class="cursor-pointer text-white duration-150 rounded-full">
            <Heart :class="['hover:scale-110 transition-transform duration-150 ease-in-out', props.isLiked === true ? 'fill-red-500 text-red-500' : 'text-red-500']" :size="28" stroke-width="1.6"/>
        </button>
        <span class="text-sm">{{ props.likesCount }} like</span>
    </div>
</template>

<style>
    
</style>