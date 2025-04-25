<script setup>
    import { Search as SearchIcon } from 'lucide-vue-next';
    import FollowComponent from '@/components/FollowComponent.vue';
    import { ref, onMounted } from 'vue';
    import axios from 'axios';
    import { useAuthStore } from '@/store/auth.js';

    const authStore = useAuthStore();
    const searchInput = ref('')
    const filtredUsers = ref([]);
    const loaderUser = ref(false);
    let timer;
    const searchUser = async () => {
        clearTimeout(timer);
        loaderUser.value = true
        timer = setTimeout(async () => {
            try {
                if(searchInput.value) {
                    const response = await axios.get('search-user',{ params: { query: searchInput.value }});
                    filtredUsers.value = response.data.users
                } else {
                    filtredUsers.value = [];
                }
            } catch(error) {
                console.log(error);
            } finally {
                loaderUser.value = false
            }
        }, 1000);
    }
</script>

<template>
    <div class="h-full border-r md:border-x border-gray-700 flex flex-col bg-slate-800 transition-transform duration-300 ease-in-out">
        <div class="p-4">
            <h2 class="text-white text-2xl font-semibold mb-2">Search </h2>
            <div class="relative">
                <SearchIcon class="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input v-model="searchInput" @input="searchUser" type="text" placeholder="Search"
                    class="w-full pl-8 py-2 bg-slate-700 border border-gray-700 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
        </div>

        <!-- Search -->
        <div class="overflow-y-auto p-2 space-y-1">
            <div v-if="loaderUser" class="flex w-full p-2">
                <div class="flex items-center gap-3 animate-pulse w-full">
                    <div class="w-10 h-10 rounded-full bg-gray-500/30 flex-shrink-0"></div>

                    <div class="flex items-center justify-between w-full">
                        <div class="flex flex-col justify-between space-y-2">
                            <div class="h-3 w-24 bg-gray-500/30 rounded"></div>
                            <div class="h-3 w-16 bg-gray-500/30 rounded"></div>
                        </div>
                        <div class="h-6 w-20 bg-gray-500/30 rounded-full"></div>
                    </div>
                </div>
            </div>
            <div v-else-if="filtredUsers.length > 0">
                <div v-for="(user, index) in filtredUsers" :key="index" class="p-2 cursor-pointer hover:bg-slate-700 transition ease-in-out rounded-lg">
                        <div class="flex items-center gap-3">
                            <RouterLink :to="`/profile/${user.id}`">
                                <div class="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0">
                                    <img :src="`http://127.0.0.1:8000/storage/images/${user.image}`" alt=""
                                        class="w-full h-full rounded-full" />
                                </div>
                            </RouterLink>
                            <div class="flex items-center justify-between w-full">
                                <div class="flex flex-col justify-between items-center">
                                    <RouterLink :to="`/profile/${user.id}`">
                                        <h3 class="text-white font-medium text-sm truncate">{{ user.full_name }}</h3>
                                    </RouterLink>
                                    <p class="text-gray-400 text-sm truncate">{{ user.username }}</p>
                                </div>
                                <FollowComponent v-if="user.id !== authStore.user.id" :userId="user.id"/>
                            </div>
                        </div>
                </div>
            </div>
            <div v-else class="text-center w-full">
                <span>User Not Found</span>
            </div>
        </div>
    </div>
</template>

<style>
    
</style>