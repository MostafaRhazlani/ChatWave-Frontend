<template>
    <div class="flex h-screen bg-gray-900 text-white">

        <!-- Main Content -->
        <div class="w-full p-6 mt-20 mb-16 md:my-0">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-semibold">All Users</h2>
            </div>

            <!-- Filters and Search -->
            <div class="bg-slate-800 p-4 rounded-lg mb-6">
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex-1">
                        <div class="relative">
                            <SearchIcon
                                class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input v-model="searchInput" @input="searchUser" type="text" placeholder="Search users..."
                                class="w-full bg-slate-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-pink-500"/>
                        </div>
                    </div>

                    <div class="flex gap-3">
                        <select v-model="filterByStatus" @change="filterUsersByStatus"
                            class="bg-slate-700 rounded-lg px-3 py-2 w-44 cursor-pointer text-white focus:outline-none focus:ring-1 focus:ring-pink-500">
                            <option value="">All Status</option>
                            <option value="true">Banned</option>
                            <option value="false">Not Banned</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Posts Table -->
            <div class="bg-slate-800 rounded-lg overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr class="bg-slate-700">
                                <th class="py-3 px-4 text-left">User</th>
                                <th class="py-3 px-4 text-left">Username</th>
                                <th class="py-3 px-4 text-left">Email</th>
                                <th class="py-3 px-4 text-left">Date Birth</th>
                                <th class="py-3 px-4 text-left">Country</th>
                                <th class="py-3 px-4">Is Banned</th>
                                <th class="py-3 px-4 text-left">Status</th>
                                <th class="py-3 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(user, index) in users" :key="index"
                                class="border-b border-gray-700 hover:bg-gray-750">
                                <td class="py-3 px-4 flex items-center gap-2">
                                    <div class="min-w-9 min-h-9 max-w-9 max-h-9 rounded-full bg-gray-600 overflow-hidden">
                                        <img :src="`http://127.0.0.1:8000/storage/images/${user.image}`" alt="" class="w-full h-full object-cover">
                                    </div>
                                    {{ user.full_name }}
                                </td>
                                <td class="py-3 px-4">{{ user.username }}</td>
                                <td class="py-3 px-4">{{ user.email }}</td>
                                <td class="py-3 px-4 min-w-36">{{ user.date_birth }}</td>
                                <td class="py-3 px-4">{{ user.nationality }}</td>
                                <td class="py-3 px-4 min-w-32 text-center">
                                    <UserBanStatusComponent :user-id="user.id" :is-banned="user.is_banned" @updated="() => listUsers(false)" />
                                </td>
                                <td class="py-3 px-4">
                                    <span v-if="user.is_logged === true" class="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">
                                        Online
                                    </span>
                                    <span v-else class="px-2 py-1 rounded-full text-xs bg-red-500/20 text-red-400">
                                        Ofline
                                    </span>
                                </td>
                                <td class="py-3 px-4">
                                    <div class="flex gap-2">
                                        <button class="p-1 rounded hover:bg-gray-700" title="View">
                                            <EyeIcon class="w-5 h-5 text-gray-400 hover:text-white" />
                                        </button>
                                        <button @click="deleteUser(user.id)" class="p-1 rounded hover:bg-gray-700 flex" title="Delete">
                                            <SpinnerComponent v-if="activeLoaderId === user.id && statusButton === 'delete'" class="w-5 h-5" />
                                            <Trash2Icon v-else class="w-5 h-5 text-gray-400 hover:text-red-500" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div class="p-4 border-t border-gray-700 flex justify-between items-center">
                    <div class="flex gap-2">
                        <button
                            class="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">
                            Previous
                        </button>
                        <button
                            class="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { FileTextIcon, SearchIcon, EyeIcon, Trash2Icon } from 'lucide-vue-next';
    import { onMounted, ref } from 'vue';
    import axios from 'axios';
    import SpinnerComponent from '@/components/SpinnerComponent.vue';
    import UserBanStatusComponent from '@/components/UserBanStatusComponent.vue';
    import { useApiStore } from '@/store/apiStore';
    import { useAlertStore } from '@/store/alert';

    const users = ref([]);
    const statusButton = ref('');
    const activeLoaderId = ref(null);
    const apiStore = useApiStore();
    const isSearchLoading = ref(false);
    const searchInput = ref(false);
    const alertStore = useAlertStore();
    const filterByStatus = ref('');
    const allUsers = ref([]);

    const listUsers = async (showLoader = true) => {
        if(showLoader) apiStore.isLoading = true

        try {
            const response = await axios.get('users');
            if(response.status === 200) {
                users.value = response.data.users;
                allUsers.value = response.data.users
            } 
        } catch (error) {
            console.log('Error fetching users', error);
        } finally {
            if(showLoader) apiStore.isLoading = false
        }
    }

    const toggleBanUser = async (userId) => {
        if(activeLoaderId.value !== null) return
        activeLoaderId.value = userId
        statusButton.value = 'ban';

        try {
            await axios.patch(`user/${userId}/ban`);
            await listUsers(false);
        } catch (error) {
            console.log('Something is wrong', error);
        } finally {
            activeLoaderId.value = null;
        }
    }

    const deleteUser = async (userId) => {
        if(activeLoaderId.value !== null) return;
        activeLoaderId.value = userId;
        statusButton.value = 'delete';
        try {
            const response = await axios.delete(`user/${userId}/delete`);
            if(response.status === 200) {
                await listUsers(false);
                alertStore.triggerAlert('User deleted successfully', 'success');
            }
        } catch (error) {
            console.log('Something is wrong', error);
        } finally {
            activeLoaderId.value = null;
        }
    }

    let timer;
    const searchUser = () => {
        clearTimeout(timer);
        isSearchLoading.value = true
        timer = setTimeout(async () => {
            try {
                if(searchInput.value) {
                    const response = await axios.get('search-user', { params: { query: searchInput.value }});
                    users.value = response.data.users
                } else {
                    await listUsers(false);
                }
            } catch(error) {
                console.log(error);
            } finally {
                isSearchLoading.value = false
            }
        }, 1000);
    }

    const filterUsersByStatus = async () => {
        
        if(filterByStatus.value !== '') {
            users.value = allUsers.value.filter(el => String(el.is_banned) == filterByStatus.value);
        } else {
            users.value = allUsers.value
        }
    }

    onMounted(() => {
        listUsers();
    })
</script>


<style>
</style>