<template>
    <div class="flex bg-gray-900 text-white">
        <!-- Main Content -->
        <div class="w-full p-6 overflow-auto mt-20 mb-16 md:my-0">
            <h2 class="text-2xl font-semibold mb-6">Dashboard Overview</h2>

            <!-- Analytics Widgets -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                <!-- Total Posts -->
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

                <!-- Active Users -->
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

                <!-- total Messages -->
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

                <!-- total Comments -->
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
                        <RouterLink to="/admin/posts" class="text-sm text-cyan-500 hover:underline">View All</RouterLink>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead>
                                <tr class="bg-slate-700">
                                    <th class="py-3 px-4 text-left">Media</th>
                                    <th class="py-3 px-4 text-left">Author</th>
                                    <th class="py-3 px-4 text-left">Type</th>
                                    <th class="py-3 px-4 text-left">Date Create</th>
                                    <th class="py-3 px-4">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(post, index) in lastFivePosts" :key="index"
                                    class="border-b border-gray-700 hover:bg-gray-750">
                                    <td class="py-3 px-4">
                                        <div
                                            class="min-w-10 min-h-9 max-w-10 max-h-9 rounded-md bg-gray-600 overflow-hidden flex items-center justify-center">
                                            <img v-if="post.type === 'image'"
                                                :src="`http://127.0.0.1:8000/storage/posts/images/${post.media}`" alt=""
                                                class="w-full h-full object-cover" />

                                            <video v-else class="w-full h-full object-cover">
                                                <source :src="`http://127.0.0.1:8000/storage/posts/videos/${post.media}`"
                                                    type="video/mp4">
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                    </td>
                                    <td class="py-3 px-4">{{ post.person.full_name }}</td>
                                    <td class="py-3 px-4">{{ post.type }}</td>
                                    <td class="py-3 px-4 min-w-32">{{ formatToSimpleDate(post.created_at) }}</td>
                                    <td class="py-3 px-4 text-center">
                                        <StatusPostComponent :post="post" @statusUpdated="() => getLastFivePosts()"/>
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
                        <RouterLink to="/admin/users" class="text-sm text-cyan-500 hover:underline">View All</RouterLink>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead>
                                <tr class="bg-slate-700">
                                    <th class="py-3 px-4 text-left">User</th>
                                    <th class="py-3 px-4 text-left">Username</th>
                                    <th class="py-3 px-4 text-left">Followers</th>
                                    <th class="py-3 px-4">Is banned</th>
                                    <th class="py-3 px-4">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(user, index) in topFollowedUsers" :key="index"
                                    class="border-b border-gray-700 hover:bg-gray-750">
                                    <td class="py-3 px-4 flex items-center gap-2">
                                        <div class="min-w-9 min-h-9 max-w-9 max-h-9 rounded-full bg-gray-600 overflow-hidden">
                                            <img :src="`http://127.0.0.1:8000/storage/images/${user.image}`" alt="" class="w-full h-full object-cover">
                                        </div>
                                        {{ user.full_name }}
                                    </td>
                                    <td class="py-3 px-4">{{ user.username }}</td>
                                    <td class="py-3 px-4">{{ user.followers_count }}</td>
                                    <td class="py-3 px-4 text-center">
                                        <UserBanStatusComponent :user-id="user.id" :is-banned="user.is_banned" @updated="() => getTopFiveFollowedUsers()" />
                                    </td>
                                    <td class="py-3 px-4 text-center">
                                        <span v-if="user.is_logged === true" class="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">
                                            Online
                                        </span>
                                        <span v-else class="px-2 py-1 rounded-full text-xs bg-red-500/20 text-red-500">
                                            Ofline
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
    import { formatToSimpleDate } from '@/helpers/convertTime';
    import StatusPostComponent from '@/components/StatusPostComponent.vue';
    import UserBanStatusComponent from '@/components/UserBanStatusComponent.vue';

    const apiStore = useApiStore();
    const totalPosts = ref(null);
    const totalPostsInWeek = ref(null);
    const totalUsersInWeek = ref(null);
    const totalUsers = ref(null);
    const totalMessagesInWeek = ref(null);
    const totalMessages = ref(null);
    const totalComments = ref(null);
    const totalCommentsInWeek = ref(null);
    const lastFivePosts = ref([]);
    const topFollowedUsers = ref([]);

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

    const getLastFivePosts = async () => {
        try {
            const response = await axios.get('posts/last-five');
            lastFivePosts.value = response.data.lastFivePosts;
        } catch (error) {
            console.log('Error fetching posts', error);
        }
    }

    const getTopFiveFollowedUsers = async () => {
        try {
            const response = await axios.get('users/top-five-followed');
            topFollowedUsers.value = response.data.users;
        } catch (error) {
            console.log('Error fetching posts', error);
        }
    }

    onMounted(async () => {
        apiStore.isLoading = true;

        try {
            await getTotalPosts();
            await getTotalUsers();
            await getTotalMessages();
            await getTotalComments();
            await getLastFivePosts();
            await getTopFiveFollowedUsers();
        } catch (error) {
            console.log('error fetching data', error);
        } finally {
            apiStore.isLoading = false;
        }
    })

</script>

<style></style>