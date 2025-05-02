<template>
    <div
        class="pt-[4.4rem] md:pt-0  border-t border-gray-700 md:border-none h-full flex bg-slate-800 text-white overflow-hidden relative">

        <!-- Overlay for mobile when sidebar is open -->
        <div v-if="sidebarOpen" @click="toggleSidebar" class="md:hidden fixed inset-0 bg-black bg-opacity-50 z-10">
        </div>

        <!-- Conversation List Sidebar -->
        <div class="fixed md:relative z-10 max-w-80 min-w-80 h-full border-x border-gray-700 flex flex-col bg-slate-800 transition-transform duration-300 ease-in-out"
            :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'">
            <!-- Search Header -->
            <div class="p-4 border-b border-gray-700">
                <h2 class="text-white text-2xl font-semibold mb-2">Search</h2>
                <div class="relative">
                    <search class="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input type="text" placeholder="Search"
                        class="w-full pl-8 py-2 bg-slate-700 border border-gray-700 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
            </div>

            <!-- Contacts -->
            <div class="overflow-y-auto">
                <div v-for="(contact, index) in apiStore.contacts" :key="index" :class="[route.params.id == contact.id ? 'bg-slate-700' : '']"
                    class="p-4 border-b border-gray-700 cursor-pointer hover:bg-slate-700 transition-colors">
                    <RouterLink :to="`/messages/${contact.id}`" class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0">
                            <img :src="`http://127.0.0.1:8000/storage/images/${contact.image}`" alt=""
                                class="w-full h-full object-cover rounded-full" />
                        </div>
                        <div class="w-full">
                            <div class="flex justify-between items-center">
                                <h3 class="text-white font-medium text-sm truncate">{{ contact.full_name }}</h3>
                                <span class="text-gray-400 text-xs">{{ formatToTime(contact.lastMessage.created_at)}}</span>
                            </div>
                            <p class="text-gray-400 text-sm truncate"><span class="font-semibold text-gray-300"
                                    v-if="authStore.user.id == contact.lastMessage.sender_id">You :</span> {{
                                contact.lastMessage.content }}</p>
                        </div>
                    </RouterLink>
                </div>
            </div>
        </div>

        <!-- Chat Window -->
        <div class="flex flex-col w-full">
            <!-- Chat Header -->
            <div class="p-4 border-b border-gray-700 flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <!-- Mobile sidebar toggle inside header -->
                    <button @click="toggleSidebar" class="md:hidden text-white mr-2">
                        <Menu class="w-5 h-5" />
                    </button>

                    <div class="w-10 h-10 rounded-full bg-gray-300">
                        <img :src="`http://127.0.0.1:8000/storage/images/${friendInfo.image}`" alt=""
                            class="w-full h-full object-cover rounded-full" />
                    </div>
                    <div>
                        <h3 class="text-white font-medium">{{ friendInfo.full_name }}</h3>
                        <div class="flex items-center gap-1">
                            <div v-if="apiStore.user_status[friendInfo.id]?.isLoggedIn ?? friendInfo.is_logged">
                                <span class="text-xs text-green-500">Online</span>
                            </div>

                            <div v-else>
                                <span class="text-xs text-red-500">Ofline</span>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="text-white bg-slate-700 hover:bg-slate-600 p-2 rounded-full transition-colors">
                    <Info class="w-5 h-5" />
                </button>
            </div>

            <!-- messages container -->
            <div ref="messagesContainer" class="flex-1 p-4 overflow-y-auto scrollbar-hide flex flex-col space-y-4 pb-20">

                <div v-for="(message, index) in conversation" :key="index" class="flex flex-col">
                    <!-- Conversation -->
                    <div class="flex items-start gap-3">
                        <img v-if="message.sender_id === authStore.user.id" :src="`http://127.0.0.1:8000/storage/images/${authStore.user.image}`" alt="Profile" class="w-10 h-10 object-cover rounded-full mb-2" />
                        <img v-else :src="`http://127.0.0.1:8000/storage/images/${friendInfo.image}`" alt="Profile" class="w-10 h-10 object-cover rounded-full mb-2" />
                        <div class="space-y-1 w-full flex flex-col items-start relative">
                            <div class="flex items-center gap-2">
                                <span v-if="message.sender_id === authStore.user.id">{{ authStore.user.full_name }}</span>
                                <span v-else >{{ friendInfo.full_name }}</span>
                                    • <span class="text-xs text-gray-400">{{ formatToTime(message.created_at) }}</span>
                                <div v-if="message.sender_id === authStore.user.id" class="relative">
                                    <div @click="toggleMenuMessage(message.id)" class="cursor-pointer transition-colors duration-150 rounded-sm">
                                        <Ellipsis />
                                    </div>
                                    <transition name="fade">
                                        <div v-if="openModelMessageIndex === message.id" class="flex flex-col p-1 z-40 rounded-md top-6 left-0 absolute bg-slate-700">
                                            <span @click="editMessage(message.id)" v-if="!message.messageType || (message.messageType && message.content)"  class="flex items-center gap-1 p-1 hover:bg-slate-500 rounded-sm cursor-pointer"><Pencil :stroke-width="1.8" :size="21" /> Edit</span>
                                            <span @click="deleteMessage(message.id)" class="flex items-center gap-1 p-1 hover:bg-slate-500 rounded-sm cursor-pointer"><Trash2 :stroke-width="1.8" :size="21" /> Delete</span>
                                        </div>
                                    </transition>
                                </div>
                            </div>
                            <div v-if="message.content" class="text-white w-full hover:bg-slate-600 p-1 rounded-sm transition-colors duration-150">
                                <p class="break-all text-sm text-gray-200 font-light max-w-[80%]">{{ message.content }}</p>
                            </div>
                            <div v-if="message.messageType && message.messageType === 'image'" class="w-full hover:bg-slate-600 p-1 rounded-sm transition-colors duration-150">
                                <div class="w-72 h-72">
                                    <img :src="`http://127.0.0.1:8000/storage/chat/images/${message.media}`" alt="Image" class="h-full w-full object-cover rounded-md" />
                                </div>
                            </div>
                            <div v-else-if="message.messageType && message.messageType === 'video'" class="w-full hover:bg-slate-600 p-1 rounded-sm transition-colors duration-150">
                                <div class="w-72 h-72">
                                    <video :src="`http://127.0.0.1:8000/storage/chat/videos/${message.media}`" controls class="h-full w-full rounded-md"></video>
                                </div>
                            </div>
                            <div class="w-full hover:bg-slate-600 p-1 rounded-sm transition-colors duration-150" v-else-if="message.messageType && message.messageType === 'document'">
                                <a class="flex p-2 items-center gap-2 border bg-slate-800 max-w-52 border-gray-700 rounded-lg transition-colors duration-150 hover:bg-slate-600" :href="`http://127.0.0.1:8000/storage/chat/documents/${message.media}`" target="_blank">
                                    <p class="bg-red-600 p-2 rounded-sm">{{ message.media.split('.').pop().toUpperCase() }}</p>
                                    <p class="font-light text-sm hover:text-gray-300 truncate">{{ message.media }}</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Message Input -->
            <form @submit.prevent="handleChat(typeFunction)" enctype="multipart/form-data">
                <div v-if="selectedFileType" class="p-3 border-t border-gray-700 rounded-md mt-2 flex items-center justify-between gap-4">
                    <div class="flex items-center gap-2" v-if="selectedFileType === 'image'">
                        <div v-if="filePreviewUrl">
                            <img :src="filePreviewUrl" alt="Selected Image" class="h-16 rounded-md" />
                        </div>
                        <div v-else>
                            <OctagonX />
                        </div>
                        <div class="flex flex-col">
                            <span class="truncate max-w-32">{{ filename }}</span>
                            <span :class="[typeof fileSize === 'string' ? 'text-red-500' : 'text-gray-300']" class="text-xs text-gray-300 font-light">{{ convertFileSize(fileSize) }}</span>
                        </div>
                    </div>

                    <div class="flex items-center gap-2" v-else-if="selectedFileType === 'video'">
                        <div v-if="filePreviewUrl">
                            <video :src="filePreviewUrl" class="h-16 w-32 rounded-md"></video>
                        </div>
                        <div v-else>
                            <OctagonX class="text-red-500"/>
                        </div>
                        <div class="flex flex-col">
                            <span>{{ filename }}</span>
                            <span :class="[typeof fileSize === 'string' ? 'text-red-500' : 'text-gray-300']" class="text-xs font-light">{{ convertFileSize(fileSize) }}</span>
                        </div>
                    </div>

                    <div v-else-if="selectedFileType === 'document'" class="text-slate-200 p-2">
                        <span class="p-3 rounded-sm bg-red-700 text-white">{{ extension }}</span> {{ filename }}
                    </div>

                    <button @click="removeSelectedFile" class="text-red-400 hover:text-red-600 text-sm underline"><Close /></button>
                </div>
                <div class="mb-16 md:mb-0 p-3 border-y border-gray-700">
                    <div class="relative">
                        <input v-model="form.content" type="text" placeholder="Write your message"
                            class="w-full py-3 px-4 pr-24 bg-slate-700 border border-gray-700 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-pink-500" />
                        <div>
                            <div @click="toggleChooseFile" class="absolute cursor-pointer transition-colors duratoin-150 right-12 top-1/2 transform -translate-y-1/2 p-2 transition-colors hover:bg-slate-600 rounded-full">
                                <Paperclip class="w-5 h-5 text-white"/>
                            </div>
                            <transition name="fade">
                                <div v-if="chooseFileOpen" class="w-36 md:flex space-y-1 absolute bottom-12 right-10 z-40 p-1 flex-col bg-slate-800 shadow-md rounded-lg overflow-hidden border border-gray-700">
                                    <span @click="openFileInput('image')" class="flex p-2 gap-2 text-slate-300 hover:bg-slate-700 transition-colors duratoin-150 cursor-pointer rounded-md"><Image /> Image</span>
                                    <span @click="openFileInput('document')" class="flex p-2 gap-2 text-slate-300 hover:bg-slate-700 transition-colors duratoin-150 cursor-pointer rounded-md"><FileText /> Document</span>
                                    <span @click="openFileInput('video')" class="flex p-2 gap-2 text-slate-300 hover:bg-slate-700 transition-colors duratoin-150 cursor-pointer rounded-md"><SquarePlay /> Video</span>

                                    <input ref="imageInput" type="file" accept="image/*" class="hidden" @change="handleFileUpload('image', $event)" />
                                    <input ref="documentInput" type="file" accept=".pdf,.doc,.docx,.txt" class="hidden" @change="handleFileUpload('document', $event)" />
                                    <input ref="videoInput" type="file" accept="video/*" class="hidden" @change="handleFileUpload('video', $event)" />
                                </div>
                            </transition>
                        </div>
                        <button class="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 transition-colors hover:bg-slate-600 rounded-full">
                            <SendHorizontal class="w-5 h-5 text-white" />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { Search, Info, SendHorizontal, Menu, Paperclip, Image, FileText, SquarePlay, X as Close, OctagonX, Ellipsis, Download, Pencil, Trash2 } from 'lucide-vue-next';
import axios from 'axios';
import { nextTick, onMounted, ref, watch, computed } from 'vue';
import { convertTime , formatToTime } from '@/helpers/convertTime';
import { useApiStore } from '@/store/apiStore';
import { useAuthStore } from '@/store/auth';
import { useRoute, useRouter } from 'vue-router';

// Sidebar state
const sidebarOpen = ref(false);
const conversation = ref([]);
const friendInfo = ref({});
const apiStore = useApiStore();
const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
const messagesContainer = ref(null);
const chooseFileOpen = ref(false);
const imageInput = ref(null);
const documentInput = ref(null);
const videoInput = ref(null);
const selectedFile = ref(null);
const selectedFileType = ref('');
const filePreviewUrl = ref('');
const filename = ref('');
const fileSize = ref('');
const extension = ref('');
const typeFunction = ref('create');
const openModelMessageIndex = ref(null);
const form = ref({
    id: null,
    content: '',
    sender_id: authStore.user.id,
    receiver_id: route.params.id,
})

// Toggle sidebar function
const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value;
};

const toggleChooseFile = () => {
    chooseFileOpen.value = !chooseFileOpen.value;
};

const toggleMenuMessage = (messageId) => {
    if(messageId === openModelMessageIndex.value) {
        openModelMessageIndex.value = null;
    } else {
        openModelMessageIndex.value = messageId;
    }
}

const handleChat = (typeFunction) => {
    if(typeFunction === 'create') {
        sendMessage();
    } else {
        updateMessage(form.value.id);
    }
}

const editMessage = async (messageId) => {
    const response = await axios.get(`/message/${messageId}/edit`);

    form.value.content = response.data.message.content;
    form.value.id = response.data.message.id;
    typeFunction.value = 'update';
    openModelMessageIndex.value = null;
    console.log(typeFunction.value);
    }

const updateMessage = async (messageId) => {
    try {
        const response = await axios.patch(`/message/${messageId}/update`, form.value);
        form.value.content = ''
        let index = conversation.value.findIndex(msg => msg.id === response.data.message.id);
        conversation.value[index].content = response.data.message.content;
        apiStore.listContacts(false);
        
    } catch (error) {
        console.log("Error fetching message", error);

    }
}


const deleteMessage = async (messageId) => {
    try {
        await axios.delete(`/message/${messageId}/delete`);
        openModelMessageIndex.value = null;
        conversation.value = conversation.value.filter(msg => msg.id !== messageId);
        apiStore.listContacts(false);
    } catch (error) {
        console.log("Error delete message", error);
    }
}

const sendMessage = async () => {
    
    const formData = new FormData();
    if(form.value.content) {
        formData.append('content', form.value.content)
    }
    if(selectedFile.value) {
        formData.append('media', selectedFile.value)
    }
    formData.append('messageType', selectedFileType.value);
    formData.append('sender_id', form.value.sender_id);
    formData.append('receiver_id', form.value.receiver_id);
    
    const response = await axios.post('message/send', formData);
    if(response.status === 200) {
        form.value.content = ''
        conversation.value.push(response.data.message);
        removeSelectedFile();
        
        scrollToBottm();
        apiStore.listContacts(false);
    }
}

const openFileInput = (type) => {
    chooseFileOpen.value = false;
    if (type === 'image') imageInput.value.click();
    else if (type === 'document') documentInput.value.click();
    else if (type === 'video') videoInput.value.click();
};

const handleFileUpload = (type, event) => {
    const file = event.target.files[0];
    
    if (!file) return;

    const maxSizeMB = 20;
    const fileSizeInMB = file.size / (1024 * 1024);

    if ((type === 'image' || type === 'video') && fileSizeInMB > maxSizeMB) {
        selectedFile.value = null;
        selectedFileType.value = type;
        filePreviewUrl.value = '';
        filename.value = file.name;
        fileSize.value = 'File size cannot exceed 20 MB';
        return;
    }

    selectedFile.value = file;
    selectedFileType.value = type;

    if (type === 'image' || type === 'video') {
        fileSize.value = file.size;
        filePreviewUrl.value = URL.createObjectURL(file);
        filename.value = file.name;
    } else {
        extension.value = file.name.split('.').pop().toUpperCase();
        filename.value = file.name;
    }
};


const convertFileSize = (size) => {
    if(typeof size === 'string') return size;
    if(size < 1024) return size + ' B';
    if(size < 1024 * 1024) return (size / 1024).toFixed(2) + ' KB'
    if(size < 1024 * 1024 * 1024) return (size / (1024 * 1024)).toFixed(2) + ' MB'
}

const removeSelectedFile = () => {
    selectedFile.value = null;
    selectedFileType.value = '';
    filePreviewUrl.value = '';
};

watch(() => route.params.id, async (newId) => {
    if(!newId) return;

    try {
        const response = await axios.get(`contact/${newId}/conversation`);
        conversation.value = response.data.messages

        friendInfo.value = response.data.friend
        
    } catch (error) {
        console.log(error);
    }

    try {
        await axios.patch(`messages/mark-as-read`, { friend_id: newId })
        
        apiStore.getStatusMessage();
    } catch (error) {
        console.log(error);
    }

}, { immediate: true });

const scrollToBottm = () => {
    if(messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
}
watch(conversation ,() => {
    nextTick(() => {
        scrollToBottm();
    })
})

onMounted(async () => {
    await apiStore.listContacts();
    

    window.Echo.private(`chat.${authStore.user.id}`)
    .listen('.message.sent', (event) => {
        
        if (event.message.sender_id == route.params.id) {
            conversation.value.push(event.message)
            scrollToBottm();
        }
    });
})
</script>

<style>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>