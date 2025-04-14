<script setup>
    import { defineProps, defineEmits } from 'vue';
    import { Heart, MessageCircleMore, Star } from 'lucide-vue-next';
    import { useApiStore } from '@/store/apiStore';

    const apiStore = useApiStore();
    // close model detail post
    const closePostModal = () => {
        apiStore.showModal = false
    };
    
</script>

<template>
    <div class="fixed inset-0 bg-black min-h-screen bg-opacity-75 flex items-center justify-center z-50 lg:p-4">
        <div class="bg-gray-900 rounded-xl w-full h-full lg:w-4/5 lg:h-5/6 overflow-hidden flex flex-col">
            <!-- Modal Header -->
            <div class="p-4 border-b border-gray-800 flex justify-between items-center">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
                        <img :src="`http://127.0.0.1:8000/storage/images/${apiStore.post.person.image}`" alt="Profile" class="w-full h-full object-cover" />
                    </div>
                    <div>
                        <p class="font-medium">{{ apiStore.post.person.full_name }}</p>
                        <p class="text-xs text-gray-400">{{ apiStore.post.person.username }}</p>
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
                    <div v-if="apiStore.typePost === 'image'" class="w-full lg:min-h-full rounded-lg flex items-center justify-center">
                        <img class="w-full h-full object-cover bg-center"
                            :src="`http://127.0.0.1:8000/storage/posts/images/${apiStore.post.media}`" alt="">
                    </div>
                    <div v-if="apiStore.typePost === 'video'" class="w-full h-full">
                        <video class="w-full h-full" controls>
                            <source :src="`http://127.0.0.1:8000/storage/posts/videos/${apiStore.post.media}`" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>

                <!-- Post Details -->
                <div class="lg:w-2/5 h-3/6 lg:h-full">
                    <div class="flex flex-col gap-4 p-4">
                        <p class="text-gray-300">
                            {{ apiStore.post.content }}
                        </p>
                        <div class="space-x-2 flex text-blue-500">
                            <span v-for="(tag, index) in apiStore.post.tags" :key="index" class="hover:text-blue-400">#{{ tag.tag_name }}</span>
                        </div>

                        <!-- Post Stats -->
                        <div class="flex items-center justify-between gap-4 text-gray-400">
                            <div class="flex gap-4">
                                <div class="flex items-center gap-1">
                                    <div
                                        class="h-8 w-8 bg-slate-700 hover:bg-slate-500 cursor-pointer duration-150 flex items-center justify-center rounded-full">
                                        <Heart :size="18" />
                                    </div>
                                    <span>245</span>
                                </div>
                                <div class="flex items-center gap-1">
                                    <div
                                        class="h-8 w-8 bg-slate-700 hover:bg-slate-500 cursor-pointer duration-150 flex items-center justify-center rounded-full">
                                        <MessageCircleMore :size="18" />
                                    </div>
                                    <span>10</span>
                                </div>
                            </div>
                            <div class="flex items-center gap-1">
                                <div
                                    class="h-8 w-8 bg-slate-700 hover:bg-slate-500 cursor-pointer duration-150 flex items-center justify-center rounded-full">
                                    <Star :size="18" />
                                </div>
                                <span>18</span>
                            </div>
                        </div>
                    </div>

                    <!-- Comments Section -->
                    <div class="border-t border-gray-800 flex flex-col h-full relative">
                        <!-- Scrollable Comments -->
                        <div class="overflow-y-auto no-scrollbar mb-28 p-4">
                            <div class="space-y-3">
                                <div v-for="j in 10" :key="`comment-${j}`" class="flex gap-2">
                                    <div>
                                        <div class=" w-8 h-8 rounded-full bg-gray-700"></div>
                                    </div>
                                    <div class="rounded-lg mb-3">
                                        <p class="font-medium">User {{ j }}</p>
                                        <p class="text-gray-300 text-sm ">This is comment Great content! dkod coke,oc ocej,e cejiecc ecijcei Lorem
                                            ipsum dolor sit amet consectetur, adipisicing elit. Minima earum dignissimos
                                            iste magnam perspiciatis consectetur maxime, omnis rem ad deserunt?</p>
                                        <p class="text-xs text-gray-500 mt-1">2h ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Add Comment -->
                        <div class="sticky bottom-0 w-full bg-gray-900 p-2 flex items-center gap-2 border-t border-gray-800">
                            <div class="max-w-8 max-h-8 rounded-full bg-slate-700 overflow-hidden">
                                <img :src="`http://127.0.0.1:8000/storage/images/${apiStore.post.person.image}`"
                                    alt="Profile" class="w-full h-full object-cover" />
                            </div>
                            <div class="w-full relative">
                                <input type="text" placeholder="Add comment..."
                                    class="bg-slate-700 text-white rounded-full px-4 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-pink-400 pr-16" />
                                <button
                                    class="absolute right-2 top-1/2 -translate-y-1/2 bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-pink-600 transition-colors">
                                    Reply
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
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

</style>