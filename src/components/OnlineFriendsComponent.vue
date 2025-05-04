<script setup>
    import axios from 'axios';
    import { onMounted, ref } from 'vue';

    const onlineFriends = ref([]);

    const getOnlineFriends = async () => {
        const response = await axios.get('/users/online');
        onlineFriends.value = response.data.onlineFriends;
    }

    onMounted(() => {
        getOnlineFriends();
    })
</script>

<template>
    <!-- Online Friends -->
    <div class="mb-4 bg-slate-800 p-4 rounded-lg border border-gray-700">
        <h3 class="text-sm font-semibold mb-3">Online Friends</h3>
        <div class="relative">
            <div class="flex gap-2 overflow-x-scroll scrollbar-hide stories-container">
                <div v-for="(friend, index) in onlineFriends" :key="index" class="">
                    <RouterLink :to="`/profile/${friend.id}`" class="relative">
                        <div class="w-10 h-10 rounded-full overflow-hidden bg-gray-700 cursor-pointer">
                            <img :src="`http://127.0.0.1:8000/storage/images/${friend.image}`" class="w-full h-full object-cover" alt="">
                        </div>
                        <div
                            class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900">
                        </div>
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>