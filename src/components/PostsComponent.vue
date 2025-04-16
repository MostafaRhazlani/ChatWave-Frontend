<script setup>
    import UpdatePostComponent from './UpdatePostComponent.vue';
    import DeleteModelComponent from '@/components/DeleteModelComponent.vue';
    import DetailsPostComponent from '@/components/DetailsPostComponent.vue';
    import LikeComponent from '@/components/LikeComponent.vue';
    import axios from 'axios';
    import { convertTime } from '@/helpers/convertTime';
    import { MessageCircleMore, Star, EllipsisVertical, PenLine, Trash2, MessageSquareWarning as Report} from 'lucide-vue-next';
    import { ref, onMounted, computed, watch } from 'vue';
    import { useRoute } from 'vue-router';
    import { useAuthStore } from '@/store/auth';
    import { useApiStore } from '@/store/apiStore';
    
    const authStore = useAuthStore();
    const apiStore = useApiStore();
    const post = ref({})
    const post_id = ref(null);
    const route = useRoute();
    const openModelPostId = ref(null);
    const modelType = ref(null);
    const isModelUpdateOpen = ref(false);
    const isModelDeleteOpen = ref(false);
    const commentForm = ref({
        post_id: 0,
        person_id: authStore.user.id,
        comment: '',
    })
    

    const DisplayMediaType = computed(() => {
        if(route.name === 'Home') {
            return apiStore.posts.filter(post => post.type === 'image');
        } else if(route.name === 'Videos') {
            return apiStore.posts.filter(post => post.type === 'video');
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

    const createComment = async (postId) => {
        commentForm.value.post_id = postId;
        try {
            await axios.post('comment/create', commentForm.value);
            commentForm.value.comment = ''
        } catch (error) {
            console.log("Error fetching comments", error);
        }
        apiStore.postsList();
    }

    onMounted(() => {
        apiStore.postsList();
    })
</script>

<template>
    <div v-if="DisplayMediaType.length > 0" class="flex flex-col gap-4">
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
                <div v-if="post.person.id === authStore.user.id" class="relative">
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
                <div v-if="post.type === 'image'" class="bg-slate-700 rounded-lg h-[350px] w-full overflow-hidden cursor-pointer">
                    <img :src="`http://127.0.0.1:8000/storage/posts/images/${post.media}`" class="w-full h-full object-cover" alt="">
                </div>
                <div v-else class="bg-slate-700 rounded-lg h-[350px] w-full overflow-hidden">
                    <video class="w-full h-full" controls>
                        <source :src="`http://127.0.0.1:8000/storage/posts/videos/${post.media}`" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div class="mt-6">
                    <p class="break-all">{{ post.content }}</p>
                </div>
                <div class="mt-6 space-x-2 flex text-blue-500">
                    <span v-for="(tag, index) in post.tags" :key="index" class="hover:text-blue-400">#{{ tag.tag_name }}</span>
                </div>
            </div>

            <!-- Post Actions -->
            <div class="px-4 py-2 border-t border-slate-700 flex items-center justify-between">
                <div class="flex items-center gap-6">
                    <LikeComponent v-model:likesCount="post.likes_count" v-model:isLiked="post.is_liked" v-model:postId="post.id"/>
                    <div class="flex items-center gap-2">
                        <button @click="apiStore.openModelDetailsPost(post.id)" class="w-9 h-9 bg-slate-700 hover:scale-[1.1] hover:bg-slate-500 cursor-pointer duration-150 flex items-center justify-center rounded-full">
                            <MessageCircleMore :size="24" stroke-width="2" class="mt-[1px] ml-[1px]" />
                        </button>
                        <span class="text-sm">{{ post.comments_count }} comment</span>
                    </div>
                </div>
                <div class="flex items-center gap-1">
                    <button
                        class="w-9 h-9 bg-slate-700 hover:scale-[1.1] hover:bg-slate-500 cursor-pointer duration-150 flex items-center justify-center rounded-full">
                        <Star :size="24" stroke-width="2" class="mt-[1px]" />
                    </button>
                    <span class="text-sm ml-1">237</span>
                </div>
            </div>

            <!-- Comments -->
            <div class="px-4 py-3 border-t border-gray-700">
                <div v-if="post.latest_three_comments.length > 0" class="p-2 space-y-3 rounded-md">
                    <div v-for="(comment, index) in post.latest_three_comments" :key="index" class="flex items-start gap-2">
                        <div class="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0 overflow-hidden">
                            <img :src="`http://127.0.0.1:8000/storage/images/${comment.person.image}`"
                                alt="Profile" class="w-full h-full object-cover" />
                        </div>
                        <div class="flex flex-col">
                            <p class="font-medium">{{ comment.person.full_name }}</p>
                            <span class="text-xs text-gray-400">{{ comment.comment }}</span>
                            <p class="text-xs text-gray-500 mt-1">{{ convertTime(comment.created_at) }}</p>
                        </div>
                    </div>

                    <div>
                        <span @click="apiStore.openModelDetailsPost(post.id)" class="text-gray-300 cursor-pointer hover:text-gray-200">show more...</span>
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
                        <form @submit.prevent="createComment(post.id)" >
                            <textarea v-model="commentForm.comment" id="" class="bg-slate-700 text-white rounded-lg text-sm w-full pl-3 pt-2 resize-none min-h-16 focus:outline-none focus:ring-1 focus:ring-pink-400 pr-16" placeholder="Add comment..."></textarea>
                            <button class="absolute right-2 top-1/2 -translate-y-1/2 bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-pink-600 transition-colors">
                                Reply
                            </button>
                        </form>
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
        <UpdatePostComponent v-if="isModelUpdateOpen" v-model:modelType="modelType" v-model:modelUpdate="isModelUpdateOpen" v-model:post="post" />
    </transition>
    <transition name="fade">
        <DeleteModelComponent v-if="isModelDeleteOpen" v-model:modelDelete="isModelDeleteOpen" v-model:post_id="post_id" />
    </transition>

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

</style>