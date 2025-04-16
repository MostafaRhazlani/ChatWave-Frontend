<script setup>
    import LikeComponent from '@/components/LikeComponent.vue';
    import { ref, defineProps, defineEmits } from 'vue';
    import { Heart, MessageCircleMore, Star, Ellipsis, PenLine, Trash2 } from 'lucide-vue-next';
    import { useApiStore } from '@/store/apiStore';
    import { useAuthStore } from '@/store/auth';
    import axios from 'axios';
    import { convertTime } from '@/helpers/convertTime';

    const authStore = useAuthStore();
    const apiStore = useApiStore();
    const openModelComment = ref(null);
    const typeFunction = ref('create');
    const buttonType = ref('Replay');
    const commentForm = ref({
        id: 0,
        post_id: apiStore.post.id,
        person_id: authStore.user.id,
        comment: '',
    })

    // close model detail post
    const closePostModal = () => {
        apiStore.showModal = false
    };

    const handleComment = (typeFunction) => {
        if(typeFunction === 'create') {
            createComment();
        } else {
            updateComment(commentForm.value.id);
        }
    }
    const createComment = async () => {

        try {
            await axios.post('comment/create', commentForm.value);
            apiStore.openModelDetailsPost(commentForm.value.post_id);
            commentForm.value.comment = ''
        } catch (error) {
            console.log("Error fetching comments", error);
            
        }
    }

    const editComment = async (commentId) => {
        const response = await axios.get(`/comment/${commentId}/edit`);

        commentForm.value.comment = response.data.comment.comment;
        commentForm.value.id = response.data.comment.id;
        typeFunction.value = 'update';
        buttonType.value = 'Update'
        openModelComment.value = null;
    }

    const updateComment = async (commentId) => {
        try {
            await axios.patch(`/comment/${commentId}/update`, commentForm.value);
            apiStore.openModelDetailsPost(commentForm.value.post_id);
            commentForm.value.comment = ''
        } catch (error) {
            console.log("Error fetching comments", error);
 
        }
        
    }

    const deleteComment = async (commentId) => {
        try {
            await axios.delete(`/comment/${commentId}/delete`);
            apiStore.openModelDetailsPost(commentForm.value.post_id);
        } catch (error) {
            console.log("Error fetching comments", error);
 
        }
        
    }


    const toggleInfoComment = (commentId) => {

        if(openModelComment.value === commentId) {
            openModelComment.value = null
        } else {
            openModelComment.value = commentId
        }
    }
    
</script>

<template>
    <div class="fixed inset-0 bg-black min-h-screen bg-opacity-75 flex items-center justify-center z-50 lg:p-4">
        <div class="bg-gray-900 rounded-xl w-full h-full md:w-4/5 lg:w-[87%] xl:w-5/6 lg:h-5/6 overflow-hidden flex flex-col">
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
            <div class="flex overflow-y-auto md:overflow-hidden no-scrollbar h-full flex-col lg:flex-row overflow-hidden">
                <!-- Post Image -->
                <div class="lg:w-3/5 h-3/6 lg:h-full bg-gray-800 flex items-center justify-center overflow-hidden">
                    <div v-if="apiStore.typePost === 'image'" class="w-full h-full rounded-lg flex items-center justify-center">
                        <img class="w-full h-full object-contain bg-center"
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
                <div class="lg:w-2/5 h-3/6 lg:h-full overflow-y-auto no-scrollbar">
                    <div class="flex flex-col gap-4 p-4">
                        <p class="text-gray-300 break-all">
                            {{ apiStore.post.content }}
                        </p>
                        <div class="space-x-2 flex text-blue-500">
                            <span v-for="(tag, index) in apiStore.post.tags" :key="index" class="hover:text-blue-400">#{{ tag.tag_name }}</span>
                        </div>

                        <!-- Post Stats -->
                        <div class="flex items-center justify-between gap-4 text-gray-400">
                            <div class="flex gap-4">
                                <LikeComponent v-model:likesCount="apiStore.post.likes_count" v-model:isLiked="apiStore.post.is_liked" v-model:postId="apiStore.post.id"/>
                                <div class="flex items-center gap-2">
                                    <button class="w-9 h-9 bg-slate-700 text-white hover:scale-[1.1] hover:bg-slate-500 cursor-pointer duration-150 flex items-center justify-center rounded-full">
                                        <MessageCircleMore :size="24" stroke-width="2" class="mt-[1px] ml-[1px]" />
                                    </button>
                                    <span class="text-sm">{{ apiStore.post.comments.length }} comment</span>
                                </div>
                            </div>
                            <div class="flex items-center gap-1">
                                <button
                                    class="w-9 h-9 bg-slate-700 hover:scale-[1.1] text-white hover:bg-slate-500 cursor-pointer duration-150 flex items-center justify-center rounded-full">
                                    <Star :size="24" stroke-width="2" class="mt-[1px] ml-[1px]" />
                                </button>
                                <span class="text-sm ml-1">237</span>
                            </div>
                        </div>
                    </div>

                    <!-- Comments Section -->
                    <div class="border-t border-gray-800 h-full flex flex-col justify-between relative">
                        <!-- Scrollable Comments -->
                        <div class="p-4">
                            <div class="space-y-3">
                                <div v-for="(comment, index) in apiStore.post.comments" :key="index" class="flex gap-2">
                                    <div class="max-w-8 max-h-8 rounded-full bg-slate-700 overflow-hidden">
                                        <img :src="`http://127.0.0.1:8000/storage/images/${comment.person.image}`"
                                            alt="Profile" class="w-full h-full object-cover" />
                                    </div>
                                    <div class="rounded-lg mb-3">
                                        <div class="flex items-center gap-1">
                                            <p class="font-medium">{{ comment.person.full_name }} 
                                                <span v-if="comment.person.id === authStore.user.id">• You</span> 
                                                <span v-if="comment.person.id === apiStore.post.person_id"> • </span>
                                                <span class="px-1 bg-slate-600 rounded" v-if="comment.person.id === apiStore.post.person_id"> Author</span>
                                            </p>
                                            <div v-if="comment.person.id === authStore.user.id" class="relative">
                                                <div @click="toggleInfoComment(comment.id)" class="w-6 h-6 hover:bg-opacity-30 rounded-full flex justify-center items-center hover:bg-slate-600 transition cursor-pointer ">
                                                    <Ellipsis :size="20"/>
                                                </div>
                                                <transition name="fade">
                                                    <div v-if="openModelComment === comment.id" class="absolute z-30 right-0 top-9 w-32 bg-slate-700 border border-gray-600 p-1 rounded-lg">
                                                        <p @click="editComment(comment.id)" class="p-1 hover:bg-slate-600 rounded-md flex items-center gap-1 cursor-pointer"><PenLine :size="19"/> Edit</p>
                                                        <p @click="deleteComment(comment.id)" class="p-1 hover:bg-slate-600 rounded-md flex items-center gap-1 cursor-pointer"><Trash2 :size="19"/> Delete</p>
                                                    </div>
                                                </transition>
                                            </div>
                                        </div>
                                        <p class="text-gray-300 text-sm ">{{ comment.comment }}</p>
                                        <p class="text-xs text-gray-500 mt-1">{{ convertTime(comment.created_at) }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Add Comment -->
                        <div class="sticky bottom-0 w-full bg-gray-900 p-2 flex items-center gap-2 border-t border-gray-800">
                            <div class="max-w-10 max-h-10 rounded-full bg-slate-700 overflow-hidden">
                                <img :src="`http://127.0.0.1:8000/storage/images/${authStore.user.image}`"
                                    alt="Profile" class="w-full h-full object-cover" />
                            </div>
                            <div class="w-full relative">
                                <form @submit.prevent="handleComment(typeFunction)" >
                                    <textarea v-model="commentForm.comment" id="" class="bg-slate-700 text-white rounded-lg text-sm w-full pl-3 pt-2 resize-none min-h-16 focus:outline-none focus:ring-1 focus:ring-pink-400 pr-16" placeholder="Add comment..."></textarea>
                                    <button class="absolute right-2 top-1/2 -translate-y-1/2 bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-pink-600 transition-colors">
                                        {{ buttonType }}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>

textarea::-webkit-scrollbar {
 display: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>