<template>
    <div class="bg-slate-900 text-white">
        <!-- Page Header Section -->
        <div class="">
            <!-- Cover Photo -->
            <div class="h-64 md:h-[300px] w-full overflow-hidden">
                <img src="https://t3.ftcdn.net/jpg/02/73/22/74/360_F_273227473_N0WRQuX3uZCJJxlHKYZF44uaJAkh2xLG.jpg"
                    alt="Cover Photo" class="w-full h-full object-cover" />
            </div>

            <!-- Page Info Section -->
            <div class="max-w-6xl mx-auto px-4 border-b border-gray-700">
                <div class="flex flex-col md:flex-row gap-4">
                    <!-- Profile Picture -->
                    <div class="">
                        <div class="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 -mt-16 md:-mt-20 border-slate-800 bg-[#2a3142] overflow-hidden">
                            <img src="https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
                                alt="Page Profile" class="w-full h-full object-cover" />
                        </div>
                    </div>

                    <div class="flex justify-between w-full">
                        <!-- Page Info -->
                        <div class="flex-1 pt-6">
                            <h1 class="text-2xl md:text-3xl font-bold">ChatWave Official</h1>
                            <p class="text-gray-400 mt-1">@chatwave · ChatWave Company</p>
                            <div class="flex items-center gap-2 mt-2 text-gray-400 text-sm">
                                <div class="flex items-center">
                                    <Users class="w-4 h-4 mr-1" />
                                    <span>24.5K followers</span>
                                </div>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="flex items-center gap-2 mt-2 md:mt-0">
                            <button
                                class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md flex items-center gap-2 transition-colors">
                                <Plus class="w-4 h-4" />
                                <span>Follow</span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Page Navigation -->
                <div class="flex mt-4">
                    <nav class="flex space-x-8 pt-1">
                        <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="[
                            'py-3 px-1 font-medium text-sm whitespace-nowrap border-b-2 transition-colors',
                            activeTab === tab.id
                                ? 'border-blue-500 text-blue-400'
                                : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'
                        ]">
                            {{ tab.name }}
                        </button>
                    </nav>
                </div>
            </div>
        </div>

        <!-- Main Content Area -->
        <div class="max-w-3xl mx-auto px-4 py-6">
            <div v-if="activeTab === 'posts'">
                <!-- Create Post -->
                <div class="mb-4">
                    <div class="bg-slate-800 border border-gray-700 rounded-lg p-4">
                        <div class="flex items-center gap-3">
                            <input type="text" placeholder="What do you have in mind?"
                                class="bg-gray-700 text-white rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-cyan-400" />
                            <button class="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                                <Image :stroke-width="1.5" />
                            </button>
                            <button class="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                                <SquarePlay :stroke-width="1.5" />
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Posts -->
                <div class="space-y-6">
                    <!-- Post 1 -->
                    <div class="space-y-6">
                        <!-- Multiple Posts -->
                        <div v-for="post in 5" :key="`post-${post}`"
                            class="bg-slate-800 rounded-lg overflow-hidden border border-gray-700">
                            <!-- Post Header -->
                            <div class="p-4 flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
                                    <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_2025-03-16_182245839-i1J7mYAoXkpTavJKv8DDojaSWO3XQh.png"
                                        alt="Profile" class="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <p class="font-medium">Mostafa Rhazlani</p>
                                    <p class="text-xs text-gray-400">2 hours ago</p>
                                </div>
                            </div>

                            <!-- Post Content -->
                            <div class="p-4 pt-0">
                                <div class="bg-slate-700 rounded-lg h-[350px] w-full"></div>
                                <div class="mt-6">
                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique mollitia quam,
                                        optio incidunt tenetur voluptate sit dolor nemo, doloribus animi quas nostrum ex
                                        nihil assumenda earum molestiae harum, eum exercitationem.</p>
                                </div>
                                <div class="mt-6 space-x-2 text-blue-500">
                                    <span class="hover:text-blue-400">#sport</span>
                                    <span class="hover:text-blue-400">#football</span>
                                    <span class="hover:text-blue-400">#ronaldo</span>
                                    <span class="hover:text-blue-400">#messi</span>
                                </div>
                            </div>

                            <!-- Post Actions -->
                            <div class="px-4 py-2 border-t border-slate-700 flex items-center justify-between">
                                <div class="flex items-center gap-6">
                                    <div class="flex items-center gap-1">
                                        <button
                                            class="p-2 bg-slate-700 hover:bg-slate-500 cursor-pointer duration-150 flex items-center justify-center rounded-full">
                                            <Heart :size="18" />
                                        </button>
                                        <span class="text-sm">1,335</span>
                                    </div>
                                    <div class="flex items-center gap-1">
                                        <button
                                            class="p-2 bg-slate-700 hover:bg-slate-500 cursor-pointer duration-150 flex items-center justify-center rounded-full">
                                            <MessageCircleMore :size="18" />
                                        </button>
                                        <span class="text-sm">237</span>
                                    </div>
                                </div>
                                <div class="flex items-center gap-1">
                                    <button
                                        class="p-2 bg-slate-700 hover:bg-slate-500 cursor-pointer duration-150 flex items-center justify-center rounded-full">
                                        <Star :size="18" />
                                    </button>
                                    <span class="text-sm ml-1">237</span>
                                </div>
                            </div>

                            <!-- Comments -->
                            <div class="px-4 py-3 border-t border-gray-700">
                                <div class="p-2 space-y-3 rounded-md">
                                    <div class="flex items-start gap-2">
                                        <div class="w-8 h-8 rounded-full bg-slate-700 flex-shrink-0 overflow-hidden">
                                            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_2025-03-16_182245839-i1J7mYAoXkpTavJKv8DDojaSWO3XQh.png"
                                                alt="Profile" class="w-full h-full object-cover" />
                                        </div>
                                        <div class="flex flex-col">
                                            <p class="font-medium">Mostafa Rhazlani</p>
                                            <span class="text-xs text-gray-400">Hello guys how are you</span>
                                        </div>
                                    </div>
                                    <div class="flex items-start gap-2">
                                        <div class="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0 overflow-hidden">
                                            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_2025-03-16_182245839-i1J7mYAoXkpTavJKv8DDojaSWO3XQh.png"
                                                alt="Profile" class="w-full h-full object-cover" />
                                        </div>
                                        <div class="flex flex-col">
                                            <p class="font-medium">Mostafa Rhazlani</p>
                                            <span class="text-xs text-gray-400">Hello guys how are you</span>
                                        </div>
                                    </div>
                                    <div class="flex items-start gap-2">
                                        <div class="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0 overflow-hidden">
                                            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_2025-03-16_182245839-i1J7mYAoXkpTavJKv8DDojaSWO3XQh.png"
                                                alt="Profile" class="w-full h-full object-cover" />
                                        </div>
                                        <div class="flex flex-col">
                                            <p class="font-medium">Mostafa Rhazlani</p>
                                            <span class="text-xs text-gray-400">Hello guys how are you</span>
                                        </div>
                                    </div>

                                    <div>
                                        <span class="text-gray-300 cursor-pointer hover:text-gray-200">show more...</span>
                                    </div>
                                </div>

                                <!-- Add Comment -->
                                <div class="flex items-center gap-2 pt-4 border-t border-gray-700">
                                    <div class="w-8 h-8 rounded-full bg-slate-700 overflow-hidden">
                                        <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_2025-03-16_182245839-i1J7mYAoXkpTavJKv8DDojaSWO3XQh.png"
                                            alt="Profile" class="w-full h-full object-cover" />
                                    </div>
                                    <div class="w-full relative">
                                        <input type="text" placeholder="Add comment..."
                                            class="bg-slate-700 text-white rounded-full px-4 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-cyan-400 pr-16" />
                                        <button
                                            class="absolute right-2 top-1/2 -translate-y-1/2 bg-cyan-500 text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-cyan-600 transition-colors">
                                            Reply
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import {
    Users,
    Heart,
    Plus,
    Image,
    SquarePlay,
    MessageCircle as MessageCircleIcon,
    Star as StarIcon
} from 'lucide-vue-next';

const activeTab = ref('posts');

const tabs = [
    { id: 'posts', name: 'Posts' },
    { id: 'photos', name: 'Photos' },
    { id: 'videos', name: 'Videos' },
    { id: 'followers', name: 'Followers' },
]
</script>

<style>
/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hide {
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}
</style>