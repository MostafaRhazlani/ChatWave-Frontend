<template>
    <AlertComponent />
    <div class="flex h-screen bg-gray-900 text-white">

        <!-- Main Content -->
        <div class="w-full p-6 mt-20 mb-16 md:my-0">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-semibold">All Posts</h2>
            </div>

            <!-- Filters and Search -->
            <div class="bg-slate-800 p-4 rounded-lg mb-6">
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex-1">
                        <div class="relative">
                            <SearchIcon
                                class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input v-model="searchInput" @input="searchPost" type="text" placeholder="Search posts..."
                                class="w-full bg-slate-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-pink-500" />
                        </div>
                    </div>

                    <div class="flex gap-3">
                        <select
                            class="bg-slate-700 rounded-lg px-3 py-2 w-44 cursor-pointer text-white focus:outline-none focus:ring-2 focus:ring-cyan-500">
                            <option value="">All Status</option>
                            <option value="Published">Published</option>
                            <option value="Draft">Stopped</option>
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
                                <th class="py-3 px-4 text-left">#</th>
                                <th class="py-3 px-4 text-left">Media</th>
                                <th class="py-3 px-4 text-left">Author</th>
                                <th class="py-3 px-4 text-left">Date</th>
                                <th class="py-3 px-4 text-left">Likes</th>
                                <th class="py-3 px-4 text-left">Comments</th>
                                <th class="py-3 px-4 text-left">Status</th>
                                <th class="py-3 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(post, index) in apiStore.posts" :key="index"
                                class="border-b border-gray-700 hover:bg-gray-750">
                                <td class="py-3 px-4">{{ index + 1 }}</td>
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
                                <td class="py-3 px-4 min-w-36">{{ formatToSimpleDate(post.created_at) }}</td>
                                <td class="py-3 px-4">{{ post.likes_count }}</td>
                                <td class="py-3 px-4">{{ post.comments_count }}</td>
                                <td class="py-3 px-4">
                                    <span v-if="post.is_banned === true"
                                        class="px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-red-500 hover:bg-red-500/30">
                                        Stopped
                                    </span>
                                    <span v-else class="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                                        Published
                                    </span>
                                </td>
                                <td class="py-3 px-4">
                                    <div class="flex gap-2">
                                        <button class="p-1 rounded hover:bg-gray-700" title="View">
                                            <EyeIcon class="w-5 h-5 text-gray-400 hover:text-white" />
                                        </button>
                                        <button @click="deletePost(post.id)" class="p-1 rounded hover:bg-gray-700 flex"
                                            title="Delete">
                                            <SpinnerComponent
                                                v-if="activeLoaderId === post.id && statusButton === 'delete'"
                                                class="w-5 h-5" />
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
import { useApiStore } from '@/store/apiStore';
import { formatToSimpleDate } from '@/helpers/convertTime';
import AlertComponent from '@/components/AlertComponent.vue';
import SpinnerComponent from '@/components/SpinnerComponent.vue';
import { useAlertStore } from '@/store/alert';
import { onMounted, ref } from 'vue';
import axios from 'axios';

const apiStore = useApiStore();
const alertStore = useAlertStore();
const activeLoaderId = ref(null);
const statusButton = ref('');
const searchInput = ref('');
const isSearchLoading = ref('');

const deletePost = async (postId) => {
    if (activeLoaderId.value !== null) return;
    activeLoaderId.value = postId;
    statusButton.value = 'delete';
    try {
        const response = await axios.delete(`post/${postId}/delete`);

        if (response.status === 200) {
            apiStore.postsList(false);
            alertStore.triggerAlert('Post deleted successfully', 'success');
        }
    } catch (error) {
        alertStore.triggerAlert('Post not deleted', 'error');
        console.log(error);
    } finally {
        activeLoaderId.value = null;
    }
}

let timer;
    const searchPost = () => {
        clearTimeout(timer);
        isSearchLoading.value = true
        timer = setTimeout(async () => {
            try {
                if(searchInput.value) {
                    const response = await axios.get('posts/search', { params: { query: searchInput.value }});
                    apiStore.posts = response.data.posts
                } else {
                    apiStore.postsList(false);
                }
            } catch(error) {
                console.log(error);
            } finally {
                isSearchLoading.value = false
            }
        }, 1000);
    }

onMounted(() => {
    apiStore.postsList();
})
</script>


<style></style>