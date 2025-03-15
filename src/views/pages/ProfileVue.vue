<script setup>

import { Plus } from 'lucide-vue-next';
import { ref } from 'vue';

const showModal = ref(false);
const selectedPost = ref(null);

const openPostModal = (postId) => {
    selectedPost.value = postId;
    showModal.value = true;
    document.body.style.overflow = 'hidden';
};

const closePostModal = () => {
    showModal.value = false;
    document.body.style.overflow = '';
};
</script>

<template>

    <div class="md:w-[98%] lg:w-5/6 mx-auto mt-16 md:mt-0">
        <!-- Main Content -->
        <div>
            <!-- Profile Header -->
            <div class="border-b border-gray-800 pb-6">
                <div class="flex flex-col text-center md:flex-row md:text-start gap-6 items-center pt-8 px-4">
                    <div class="min-w-36 min-h-36 rounded-full border-4 border-pink-500 overflow-hidden">
                        <img class="" src="" alt="">
                    </div>

                    <div>
                        <h1 class="text-3xl font-bold mt-4">Mostafa Rhazlani</h1>
                        <p class="text-pink-500 text-lg">@mostafa_rhazlani</p>

                        <p class="text-gray-400 mt-2 max-w-lg">
                            ut venenatis felis. Quam ipsum feugiat consetetur Lorem dui phasellus
                            Sed amet hendrerit quis et. Sed hendrerit et et!
                        </p>

                        <div class="flex justify-between w-full max-w-xs mx-auto md:mx-0 mt-4">
                            <div class="text-center">
                                <p class="text-gray-400">Posts</p>
                                <p class="font-bold">120</p>
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
                    <div v-for="i in 12" :key="`post-${i}`"
                        class="h-80 md:h-64 rounded-lg bg-gray-800 cursor-pointer overflow-hidden transform transition-transform hover:scale-105 hover:z-10"
                        @click="openPostModal(i)">
                        <div
                            class="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                            <span class="text-gray-500 text-sm">Post {{ i }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Post Detail Modal -->
        <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 lg:p-4">
            <div class="bg-gray-900 rounded-xl w-full max-h-screen lg:w-5/6 lg:max-h-[90vh] overflow-hidden flex flex-col">
                <!-- Modal Header -->
                <div class="p-4 border-b border-gray-800 flex justify-between items-center">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-full bg-gray-700 overflow-hidden">
                            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_2025-03-14_174905684-eKSLkoxeFIpLfr0SbfVeZ4dObqYCyj.png"
                                alt="Profile" class="w-full h-full object-cover" />
                        </div>
                        <div>
                            <p class="font-medium">Mostafa Rhazlani</p>
                            <p class="text-xs text-gray-400">@mostafa_rhazlani</p>
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
                <div class="flex flex-col lg:flex-row overflow-hidden">
                    <!-- Post Image -->
                    <div class="lg:w-2/3 bg-gray-800 flex items-center justify-center p-4">
                        <div
                            class="w-full h-80 lg:h-full bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center">
                            <span class="text-gray-500">Post {{ selectedPost }} Image</span>
                        </div>
                    </div>

                    <!-- Post Details -->
                    <div class="lg:w-1/3 p-4 overflow-y-auto">
                        <div class="space-y-4">
                            <h3 class="text-xl font-bold">Post Title {{ selectedPost }}</h3>
                            <p class="text-gray-300">
                                This is a detailed description of post {{ selectedPost }}. Here you can see all the
                                information about this post.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod,
                                nisl vel ultricies lacinia,
                                nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
                            </p>

                            <!-- Post Stats -->
                            <div class="flex items-center gap-4 text-gray-400">
                                <div class="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" class="lucide lucide-heart">
                                        <path
                                            d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                    </svg>
                                    <span>245</span>
                                </div>
                                <div class="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" class="lucide lucide-message-circle">
                                        <path
                                            d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                    </svg>
                                    <span>42</span>
                                </div>
                                <div class="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" class="lucide lucide-share">
                                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                                        <polyline points="16 6 12 2 8 6" />
                                        <line x1="12" x2="12" y1="2" y2="15" />
                                    </svg>
                                    <span>18</span>
                                </div>
                            </div>

                            <!-- Comments Section -->
                            <div class="border-t border-gray-800 pt-4 mt-4">
                                <h4 class="font-medium mb-3">Comments</h4>
                                <div class="space-y-3">
                                    <div v-for="j in 3" :key="`comment-${j}`" class="flex gap-2">
                                        <div class="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0"></div>
                                        <div class="bg-gray-800 p-2 rounded-lg text-sm flex-1">
                                            <p class="font-medium">User {{ j }}</p>
                                            <p class="text-gray-300">This is comment {{ j }} on post {{ selectedPost }}.
                                                Great content!</p>
                                            <p class="text-xs text-gray-500 mt-1">2h ago</p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Add Comment -->
                                <div class="mt-4 flex gap-2">
                                    <div class="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0"></div>
                                    <input type="text" placeholder="Add a comment..."
                                        class="bg-gray-800 text-white rounded-full px-4 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-pink-500" />
                                </div>
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