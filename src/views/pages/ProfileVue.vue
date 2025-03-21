<script setup>

import axios from 'axios';
import { useAuthStore } from '@/store/auth';
import { Plus, Heart, MessageCircleMore, Star } from 'lucide-vue-next';
import { onMounted, reactive, ref } from 'vue';

const authStore = useAuthStore();
const showModal = ref(false);
const error = reactive({ errors: {} });
const selectedPost = ref(null);
const posts = ref([]);
const post = ref({});

const openPostModal = async (postId) => {
    
    const response = await axios.get(`post/${postId}`);

    post.value = response.data.post
    
    showModal.value = true;
    document.body.style.overflow = 'hidden';
};

const closePostModal = () => {
    showModal.value = false;
    document.body.style.overflow = '';
};

// get all posts user
const fetchPosts = async () => {
    try {
        const response = await axios.get('user/posts');
        if(response.status === 200 && response.data.userPosts) {

            posts.value = response.data.userPosts;
            
        } else {
            error.errors = {error: 'posts not found'}
        }
        
    } catch (error) {
        console.log(error);
    }
}

onMounted(() => {
    fetchPosts();

})
</script>

<template>

    <div class="md:w-[98%] lg:w-5/6 mx-auto mt-16 md:mt-0">
        <!-- Main Content -->
        <div>
            <!-- Profile Header -->
            <div class="border-b border-gray-800 pb-6">
                <div class="flex flex-col text-center md:flex-row md:text-start gap-6 items-center pt-8 px-4">
                    <div>
                        <div class="w-36 h-36 rounded-full border-4 p-1 border-pink-500 hover:opacity-90 duration-150 cursor-pointer overflow-hidden hover:border-pink-600">
                            <img class="w-full h-full object-cover rounded-full" :src="`http://127.0.0.1:8000/storage/images/${authStore.user.image}`" alt="Profile Image">
                        </div>
                    </div>

                    <div class="w-full">
                        <h1 class="text-3xl font-bold mt-4">{{ authStore.user.full_name }}</h1>
                        <p class="text-pink-500 text-lg">@{{ authStore.user.username }}</p>

                        <p v-if="authStore.user.description" class="text-gray-400 mt-2 max-w-lg">
                            {{authStore.user.description }}
                        </p>
                        <p v-else class="text-gray-400 mt-2 max-w-lg">
                            Talk about yourself here
                        </p>

                        <div class="flex justify-between w-3/4 md:w-2/6 mx-auto md:mx-0 mt-4">
                            <div class="text-center">
                                <p class="text-gray-400">Posts</p>
                                <p class="font-bold">{{ posts.length }}</p>
                            </div>
                            <div class="text-center">
                                <p class="text-gray-400">Following</p>
                                <p class="font-bold">14,300</p>
                            </div>
                            <div class="text-center">
                                <p class="text-gray-400">Followers</p>
                                <p class="font-bold">9,003</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="px-6 py-6">
                <h2 class="text-lg font-semibold mb-4">Highlights</h2>
                <div class="overflow-x-auto w-full scroll-smooth no-scrollbar">
                    <div class="snap-x snap-mandatory text-pink-500 flex gap-4 min-w-max">
                        <div class="w-40 h-56 border-2 hover:bg-slate-800 duration-150 cursor-pointer border-dashed border-pink-500 rounded-lg flex justify-center items-center">
                            <div class="flex flex-col items-center">
                                <Plus />
                                <p>Add New</p>
                            </div>
                        </div>
                        <div v-for="i in 10" :key="`highlights-${i}`" class="w-40 h-56 duration-150 cursor-pointer rounded-lg overflow-hidden">
                            <img class="w-full h-full object-cover" src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" alt="">
                        </div>
                    </div>
                </div>
            </div>

            <!-- Posts Section -->
            <div class="px-6 py-6">
                <h2 class="text-lg font-semibold mb-4">Posts</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <div v-for="(post) in posts" 
                        :key="post.id" 
                        class="relative h-80 md:h-64 rounded-lg bg-gray-800 cursor-pointer overflow-hidden transform transition-transform hover:scale-105 hover:z-10" 
                        @click="openPostModal(post.id)">
                        
                        <img class="w-full h-full object-cover" :src="post.image" alt="Post Image">
                    </div>
                </div>
            </div>
        </div>

        <!-- Post Detail Modal -->
        <div v-if="showModal" class="fixed inset-0 bg-black min-h-screen bg-opacity-75 flex items-center justify-center z-50 lg:p-4">
            <div class="bg-gray-900 rounded-xl w-full h-full lg:w-4/5 lg:h-5/6 overflow-hidden flex flex-col">
                <!-- Modal Header -->
                <div class="p-4 border-b border-gray-800 flex justify-between items-center">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-full bg-gray-700 overflow-hidden">
                            <img :src="`/images/${post.person.image}`"
                                alt="Profile" class="w-full h-full object-cover" />
                        </div>
                        <div>
                            <p class="font-medium">{{ post.person.full_name }}</p>
                            <p class="text-xs text-gray-400">@{{ post.person.username }}</p>
                        </div>
                    </div>
                    <button @click="closePostModal" class="text-gray-400 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-x">
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    </button>
                </div>

                <!-- Modal Content -->
                <div class="flex flex-col h-full lg:flex-row overflow-hidden">
                    <!-- Post Image -->
                    <div class="lg:w-3/5 h-3/6 lg:h-full bg-gray-800 flex items-center justify-center overflow-hidden">
                        <div class="w-full lg:min-h-full rounded-lg flex items-center justify-center">
                            <img class="w-full h-full object-cover bg-center" :src="post.image" alt="">
                        </div>
                    </div>

                    <!-- Post Details -->
                    <div class="lg:w-2/5 h-3/6 lg:h-full">
                        <div class="flex flex-col gap-4 p-4">
                            <h3 class="text-xl font-bold">{{ post.title }}</h3>
                            <p class="text-gray-300">
                                {{ post.description }}
                            </p>

                            <!-- Post Stats -->
                            <div class="flex items-center justify-between gap-4 text-gray-400">
                                <div class="flex gap-4">
                                    <div class="flex items-center gap-1">
                                        <div class="h-8 w-8 bg-slate-700 hover:bg-slate-500 cursor-pointer duration-150 flex items-center justify-center rounded-full">
                                            <Heart :size="18"/>
                                        </div>
                                        <span>245</span>
                                    </div>
                                    <div class="flex items-center gap-1">
                                        <div class="h-8 w-8 bg-slate-700 hover:bg-slate-500 cursor-pointer duration-150 flex items-center justify-center rounded-full">
                                            <MessageCircleMore :size="18"/>
                                        </div>
                                        <span>10</span>
                                    </div>
                                </div>
                                <div class="flex items-center gap-1">
                                    <div class="h-8 w-8 bg-slate-700 hover:bg-slate-500 cursor-pointer duration-150 flex items-center justify-center rounded-full">
                                        <Star :size="18"/>
                                    </div>
                                    <span>18</span>
                                </div>
                            </div>
                        </div>

                        <!-- Comments Section -->
                        <div class="border-t border-gray-800 flex flex-col h-full relative">
                            <!-- Scrollable Comments -->
                            <div class="overflow-y-auto no-scrollbar mb-40 p-4">
                                <div class="space-y-3">
                                    <div v-for="j in 10" :key="`comment-${j}`" class="flex gap-2">
                                        <div>
                                            <div class=" w-8 h-8 rounded-full bg-gray-700"></div>
                                        </div>
                                        <div class="rounded-lg mb-3">
                                            <p class="font-medium">User {{ j }}</p>
                                            <p class="text-gray-300 text-sm ">This is comment {{ j }} on post {{ selectedPost }}. Great content! dkod coke,oc ocej,e cejiecc ecijcei Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima earum dignissimos iste magnam perspiciatis consectetur maxime, omnis rem ad deserunt?</p>
                                            <p class="text-xs text-gray-500 mt-1">2h ago</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Fixed Comment Input -->
                            <div class="sticky bottom-0 w-full bg-gray-900 p-2 flex items-center gap-2">
                                <div class="w-10 h-10 rounded-full bg-gray-700 flex-shrink-0"></div>
                                <input type="text" placeholder="Add a comment..."
                                    class="bg-gray-800 text-white rounded-full px-4 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-pink-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  scrollbar-width: none;
}
</style>