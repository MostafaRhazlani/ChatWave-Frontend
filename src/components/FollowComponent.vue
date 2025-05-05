<script setup>
    import { useApiStore } from '@/store/apiStore';
    import { defineProps, defineEmits, onMounted, computed } from 'vue';
    import { useRoute } from 'vue-router';

    const apiStore = useApiStore();
    const route = useRoute();
    const followStatus = computed(() => apiStore.followStatuses[props.userId] || {});
    const emit = defineEmits(['refreshFunction']);
    const props = defineProps({
        userId: Number
    });

    const toggoleFollowAndRefresh = async () => {
        await apiStore.handleToggleFollow(props.userId);
        emit('refreshFunction');
    }

    onMounted(() => {
        apiStore.handleFollowStatus(props.userId);
    })
    
</script>

<template>
    <div>
        <div :class="route.name === 'Profile' || route.name === 'Peoples' ? 'px-2 py-2 rounded-md min-w-32' : 'text-xs px-3 py-1 rounded-full'" v-if="followStatus.isFollowMe && !followStatus.isFollowHim" @click="toggoleFollowAndRefresh"
            class="cursor-pointer transition-colors duration-150 bg-slate-600 hover:bg-slate-500">
            Follow Back
        </div>
        <div v-else class="">
            <div :class="route.name === 'Profile' || route.name === 'Peoples' ? 'px-4 py-2 rounded-md' : 'text-xs px-3 py-1 rounded-full'" v-if="followStatus.isFollowHim" @click="toggoleFollowAndRefresh"
                class="cursor-pointer transition-colors duration-150  bg-pink-100 hover:bg-pink-200 font-semibold text-pink-600">
                Unfollow
            </div>
            <div :class="route.name === 'Profile' || route.name === 'Peoples' ? 'px-4 py-2 rounded-md' : 'text-xs px-3 py-1 rounded-full'" v-else @click="toggoleFollowAndRefresh"
                class="cursor-pointer transition-colors duration-150  bg-slate-600 hover:bg-slate-500">
                Follow
            </div>
        </div>
    </div>
</template>

<style>
    
</style>