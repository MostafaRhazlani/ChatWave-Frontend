<script setup>

import axios from 'axios';
import { useAuthStore } from '@/store/auth';
import { useApiStore } from '@/store/apiStore';
import { Plus, Heart, MessageCircleMore, Star, Ellipsis } from 'lucide-vue-next';
import { onMounted, reactive, ref, computed, watch } from 'vue';
import DetailsPostComponent from '@/components/DetailsPostComponent.vue';
import FollowComponent from '@/components/FollowComponent.vue';
import { useRoute } from "vue-router";

const authStore = useAuthStore();
const apiStore = useApiStore();
const route = useRoute();
const activeTab = ref('Posts');
const statusVideo = ref(false);

const tabs = [
    { name: 'Posts' },
    { name: 'Videos' },
    { name: 'Photos' },
]

watch(() => route.params.id, async (newId) => {
    apiStore.showProfileUser(newId)
    apiStore.handleFollowStatus(newId);
}, { immediate: true });


// display media type if was video ir image
const DisplayMediaType = computed(() => {
    if (activeTab.value === 'Posts') {
        return apiStore.userPosts.filter(post => post.type === 'image');
    } else if (activeTab.value === 'Videos') {
        return apiStore.userPosts.filter(post => post.type === 'video');
    }
})

// change status to play or pause video 
const playPauseVideo = (event) => {
    statusVideo.value = !statusVideo.value
    const video = event.target;
    statusVideo.value === true ? video.play() : (video.pause(), video.currentTime = 0);
}
</script>

<template>

    <div class="md:w-[98%] lg:w-5/6 mx-auto mt-16 md:mt-0">
        <!-- Main Content -->
        <div>
            <!-- Profile Header -->
            <div class="border-b border-gray-700 pb-6">
                <div class="flex flex-col text-center md:flex-row md:text-start gap-6 items-center pt-8 px-4">
                    <div>
                        <div
                            class="w-36 h-36 rounded-full border-4 p-1 border-pink-500 hover:opacity-90 duration-150 cursor-pointer overflow-hidden hover:border-pink-600">
                            <img class="w-full h-full object-cover rounded-full"
                                :src="`http://127.0.0.1:8000/storage/images/${apiStore.userInfo.image}`"
                                alt="Profile Image">
                        </div>
                    </div>

                    <div class="w-full">
                        <h1 class="text-3xl font-bold mt-4">{{ apiStore.userInfo.full_name }}</h1>
                        <p class="text-pink-500 text-lg">{{ apiStore.userInfo.username }}</p>

                        <p v-if="apiStore.userInfo.description" class="text-gray-400 mt-2 max-w-lg">
                            {{ apiStore.userInfo.description }}
                        </p>
                        <p v-else class="text-gray-400 mt-2 max-w-lg">
                            Talk about yourself here
                        </p>

                        <div class="flex justify-between items-center">
                            <div class="flex justify-between w-3/4 md:w-2/6 mx-auto md:mx-0 mt-4">
                                <div class="text-center">
                                    <p class="text-gray-400">Posts</p>
                                    <p class="font-bold">{{ apiStore.userPosts.length }}</p>
                                </div>
                                <div class="text-center">
                                    <p class="text-gray-400">Following</p>
                                    <p class="font-bold">{{ apiStore.userInfo.following_count }}</p>
                                </div>
                                <div class="text-center">
                                    <p class="text-gray-400">Followers</p>
                                    <p class="font-bold">{{ apiStore.userInfo.followers_count }}</p>
                                </div>
                            </div>

                            <div v-if="authStore.user.id !== apiStore.userInfo.id">
                                <div class="flex gap-3">
                                    <FollowComponent :userId="apiStore.userInfo.id"/>
                                    <RouterLink to=""
                                        class="px-4 py-2 transition-colors duration-150 rounded-md bg-pink-600 hover:bg-pink-500">
                                        Message
                                    </RouterLink>
                                    <div
                                        class="p-2 cursor-pointer transition-colors duration-150 rounded-md bg-slate-600 hover:bg-slate-500">
                                        <Ellipsis />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="px-6 py-6">
                <h2 class="text-lg font-semibold mb-4">Highlights</h2>
                <div class="overflow-x-auto w-full scroll-smooth no-scrollbar">
                    <div class="snap-x snap-mandatory text-pink-500 flex gap-4 min-w-max">
                        <div
                            class="w-40 h-56 border-2 hover:bg-slate-800 duration-150 cursor-pointer border-dashed border-pink-500 rounded-lg flex justify-center items-center">
                            <div class="flex flex-col items-center">
                                <Plus />
                                <p>Add New</p>
                            </div>
                        </div>
                        <div v-for="i in 10" :key="`highlights-${i}`"
                            class="w-40 h-56 duration-150 cursor-pointer rounded-lg overflow-hidden">
                            <img class="w-full h-full object-cover"
                                src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"
                                alt="">
                        </div>
                    </div>
                </div>
            </div>

            <!-- Posts Section -->
            <div class="px-6 py-6">
                <!-- Page Navigation -->
                <div class="flex mb-8 border-b border-gray-700">
                    <nav class="flex space-x-8 pt-1">
                        <button v-for="(tab, index) in tabs" :key="index" @click="activeTab = tab.name" :class="[
                            'py-3 px-1 font-medium text-sm whitespace-nowrap border-b-2 transition-colors',
                            activeTab === tab.name
                                ? 'border-pink-500 text-pink-400'
                                : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'
                        ]">
                            {{ tab.name }}
                        </button>
                    </nav>
                </div>
                <h2 class="text-lg font-semibold mb-4">{{ activeTab }}</h2>
                <div v-if="activeTab === 'Posts' || activeTab === 'Videos'"
                    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <div v-for="(post) in DisplayMediaType" :key="post.id"
                        class="h-80 md:h-64 rounded-lg bg-gray-800 cursor-pointer overflow-hidden transform transition-transform hover:scale-105"
                        @click="apiStore.openModelDetailsPost(post.id)">

                        <div v-if="post.type === 'image'" class="w-full h-full">
                            <img class="w-full h-full object-cover"
                                :src="`http://127.0.0.1:8000/storage/posts/images/${post.media}`" alt="Post Image">
                        </div>
                        <div v-if="post.type === 'video'" class="w-full h-full">
                            <video class="w-full h-full" @mouseover="playPauseVideo($event)"
                                @mouseleave="playPauseVideo($event)">
                                <source :src="`http://127.0.0.1:8000/storage/posts/videos/${post.media}`"
                                    type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Post Detail Modal -->
        <transition name="fade">
            <DetailsPostComponent v-if="apiStore.showModal" />
        </transition>
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