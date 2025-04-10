<template>
    <div class="fixed z-40 inset-0 flex items-center justify-center bg-black/70">
        <div class="w-full max-w-md bg-gray-900 text-white rounded-lg shadow-xl">
            <!-- Header -->
            <div class="flex items-center justify-between p-4 border-b border-gray-700">
                <h2 class="text-lg font-medium">Create Status</h2>
                <button @click="handleClose" class="text-gray-400 hover:text-white">
                    <Close/>
                </button>
            </div>

            <!-- Body -->
            <form @submit.prevent="handleCreate" enctype="multipart/form-data">
                <div class="p-4 space-y-4">
                    <div>
                        <label for="content" class="block text-sm text-gray-300">What do you have in mind?</label>
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
                            <div v-if="postMedia" class="h-72 overflow-hidden rounded-md">
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
                                <div v-if="postMedia" class="h-72 overflow-hidden rounded-md">
                                    <video :src="postMedia" controls class="w-full h-full object-cover" />
                                </div>
                            </div>
                        </div>
                        <p class="text-red-600">{{ error.errors.media ? error.errors.media[0] : '' }}</p>
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
const postData = ref({
    content: '',
    media: null,
    type: '',
    person_id: authStore.user.id,
})

const error = reactive({ errors: {} });

const props = defineProps({
    modelCreate: Boolean,
    modelType: String
});

const emit = defineEmits(['update:modelCreate', 'update:modelType']);

const handleCreate = async () => {
    error.errors = {};

    const formData = new FormData();
    formData.append('content', postData.value.content)
    formData.append('media', postData.value.media)
    formData.append('type', props.modelType);
    formData.append('person_id', postData.value.person_id);
    
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

const handleClose = () => {
    emit('update:modelCreate', false);
}

const selectFile = () => {
    fileInput.value.click();
}

const uploadFile = (event) => {
    const file = event.target.files[0];
    postData.value.media = file;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        
        postMedia.value = e.target.result
    }
    reader.readAsDataURL(file);
}
</script>