<template>
    <AlertComponent />

    <div class="flex h-screen bg-gray-900 text-white">

        <!-- Main Content -->
        <div class="w-full p-6 mt-20 mb-16 md:my-0">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-semibold">All Tags</h2>
            </div>

            <!-- Search -->
            <div class="bg-slate-800 p-4  border border-gray-700 rounded-lg mb-6">
                <div class="flex flex-col md:justify-between md:flex-row gap-4">
                    <div class="relative w-3/5">
                        <SearchIcon
                            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input type="text" placeholder="Search tags..."
                            class="w-full bg-slate-700 rounded-md pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-pink-500"/>
                    </div>
                    <form @submit.prevent="createTag">
                        <div class="flex gap-2 w-3/6 md:w-full">
                            <input :class="[ error ? 'ring-2 ring-red-600' : '' ]" v-model="formTag.tag_name" type="text" placeholder="Add new tag"
                                class="w-5/6 bg-slate-700 rounded-md px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-pink-500"/>
                            <button class="w-36 px-2 bg-pink-600 hover:bg-pink-500 rounded-md flex items-center justify-center">
                                <SpinnerComponent v-if="isLoading"/>
                                <span v-else class="flex items-center gap-1"><CirclePlus :size="18" />Add Tag</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Tags Table -->
            <div class="bg-slate-800 rounded-lg border border-gray-700 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr class="bg-slate-700">
                                <th class="py-3 px-4 text-left">#</th>
                                <th class="py-3 px-4 text-left">Tag name</th>
                                <th class="py-3 px-4 text-left">Created at</th>
                                <th class="py-3 px-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(tag, index) in tags" :key="index" 
                                class="border-b border-gray-700 hover:bg-gray-750">
                                <td class="py-3 px-4">{{ index+1 }}</td>
                                <td class="py-3 px-4 min-w-36">{{ tag.tag_name }}</td>
                                <td class="py-3 px-4">{{ tag.created_at }}</td>
                                <td class="py-3 px-4 text-center">
                                    <button class="p-1 rounded hover:bg-gray-700" title="Delete">
                                        <EditIcon class="w-5 h-5 text-gray-400 hover:text-white" />
                                    </button>
                                    <button class="p-1 rounded hover:bg-gray-700" title="Delete">
                                        <Trash2Icon class="w-5 h-5 text-gray-400 hover:text-red-500" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div class="p-4 border-t border-gray-700 flex justify-between items-center">
                    <div class="flex gap-2">
                        <button
                            class="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">
                            Previous
                        </button>
                        <button
                            class="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import axios from 'axios';
import { FileTextIcon, SearchIcon, EyeIcon, EditIcon, Trash2Icon, CirclePlus } from 'lucide-vue-next';
    import { onMounted, reactive, ref } from 'vue';
    import { useApiStore } from '@/store/apiStore';
    import AlertComponent from '@/components/AlertComponent.vue';
    import SpinnerComponent from '@/components/SpinnerComponent.vue';
    import { useAlertStore } from '@/store/alert';

    const tags = ref([]);
    const formTag = ref({
        tag_name: '',
    });
    const apiStore = useApiStore();
    const alertStore = useAlertStore();
    const error = ref('');
    const isLoading = ref(false);

    const getAllTags = async (showLoader) => {
        if(showLoader) apiStore.isLoading = true
        try {
            const response = await axios.get('/tags');
            tags.value = response.data.tags
        } catch (error) {
            console.log('Error fetching tags', error);
        } finally {
            if (showLoader) apiStore.isLoading = false
        }
    }

    const createTag = async () => {
        error.value = '';
        if(isLoading.value) return;
        isLoading.value = true;
        try {
            const response = await axios.post('tag/store', formTag.value);
            if(response.status === 200) {
                await getAllTags(false);
                alertStore.triggerAlert('Tag created successfully', 'success');
                formTag.value.tag_name = '';
            }
        } catch (err) {
            error.value = err.response.data.message
            console.log(error.value);
        } finally {
            isLoading.value = false;
        }
    }

    onMounted(() => {
        getAllTags();
    })
</script>


<style>
</style>