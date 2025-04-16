<template>
    <div class="fixed z-40 mt-0 inset-0 flex items-center justify-center bg-black/70">
        <div class="w-[90%] sm:w-full max-w-md bg-gray-900 text-white rounded-lg shadow-xl">
            <!-- Header -->
            <div class="flex items-center justify-between p-4 border-b border-gray-700">
                <h2 class="text-lg font-medium">Delete Post</h2>
                <button @click="handleClose" class="text-gray-400 hover:text-white">
                    <Close/>
                </button>
            </div>

            <!-- Body -->
            <form @submit.prevent="handleDelete" enctype="multipart/form-data">
                <!-- Footer -->

                    <div class="flex flex-col items-center p-6">
                        <Warning :size="100" :stroke-width="1.3" class="text-red-500"/>
                        <h1 class="text-xl mt-4 text-center">Are you sure you want delete this POST</h1>
                    </div>
                <div class="flex justify-between p-4 border-t border-gray-700">
                    <button @click="handleClose" type="button" class="w-1/3 py-2 px-4 bg-slate-600 hover:bg-slate-700 text-white font-medium rounded-md">
                        Cancel
                    </button>
                    <button type="submit" class="w-1/3 py-2 px-4 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-md">
                        Delete
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { X as Close, CircleAlert as Warning } from 'lucide-vue-next';
import axios from 'axios';
import { useAlertStore } from '@/store/alert';
import { useApiStore } from '@/store/apiStore';

const alertStore = useAlertStore();
const apiStore = useApiStore();
const props = defineProps({
    modelDelete: Boolean,
    post_id: Number,
});

const emit = defineEmits(['update:modelDelete']);

const handleDelete = async () => {
    
    try {
        const response = await axios.delete(`post/${props.post_id}/delete`);
        
        if(response.status === 200) {
            apiStore.postsList();
            alertStore.triggerAlert('Post deleted successfully', 'success');
        }
    } catch (error) {
        alertStore.triggerAlert('Post not deleted', 'error');
        console.log(error);
        
    }

    emit('update:modelDelete', false);
}

const handleClose = () => {
    emit('update:modelDelete', false);
}

</script>