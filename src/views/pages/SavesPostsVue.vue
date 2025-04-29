<script setup>
import axios from 'axios';
import LikeComponent from '@/components/LikeComponent.vue';
import SavePostComponent from '@/components/SavePostComponent.vue';
import DetailsPostComponent from '@/components/DetailsPostComponent.vue';
import RandomPeoplesComponent from '@/components/RandomPeoplesComponent.vue';
import { convertTime } from '@/helpers/convertTime';
import { useAuthStore } from '@/store/auth';
import { useApiStore } from '@/store/apiStore';
import { MessageCircleMore } from 'lucide-vue-next';
import { ref, onMounted, } from 'vue';

const savedPosts = ref([]);
const authStore = useAuthStore();
const apiStore = useApiStore();
const commentForm = ref({
    post_id: 0,
    person_id: authStore.user.id,
    comment: '',
})

const createComment = async (postId) => {
    commentForm.value.post_id = postId;
    try {
        await axios.post('comment/create', commentForm.value);
        commentForm.value.comment = ''
    } catch (error) {
        console.log("Error fetching comments", error);
    }
    apiStore.mySavedPosts();
}

onMounted(() => {
    apiStore.mySavedPosts();
})
</script>

<template>

    <div class="flex text-white">
        <!-- Main Content with Fixed Sidebar Offset -->
        <div class="flex w-full mb-16">
            <!-- Center Content Area -->
            <div class="flex flex-col w-full mt-20 md:mt-0">
                <div class="flex gap-4 p-4 md:w-5/6 lg:w-full xl:w-[90%] md:mx-auto">
                    <div class="w-full lg:w-[60%] xl:w-[70%]">

                        <!-- Scrollable Posts Section -->
                        <div class="overflow-y-auto scrollbar-hide">
                            <div v-if="apiStore.savedPosts.length > 0" class="flex flex-col gap-4">
                                <div v-for="(post, index) in apiStore.savedPosts" :key="index"
                                    class="bg-slate-800 rounded-lg overflow-hidden border border-gray-700">
                                    <!-- Post Header -->
                                    <div class="p-4 flex justify-between items-center gap-3">
                                        <div class="flex gap-3">
                                            <RouterLink :to="`/profile/${post.person.id}`"
                                                class="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
                                                <img :src="`http://127.0.0.1:8000/storage/images/${post.person.image}`"
                                                    alt="Profile" class="w-full h-full object-cover" />
                                            </RouterLink>
                                            <div>
                                                <RouterLink :to="`/profile/${post.person.id}`">
                                                    <p class="font-medium">{{ post.person.full_name }}</p>
                                                </RouterLink>
                                                <p class="text-xs text-gray-400">{{ convertTime(post.created_at) }}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Post Content -->
                                    <div class="p-4 pt-0">
                                        <div v-if="post.type === 'image'"
                                            class="bg-slate-700 rounded-lg h-[350px] w-full overflow-hidden cursor-pointer">
                                            <img :src="`http://127.0.0.1:8000/storage/posts/images/${post.media}`"
                                                class="w-full h-full object-cover" alt="">
                                        </div>
                                        <div v-else class="bg-slate-700 rounded-lg h-[350px] w-full overflow-hidden">
                                            <video class="w-full h-full" controls>
                                                <source
                                                    :src="`http://127.0.0.1:8000/storage/posts/videos/${post.media}`"
                                                    type="video/mp4">
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                        <div class="mt-6">
                                            <p class="break-all">{{ post.content }}</p>
                                        </div>
                                        <div class="mt-6 space-x-2 flex text-blue-500">
                                            <span v-for="(tag, index) in post.tags" :key="index"
                                                class="hover:text-blue-400">#{{ tag.tag_name }}</span>
                                        </div>
                                    </div>

                                    <!-- Post Actions -->
                                    <div class="px-4 py-3 border-t border-slate-700 flex items-center justify-between">
                                        <div class="flex items-center gap-6">
                                            <LikeComponent :likesCount="post.likes_count"
                                                v-model:isLiked="post.is_liked" :postId="post.id" />
                                            <div class="flex items-center gap-2">
                                                <button @click="apiStore.openModelDetailsPost(post.id)"
                                                    class="cursor-pointer flex items-center justify-center rounded-full">
                                                    <MessageCircleMore :size="28" stroke-width="1.6"
                                                        class="hover:scale-110 transition-transform duration-150 ease-in-out" />
                                                </button>
                                                <span class="text-sm">{{ post.comments_count }} comment</span>
                                            </div>
                                        </div>
                                        <SavePostComponent :savesCount="post.saved_by_users_count" v-model:isSaved="post.is_saved" :postId="post.id" />
                                    </div>

                                    <!-- Comments -->
                                    <div class="px-4 py-3 border-t border-gray-700">
                                        <div v-if="post.latest_three_comments.length > 0"
                                            class="p-2 space-y-3 rounded-md">
                                            <div v-for="(comment, index) in post.latest_three_comments" :key="index"
                                                class="flex items-start gap-2">
                                                <RouterLink :to="`/profile/${comment.person.id}`"
                                                    class="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0 overflow-hidden">
                                                    <img :src="`http://127.0.0.1:8000/storage/images/${comment.person.image}`"
                                                        alt="Profile" class="w-full h-full object-cover" />
                                                </RouterLink>
                                                <div class="flex flex-col">
                                                    <RouterLink :to="`/profile/${comment.person.id}`">
                                                        <p class="font-medium">{{ comment.person.full_name }}</p>
                                                    </RouterLink>
                                                    <span class="text-xs text-gray-400">{{ comment.comment }}</span>
                                                    <p class="text-xs text-gray-500 mt-1">{{
                                                        convertTime(comment.created_at) }}</p>
                                                </div>
                                            </div>

                                            <div>
                                                <span @click="apiStore.openModelDetailsPost(post.id)"
                                                    class="text-gray-300 cursor-pointer hover:text-gray-200">show
                                                    more...</span>
                                            </div>
                                        </div>
                                        <div v-else class="pb-4 pt-2">
                                            <span class="text-gray-400">No comments yet</span>
                                        </div>

                                        <!-- Add Comment -->
                                        <div class="flex items-center gap-2 pt-4 border-t border-gray-700">
                                            <div class="max-w-10 max-h-10 rounded-full bg-slate-700 overflow-hidden">
                                                <img :src="`http://127.0.0.1:8000/storage/images/${authStore.user.image}`"
                                                    alt="Profile" class="w-full h-full object-cover" />
                                            </div>
                                            <div class="w-full relative">
                                                <form @submit.prevent="createComment(post.id)">
                                                    <textarea v-model="commentForm.comment" id=""
                                                        class="bg-slate-700 text-white rounded-lg text-sm w-full pl-3 pt-2 resize-none min-h-16 focus:outline-none focus:ring-1 focus:ring-pink-400 pr-16"
                                                        placeholder="Add comment..."></textarea>
                                                    <button
                                                        class="absolute right-2 top-1/2 -translate-y-1/2 bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-pink-600 transition-colors">
                                                        Reply
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <div
                                    class="bg-slate-800 rounded-lg overflow-hidden border border-gray-700 p-4 text-center">
                                    <p>Not found any save posts</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Fixed Right Sidebar -->
                    <div class="hidden lg:block md:w-[40%] xl:w-[30%] h-screen sticky top-0">
                        <!-- Online Friends -->
                        <div class="mb-4 bg-slate-800 p-4 rounded-lg border border-gray-700">
                            <h3 class="text-sm font-semibold mb-3">Online Friends</h3>
                            <div class="relative">
                                <div class="flex gap-2 overflow-x-scroll scrollbar-hide stories-container">
                                    <div v-for="i in 20" :key="`friend-${i}`" class="">
                                        <div class="w-10 h-10 rounded-full bg-gray-700 relative cursor-pointer">
                                            <div
                                                class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- People You Might Know -->
                        <RandomPeoplesComponent />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Post Detail Modal -->
    <transition name="fade">
        <DetailsPostComponent v-if="apiStore.showModal"/>
    </transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
</style>