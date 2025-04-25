<script setup>
    import FollowComponent from '@/components/FollowComponent.vue'
    import axios from 'axios';
    import { onMounted, ref } from 'vue';
    import { useApiStore } from '@/store/apiStore';
    import { useAuthStore } from '@/store/auth';

    const apiStore = useApiStore();
    const authStore = useAuthStore();
    const randomUsers = ref([]);

    const getRandomUsers = async (showModel = true) => {
        if (showModel) apiStore.isLoading = true
        try {
            const response = await axios.get('users');
            randomUsers.value = response.data.randomUsers
        } catch (error) {
           console.log(error);
        } finally {
            if (showModel) apiStore.isLoading = false
        }
    }

    onMounted(() => {
        getRandomUsers();
    })
</script>

<template>
    <div class="bg-slate-800 p-4 rounded-lg w-full border border-gray-700">
        <h3 class="text-sm font-semibold mb-3">People You might know</h3>
        <div class="space-y-3">
            <div v-for="(user, index) in randomUsers" :key="index">
                <div v-if="user.id !== authStore.user.id" class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <RouterLink :to="`/profile/${user.id}`">
                            <div class="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
                                <img :src="`http://127.0.0.1:8000/storage/images/${user.image}`" alt="" class="w-full h-full object-cover" />
                            </div>
                        </RouterLink>
                        <div>
                            <RouterLink :to="`/profile/${user.id}`">
                                <p class="text-sm font-medium">{{ user.full_name }}</p>
                                <p class="text-xs text-gray-400">{{ user.username }}</p>
                            </RouterLink>
                        </div>
                    </div>
                    <FollowComponent :userId="user.id"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>