<script setup>
    import UpdatePostComponent from './UpdatePostComponent.vue';
    import axios from 'axios';
    import { convertTime } from '@/helpers/convertTime';
    import { Heart, MessageCircleMore, Star, EllipsisVertical, PenLine, Trash2, MessageSquareWarning as Report} from 'lucide-vue-next';
    import { ref, onMounted, computed, watch } from 'vue';
    import { useRoute } from 'vue-router';
    import DeleteModelComponent from './deleteModelComponent.vue';

    const posts = ref([]);
    const post = ref({})
    const post_id = ref(null);
    const route = useRoute();
    const openModelPostId = ref(null);
    const modelType = ref(null);
    const isModelUpdateOpen = ref(false);
    const isModelDeleteOpen = ref(false);
    
    const postsList = async () => {
        const response = await axios.get('posts');
        posts.value = response.data.posts
    }

    const DisplayMediaType = computed(() => {
        if(route.name === 'Home') {
            return posts.value.filter(post => post.type === 'image');
        } else if(route.name === 'Videos') {
            return posts.value.filter(post => post.type === 'video');
        }
    })

    const toggleInfoPost = (postId) => {

        if(openModelPostId.value === postId) {
            openModelPostId.value = null
        } else {
            openModelPostId.value = postId
        }
    }

    const toggleModelUpdate = async (type, postId) => {
        
        try {
            openModelPostId.value = null
            modelType.value = type
            isModelUpdateOpen.value = true

            const response = await axios.get(`post/${postId}/edit`);
            post.value = response.data.post

        } catch (error) {
            console.log("Error fetching post data", error);
        }
    }

    const toggleModelDelete = (postId) => {
        openModelPostId.value = null
        isModelDeleteOpen.value = true
        post_id.value = postId;
    }

    onMounted(() => {
        postsList();
    })
</script>

<template>
    <div v-if="DisplayMediaType.length > 0" class="space-y-6">
        <div v-for="(post, index) in DisplayMediaType" :key="index" class="bg-slate-800 rounded-lg overflow-hidden border border-gray-700">
            <!-- Post Header -->
            <div class="p-4 flex justify-between items-center gap-3">
                <div class="flex gap-3">
                    <div class="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
                        <img :src="`http://127.0.0.1:8000/storage/images/${post.person.image}`"
                            alt="Profile" class="w-full h-full object-cover" />
                    </div>
                    <div>
                        <p class="font-medium">{{ post.person.full_name }}</p>
                        <p class="text-xs text-gray-400">{{ convertTime(post.created_at) }}</p>
                    </div>
                </div>
                <div class="relative">
                    <div @click="toggleInfoPost(post.id)" class="w-7 h-7 rounded-full flex justify-center items-center hover:bg-slate-600 transition cursor-pointer ">
                        <EllipsisVertical :size="20"/>
                    </div>
                    <transition name="fade">
                        <div v-if="openModelPostId === post.id" class="absolute z-30 right-0 top-9 w-32 bg-slate-700 border border-gray-600 p-1 rounded-lg">
                            <p @click="toggleModelUpdate(post.type, post.id)" class="p-1 hover:bg-slate-600 rounded-md flex items-center gap-1 cursor-pointer"><PenLine :size="19"/> Update</p>
                            <p @click="toggleModelDelete(post.id)" class="p-1 hover:bg-slate-600 rounded-md flex items-center gap-1 cursor-pointer"><Trash2 :size="19"/> Delete</p>
                        </div>
                    </transition>
                </div>
            </div>

            <!-- Post Content -->
            <div class="p-4 pt-0">
                <div v-if="post.type === 'image'" class="bg-slate-700 rounded-lg h-[350px] w-full overflow-hidden">
                    <img :src="`http://127.0.0.1:8000/storage/posts/images/${post.media}`" class="w-full h-full object-cover" alt="">
                </div>
                <div v-else class="bg-slate-700 rounded-lg h-[350px] w-full overflow-hidden">
                    <video class="w-full h-full" controls>
                        <source :src="`http://127.0.0.1:8000/storage/posts/videos/${post.media}`" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div class="mt-6">
                    <p>{{ post.content }}</p>
                </div>
                <div class="mt-6 space-x-2 flex text-blue-500">
                    <span v-for="(tag, index) in post.tags" :key="index" class="hover:text-blue-400">#{{ tag.tag_name }}</span>
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
    <div v-else>
        <div class="bg-slate-800 rounded-lg overflow-hidden border border-gray-700 p-4 text-center">
            <p>Not found posts follow peoples you know or add new post</p>
        </div>
    </div>

    <transition name="fade">
        <UpdatePostComponent v-if="isModelUpdateOpen" v-model:modelType="modelType" v-model:modelUpdate="isModelUpdateOpen" v-model:post="post" v-model:refreshPosts="postsList" />
    </transition>
    <transition name="fade">
        <DeleteModelComponent v-if="isModelDeleteOpen" v-model:modelDelete="isModelDeleteOpen" v-model:post_id="post_id" v-model:refreshPosts="postsList" />
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

</style>