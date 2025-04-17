<template>
    <div class="mt-20 flex bg-slate-900 w-full md:w-5/6 mx-auto lg:w-full xl:w-[70%] text-white overflow-hidden">

        <!-- Main Content -->
        <div class="w-full p-4 pt-6 mb-16">
            <h1 class="text-3xl font-semibold mb-4">Peoples</h1>

            <div class="border-b border-[#2a3142] pb-4 mb-4"></div>

            <!-- People List -->
            <div class="space-y-4">
                <h2 v-if="usersNotFollowBack.length > 0" class="text-xl font-semibold mb-4">Friend requests</h2>
                <div v-for="(person, index) in usersNotFollowBack" :key="index" class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
                            <img :src="`http://127.0.0.1:8000/storage/images/${person.image}`" alt="" class="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h3 class="text-white font-medium">{{ person.full_name }}</h3>
                            <p class="text-gray-400 text-sm">{{ person.username }}</p>
                        </div>
                    </div>
                    <div class="flex gap-2 flex-col sm:flex-row">
                        <FollowComponent :userId="person.id" @refreshFunction="() => getAllUsersNotFollowBack(false)"/>
                        <button
                            class="px-4 py-1.5 bg-[#e91e63] text-white rounded-md hover:bg-[#d81b60] transition-colors">
                            Message
                        </button>
                    </div>
                </div>
            </div>

            <!-- Suggested People Section -->
            <div class="mt-8">
                <h2 class="text-xl font-semibold mb-4">Suggested People</h2>
                <div class="space-y-4">
                    <div v-for="(person, index) in suggestedPeople" :key="index">
                        <div v-if="person.id !== authStore.user.id" class="flex items-center justify-between">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
                                    <img :src="`http://127.0.0.1:8000/storage/images/${person.image}`" alt="" class="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 class="text-white font-medium">{{ person.full_name }}</h3>
                                    <p class="text-gray-400 text-sm">{{ person.username }}</p>
                                </div>
                            </div>
                            <div class="flex gap-2 flex-col sm:flex-row">
                                <FollowComponent :userId="person.id"/>
                                <button
                                    class="px-4 py-1.5 bg-pink-600 text-white rounded-md hover:bg-pink-500 transition-colors">
                                    Message
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import FollowComponent from '@/components/FollowComponent.vue';
    import axios from 'axios';
    import { onMounted, ref } from 'vue';
    import { useApiStore } from '@/store/apiStore';
    import { useAuthStore } from '@/store/auth';

    const usersNotFollowBack = ref([]);
    const suggestedPeople = ref([]);
    const apiStore = useApiStore();
    const authStore = useAuthStore();

    const getAllUsersNotFollowBack = async (showModel = true) => {
        if (showModel) apiStore.isLoading = true
        try {
            const response = await axios.get('user/users-not-follow-back');
            usersNotFollowBack.value = response.data.usersNotFollowBack
        } catch (error) {
           console.log(error);
        } finally {
            if (showModel) apiStore.isLoading = false
        }
    }

    const getSuggestedPeople = async (showModel = true) => {
        if (showModel) apiStore.isLoading = true
        try {
            const response = await axios.get('users');
            suggestedPeople.value = response.data.randomUsers
        } catch (error) {
           console.log(error);
        } finally {
            if (showModel) apiStore.isLoading = false
        }
    }

    onMounted(() => {
        getAllUsersNotFollowBack();
        getSuggestedPeople();
    })
</script>

<style>

</style>