<template>
    <div class="fixed z-40 inset-0 flex items-center justify-center bg-black/70">
        <div class="w-full max-w-md bg-gray-900 text-white rounded-lg shadow-xl">
            <!-- Header -->
            <div class="flex items-center justify-between p-4 border-b border-gray-700">
                <h2 class="text-lg font-medium">Create Post</h2>
                <button @click="handleClose" class="text-gray-400 hover:text-white">
                    <Close/>
                </button>
            </div>

            <!-- Body -->
            <form @submit.prevent="handleCreate" enctype="multipart/form-data">
                <div class="p-4 space-y-4">
                    <div>
                        <label for="content" class="block text-sm text-gray-300">What do you have in your mind?</label>
                        <textarea id="content" v-model="postData.content" rows="3" class="w-full mt-1 px-3 py-2 bg-slate-800 border border-gray-700 rounded-md text-white"></textarea>
                        <p class="text-red-600">{{ error.errors.content ? error.errors.content[0] : '' }}</p>
                    </div>

                    <!-- Image Upload -->
                    <div v-if="props.modelType == 'image'">
                        <label for="image-upload" class="block text-sm text-gray-300 mb-1">Upload Image</label>
                        <input type="file" id="image-upload" @change="uploadFile" accept="image/*" class="hidden" ref="fileInput" />
                        <div @click="selectFile" class="border border-gray-800 rounded-md text-center bg-slate-700 bg-opacity-5 cursor-pointer">
                            <div class="relative">
                                <div v-if="!postMedia" class="opacity-20 h-52 overflow-hidden rounded-lg transition duration-300">
                                    <img src="/images/background.png" class="w-full h-full object-cover opacity-25" alt="">
                                </div>
                                <div v-if="!postMedia" class="absolute bottom-6 left-1/3 flex flex-col items-center gap-1">
                                    <Image :size="30" :stroke-width="1.5"/>
                                    <p class="text-white">Click to upload image</p>
                                </div>
                            </div>
                            <div v-if="postMedia" class="h-52 overflow-hidden rounded-md">
                                <img :src="postMedia" alt="Preview" class="w-full h-full object-cover" />
                            </div>
                        </div>
                        <p class="text-red-600">{{ error.errors.media ? error.errors.media[0] : '' }}</p>
                    </div>

                    <!-- Video Upload -->
                    <div v-else>
                        <label for="image-upload" class="block text-sm text-gray-300 mb-1">Upload Video</label>
                        <input type="file" @change="uploadFile" accept="video/*" class="hidden" ref="fileInput" />
                        <div @click="selectFile" class="border border-gray-800 rounded-md text-center bg-slate-700 bg-opacity-5 cursor-pointer">
                            <div class="relative">
                                <div class="relative">
                                    <div v-if="!postMedia" class="opacity-20 h-52 overflow-hidden rounded-lg transition duration-300">
                                        <img src="/images/background.png" class="w-full h-full object-cover opacity-25" alt="">
                                    </div>
                                    <div v-if="!postMedia" class="absolute bottom-6 left-1/3 flex flex-col items-center gap-1">
                                        <SquarePlay :size="30" :stroke-width="1.5"/>
                                        <p class="text-white">Click to upload video</p>
                                    </div>
                                </div>
                                <div v-if="postMedia" class="h-52 overflow-hidden rounded-md">
                                    <video :src="postMedia" controls class="w-full h-full object-cover" />
                                </div>
                            </div>
                        </div>
                        <p class="text-red-600">{{ error.errors.media ? error.errors.media[0] : '' }}</p>
                    </div>

                    <!-- Hashtag Selection -->
                    <div>
                        <label class="block text-sm text-gray-300 mb-2">Select hashtags</label>
                        <div class="relative mb-2">
                            <input type="text" v-model="hashtagSearch" placeholder="Search hashtags..."
                                class="w-full px-3 py-2 bg-slate-800 border border-gray-700 rounded-md text-white"
                                @input="filterHashtags" @focus="showDropdown = true" @blur="handleBlur" />

                            <div v-if="showDropdown && filteredHashtags.length > 0" class="absolute z-10 mt-1 w-full bg-gray-800 border border-gray-700 rounded-md shadow-lg max-h-40 overflow-auto">
                                <div v-for="tag in filteredHashtags" :key="tag.id" @mousedown.prevent="addTag(tag)"
                                    class="px-3 py-2 cursor-pointer hover:bg-gray-700 text-gray-300">
                                    #{{ tag.tag_name }}
                                </div>
                            </div>
                        </div>
                        <p class="text-red-600">{{ error.errors.tags ? error.errors.tags[0] : '' }}</p>

                        <!-- Selected Tags -->
                        <div class="flex flex-wrap gap-2">
                            <div v-for="tag in selectedTags" :key="tag.id"
                                class="px-3 py-1 bg-gray-700 text-white rounded-full text-sm flex items-center">
                                #{{ tag.tag_name }}
                                <button @click="removeTag(tag)" class="ml-1 text-gray-400 hover:text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div class="p-4 border-t border-gray-700">
                    <button class="w-full py-2 px-4 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-md">
                        Create
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, defineProps, defineEmits } from 'vue'
import { X as Close, Image, SquarePlay } from 'lucide-vue-next';
import { useAuthStore } from '@/store/auth';
import { useAlertStore } from '@/store/alert';
import axios from 'axios';
const postMedia = ref(null);
const fileInput = ref(null);
const authStore = useAuthStore();
const alertStore = useAlertStore();
const postData = reactive({
    content: '',
    media: null,
    type: '',
    person_id: authStore.user.id,
    tags: []
})

const selectedTags = ref([]);
const hashtagSearch = ref('');
const allHashtags = ref([]);
const filteredHashtags = ref([]);
const showDropdown = ref(false);
const error = reactive({ errors: {} });

const props = defineProps({
    modelCreate: Boolean,
    modelType: String
});

const emit = defineEmits(['update:modelCreate', 'update:modelType']);

// get all tags
const tags = async () => {
    const response = await axios.get('tags');
    
    allHashtags.value = response.data.tags.map(tag => tag);
    
}

// create post as an image or video
const handleCreate = async () => {
    error.errors = {};

    const formData = new FormData();
    formData.append('content', postData.content)
    formData.append('media', postData.media)
    formData.append('type', props.modelType);
    formData.append('person_id', postData.person_id);
    formData.append('tags', JSON.stringify(postData.tags));
    
    
    try {
        const response = await axios.post('/post/create', formData);
        if(response.status === 200) {
            alertStore.triggerAlert('Post created successfully', 'success');
            handleClose();
        }
    } catch (err) {
       if(err.response && err.response.data) {
        error.errors = err.response.data.errors
       }
        
    }
}

onMounted(async () => {
    await tags();
    filteredHashtags.value = [...allHashtags.value]
    
})

const handleClose = () => {
    emit('update:modelCreate', false);
}

const selectFile = () => {
    fileInput.value.click();
}

const uploadFile = (event) => {
    const file = event.target.files[0];
    postData.media = file;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        
        postMedia.value = e.target.result
    }
    reader.readAsDataURL(file);
}

function filterHashtags() {
    const search = hashtagSearch.value.toLowerCase()
    filteredHashtags.value = allHashtags.value.filter(tag =>
        tag.tag_name.toLowerCase().includes(search) &&
        !selectedTags.value.includes(tag)
    )
    showDropdown.value = filteredHashtags.value.length > 0
}

function addTag(tag) {
    if (!selectedTags.value.includes(tag)) {
        selectedTags.value.push(tag)
        postData.tags.push(tag.id)
        hashtagSearch.value = ''
        filterHashtags()
    }
}

function removeTag(tag) {
    selectedTags.value = selectedTags.value.filter(t => t !== tag)
    postData.tags = postData.tags.filter(t => t !== tag.id);
    filteredHashtags.value.push(tag);
}

function handleBlur() {
    setTimeout(() => {
        showDropdown.value = false
    }, 150)
}
</script>