<template>
    <div class="flex bg-gray-900 text-white">
        <!-- Main Content -->
        <div class="w-full p-6 overflow-auto mt-20 mb-16 md:my-0">
            <h2 class="text-2xl font-semibold mb-6">Dashboard Overview</h2>

            <!-- Analytics Widgets -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                <!-- Total Posts Widget -->
                <div class="bg-slate-800 rounded-lg p-4 border-l-4 border-green-500 hover:shadow-lg transition-shadow">
                    <div class="flex flex-col">
                        <div class="flex items-start justify-between gap-2">
                            <div>
                                <p class="text-gray-400 text-sm">Total Posts</p>
                                <h3 class="text-2xl font-bold mt-1">{{ totalPosts }}</h3>
                            </div>
                            <div class="bg-green-500/20 p-3 rounded-lg">
                                <FileTextIcon class="w-6 h-6 text-green-500" />
                            </div>
                        </div>
                        <div class="flex items-center mt-2 text-green-500 mt-4">
                            <TrendingUpIcon class="w-4 h-4 mr-1" />
                            <span class="text-sm">+{{ totalPostsInWeek }} this week</span>
                        </div>
                    </div>
                </div>

                <!-- Active Users Widget -->
                <div class="bg-slate-800 rounded-lg p-4 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
                    <div class="flex flex-col">
                        <div class="flex items-start justify-between gap-2">
                            <div>
                                <p class="text-gray-400 text-sm">Active Users</p>
                                <h3 class="text-2xl font-bold mt-1">{{ totalUsers }}</h3>
                            </div>
                            <div class="bg-blue-500/20 p-3 rounded-lg">
                                <UsersIcon class="w-6 h-6 text-blue-500" />
                            </div>
                        </div>
                        <div class="flex items-center mt-2 text-blue-500 mt-4">
                            <TrendingUpIcon class="w-4 h-4 mr-1" />
                            <span class="text-sm">+{{ totalUsersInWeek }} this week</span>
                        </div>
                    </div>
                </div>

                <!-- Unread Messages Widget -->
                <div class="bg-slate-800 rounded-lg p-4 border-l-4 border-red-500 hover:shadow-lg transition-shadow">
                    <div class="flex flex-col">
                        <div class="flex items-start justify-between gap-2">
                            <div>
                                <p class="text-gray-400 text-sm">Total Messages</p>
                                <h3 class="text-2xl font-bold mt-1">{{ totalMessages }}</h3>
                            </div>
                            <div class="bg-red-500/20 p-3 rounded-lg">
                                <MailIcon class="w-6 h-6 text-red-500" />
                            </div>
                        </div>
                        <div class="flex items-center mt-2 text-red-500 mt-4">
                            <TrendingUpIcon class="w-4 h-4 mr-1" />
                            <span class="text-sm">+{{ totalMessagesInWeek }} this week</span>
                        </div>
                    </div>
                </div>

                <!-- New Comments Widget -->
                <div class="bg-slate-800 rounded-lg p-4 border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
                    <div class="flex flex-col">
                        <div class="flex items-start justify-between gap-2">
                            <div>
                                <p class="text-gray-400 text-sm">Total Comments</p>
                                <h3 class="text-2xl font-bold mt-1">{{ totalComments }}</h3>
                            </div>
                            <div class="bg-purple-500/20 p-3 rounded-lg">
                                <MessageSquareIcon class="w-6 h-6 text-purple-500" />
                            </div>
                        </div>
                        <div class="flex items-center mt-2 text-purple-500 mt-4">
                            <TrendingUpIcon class="w-4 h-4 mr-1" />
                            <span class="text-sm">+{{ totalCommentsInWeek }} this week</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tables Section -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <!-- Posts Table -->
                <div class="bg-slate-800 rounded-lg border border-gray-700 overflow-hidden">
                    <div class="p-4 border-b border-gray-700 flex justify-between items-center">
                        <h3 class="font-semibold text-lg">Recent Posts</h3>
                        <button class="text-sm text-pink-500 hover:underline">View All</button>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead>
                                <tr class="bg-slate-700">
                                    <th class="py-3 px-4 text-left">Media</th>
                                    <th class="py-3 px-4 text-left">Author</th>
                                    <th class="py-3 px-4 text-left">Type</th>
                                    <th class="py-3 px-4 text-left">Date</th>
                                    <th class="py-3 px-4 text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    class="border-b border-gray-700 hover:bg-gray-750">
                                    <td class="py-3 px-4">
                                        <div class="w-10 h-9 rounded-md bg-gray-600"></div>
                                    </td>
                                    <td class="py-3 px-4">Mostafa Rhazlani</td>
                                    <td class="py-3 px-4">Image</td>
                                    <td class="py-3 px-4 min-w-32">May 01, 2025</td>
                                    <td class="py-3 px-4">
                                        <span class="px-2 py-1 rounded-full text-xs bg-red-500/20 text-red-500">
                                            Stopped
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Users Table -->
                <div class="bg-slate-800 rounded-lg overflow-hidden border border-gray-700">
                    <div class="p-4 border-b border-gray-700 flex justify-between items-center">
                        <h3 class="font-semibold text-lg">Top 5 Followed Profiles</h3>
                        <button class="text-sm text-pink-500 hover:underline">View All</button>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead>
                                <tr class="bg-slate-700">
                                    <th class="py-3 px-4 text-left">User</th>
                                    <th class="py-3 px-4 text-left">Followers</th>
                                    <th class="py-3 px-4 text-left">Is banned</th>
                                    <th class="py-3 px-4 text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    class="border-b border-gray-700 hover:bg-gray-750">
                                    <td class="py-3 px-4 flex items-center gap-2">
                                        <div class="w-9 h-9 rounded-full bg-gray-600"></div>
                                        Mostafa Rhazlani
                                    </td>
                                    <td class="py-3 px-4">200M</td>
                                    <td class="py-3 px-4">
                                        <span class="px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-500">Yes</span>
                                    </td>
                                    <td class="py-3 px-4">
                                        <span class="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">
                                            Online
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { UsersIcon, FileTextIcon, TrendingUpIcon, MailIcon, MessageSquareIcon } from 'lucide-vue-next';
    import axios from 'axios';
    import { onMounted, ref } from 'vue';
    import { useApiStore } from '@/store/apiStore';

    const apiStore = useApiStore();
    const totalPosts = ref(null);
    const totalPostsInWeek = ref(null);
    const totalUsersInWeek = ref(null);
    const totalUsers = ref(null);
    const totalMessagesInWeek = ref(null);
    const totalMessages = ref(null);
    const totalComments = ref(null);
    const totalCommentsInWeek = ref(null);

    const getTotalPosts = async () => {
        try {
            const response = await axios.get('posts/total');
            totalPosts.value = response.data.postsCount
            totalPostsInWeek.value = response.data.totalPostsInWeek
        } catch (error) {
            console.log('Error fetching total users', error);
        }
    }

    const getTotalUsers = async () => {
        try {
            const response = await axios.get('users/total');
            totalUsers.value = response.data.usersCount
            totalUsersInWeek.value = response.data.totalUsersInWeek
        } catch (error) {
            console.log('Error fetching total users', error);
        }
    }

    const getTotalMessages = async () => {
        try {
            const response = await axios.get('messages/total');
            totalMessages.value = response.data.messagesCount
            totalMessagesInWeek.value = response.data.totalMessagesInWeek
        } catch (error) {
            console.log('Error fetching total users', error);
        }
    }

    const getTotalComments = async () => {
        try {
            const response = await axios.get('comments/total');
            totalComments.value = response.data.commentsCount
            totalCommentsInWeek.value = response.data.totalCommentsInWeek
        } catch (error) {
            console.log('Error fetching total users', error);
        }
    }

    onMounted(async () => {
        apiStore.isLoading = true;

        try {
            await getTotalPosts();
            await getTotalUsers();
            await getTotalMessages();
            await getTotalComments();
        } catch (error) {
            console.log('error fetching data', error);
        } finally {
            apiStore.isLoading = false;
        }
    })

</script>

<style></style>