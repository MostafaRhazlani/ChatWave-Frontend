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
                        <input v-model="searchInput" @input="searchTag" type="text" placeholder="Search tags..."
                            class="w-full bg-slate-700 rounded-md pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-pink-500"/>
                    </div>
                    <form @submit.prevent="handleSubmit">
                        <div class="flex gap-2 w-3/6 md:w-full">
                            <input :class="[ error ? 'ring-2 ring-red-600' : '' ]" v-model="formTag.tag_name" type="text" placeholder="Enter tag name"
                                class="w-5/6 bg-slate-700 rounded-md px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-pink-500"/>
                            <button class="w-44 px-2 bg-pink-600 hover:bg-pink-500 rounded-md flex items-center justify-center">
                                <SpinnerComponent v-if="isFormLoading" class="w-6 h-6"/>
                                <div v-else>
                                    <span v-if="statusButton === 'create'" class="flex items-center gap-1"><CirclePlus :size="18" />Add Tag</span>
                                    <span v-else class="flex items-center gap-1"><EditIcon :size="18" />Update Tag</span>
                                </div>
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
                                <td class="py-3 px-4">{{ formatToSimpleDate(tag.created_at) }}</td>
                                <td class="py-3 px-4 flex justify-center">
                                    <button @click="editTag(tag.id)" class="p-1 rounded hover:bg-gray-700 flex" title="Edit">
                                        <SpinnerComponent v-if="activeLoaderId === tag.id && statusButton === 'update'" class="w-5 h-5" />
                                        <EditIcon v-else class="w-5 h-5 text-gray-400 hover:text-white" />
                                    </button>
                                    <button @click="deleteTag(tag.id)" class="p-1 rounded hover:bg-gray-700 flex" title="Delete">
                                        <SpinnerComponent v-if="activeLoaderId === tag.id && statusButton === 'delete'" class="w-5 h-5" />
                                        <Trash2Icon v-else class="w-5 h-5 text-gray-400 hover:text-red-500" />
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
    import { formatToSimpleDate } from '@/helpers/convertTime';

    const tags = ref([]);
    const formTag = ref({
        id: null,
        tag_name: '',
    });
    const apiStore = useApiStore();
    const alertStore = useAlertStore();
    const error = ref('');
    const isFormLoading = ref(false);
    const isSearchLoading = ref(false);
    const activeLoaderId = ref(null);
    const statusButton = ref('create');
    const searchInput = ref('');

    const getAllTags = async (showLoader = true) => {
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

    const handleSubmit = () => {
        if(statusButton.value === 'create') {
            createTag();
        } else {
            updateTag(formTag.value.id)
        }
    }

    const createTag = async () => {
        error.value = '';
        if(isFormLoading.value) return;
        isFormLoading.value = true;
        try {
            const response = await axios.post('tag/store', formTag.value);
            if(response.status === 200) {
                await getAllTags(false);
                alertStore.triggerAlert('Tag created successfully', 'success');
                formTag.value.tag_name = '';
                searchInput.value = '';
            }
        } catch (err) {
            error.value = err.response.data.message
        } finally {
            isFormLoading.value = false;
        }
    }

    const editTag = async (tagId) => {
        if(activeLoaderId.value !== null) return;
        activeLoaderId.value = tagId;
        statusButton.value = 'update';
        try {
            const response = await axios.get(`tag/${tagId}/edit`);
            if(response.status === 200) {
                formTag.value = response.data.tag;
            }
        } catch (error) {
            console.log('Error fetchng tag', error); 
        } finally {
            activeLoaderId.value = null;
        }
    }

    const updateTag = async (tagId) => {
        error.value = '';
        if(isFormLoading.value) return;
        isFormLoading.value = true;
        try {
            const response = await axios.patch(`tag/${tagId}/update`, formTag.value);
            if(response.status === 200) {
                await getAllTags(false);
                alertStore.triggerAlert('Tag updated successfully', 'success');
                statusButton.value = 'create';
                formTag.value.tag_name = '';
                searchInput.value = '';
            }
        } catch (err) {
            error.value = err.response.data.message
        } finally {
            isFormLoading.value = false;
        }
    }
    
    const deleteTag = async (tagId) => {
        if(activeLoaderId.value !== null) return;
        activeLoaderId.value = tagId;
        statusButton.value = 'delete';
        try {
            const response = await axios.delete(`tag/${tagId}/delete`);
            if(response.status === 200) {
                await getAllTags(false);
                alertStore.triggerAlert('Tag deleted successfully', 'success');
                searchInput.value = '';
            }
        } catch (err) {
            error.value = err.response.data.message
        } finally {
            activeLoaderId.value = null;
        }
    }

    let timer;
    const searchTag = () => {
        clearTimeout(timer);
        isSearchLoading.value = true
        timer = setTimeout(async () => {
            try {
                if(searchInput.value) {
                    const response = await axios.get('tags/search', { params: { query: searchInput.value }});
                    tags.value = response.data.tags
                } else {
                    await getAllTags(false);
                }
            } catch(error) {
                console.log(error);
            } finally {
                isSearchLoading.value = false
            }
        }, 1000);
    }

    onMounted(() => {
        getAllTags();
    })
</script>


<style>
</style>