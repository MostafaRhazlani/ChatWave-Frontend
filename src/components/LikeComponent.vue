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
        apiStore.postsList();
        if(apiStore.showModal === true) {
            apiStore.openModelDetailsPost(props.postId);
        }
    }
</script>

<template>
    <div class="flex items-center gap-2">
        <button :class="[props.isLiked === true ? 'bg-red-500' : 'bg-slate-700 hover:bg-slate-500']" @click="toggleLike()"
            class="w-9 h-9 cursor-pointer hover:scale-[1.1] text-white duration-150 flex items-center justify-center rounded-full">
            <Heart :size="24" stroke-width="2" class="mt-[3px] ml-[1px]"/>
        </button>
        <span class="text-sm">{{ props.likesCount }} like</span>
    </div>
</template>

<style>
    
</style>