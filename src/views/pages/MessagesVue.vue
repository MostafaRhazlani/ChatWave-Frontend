<template>
    <div
        class="pt-[4.4rem] md:pt-0  border-t border-gray-700 md:border-none h-full flex bg-slate-800 text-white overflow-hidden relative">

        <!-- Overlay for mobile when sidebar is open -->
        <div v-if="sidebarOpen" @click="toggleSidebar" class="md:hidden fixed inset-0 bg-black bg-opacity-50 z-10">
        </div>

        <!-- Conversation List Sidebar -->
        <div class="fixed md:relative z-10 w-80 h-full border-x border-gray-700 flex flex-col bg-slate-800 transition-transform duration-300 ease-in-out"
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

            <!-- Conversations -->
            <div class="overflow-y-auto">
                <div v-for="(contact, index) in apiStore.contacts" :key="index" :class="[route.params.id == contact.id ? 'bg-slate-700' : '']"
                    class="p-4 border-b border-gray-700 cursor-pointer hover:bg-slate-700 transition-colors">
                    <RouterLink :to="`/messages/${contact.id}`" class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0">
                            <img :src="`http://127.0.0.1:8000/storage/images/${contact.image}`" alt=""
                                class="w-full h-full object-cover rounded-full" />
                        </div>
                        <div class="min-w-52">
                            <div class="flex justify-between items-center">
                                <h3 class="text-white font-medium text-sm truncate">{{ contact.full_name }}</h3>
                                <span class="text-gray-400 text-xs">{{ formatDate(contact.lastMessage.created_at)
                                    }}</span>
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
                            <span class="w-2 h-2 rounded-full bg-green-500"></span>
                            <span class="text-green-500 text-xs">Online</span>
                        </div>
                    </div>
                </div>
                <button class="text-white bg-slate-700 hover:bg-slate-600 p-2 rounded-full transition-colors">
                    <Info class="w-5 h-5" />
                </button>
            </div>

            <!-- Messages -->
            <div ref="messagesContainer" class="flex-1 p-4 overflow-y-auto scrollbar-hide flex flex-col space-y-4 pb-20">

                <div v-for="(message, index) in conversation" :key="index" class="flex flex-col">
                    <div v-if="message.sender_id == authStore.user.id">
                        <!-- Received Message -->
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-gray-300">
                                <img :src="`http://127.0.0.1:8000/storage/images/${authStore.user.image}`" alt="" class="w-full h-full object-cover rounded-full" />
                            </div>
                            <div class="bg-blue-700 text-white p-3 rounded-2xl rounded-tl-none max-w-[80%]">
                                <p>{{ message.content }}</p>
                            </div>
                        </div>
                    </div>

                    <div v-else>
                        <!-- Sent Message -->
                        <div class="flex flex-row-reverse items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-gray-300">
                                <img :src="`http://127.0.0.1:8000/storage/images/${friendInfo.image}`" alt="" class="w-full h-full object-cover rounded-full" />
                            </div>
                            <div class="bg-slate-600 text-white p-3 rounded-2xl rounded-tr-none max-w-[80%]">
                                <p>{{ message.content }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Message Input -->
            <div class="mb-16 md:mb-0 p-3 border-y border-gray-700">
                <form @submit.prevent="sendMessage">
                    <div class="relative">
                        <input v-model="form.content" type="text" placeholder="Write your message"
                            class="w-full py-3 px-4 bg-slate-700 border border-gray-700 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                        <button
                            class="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 transition-colors hover:bg-slate-600 rounded-full">
                            <SendHorizontal class="w-5 h-5 text-white" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Search, Info, SendHorizontal, Menu } from 'lucide-vue-next';
import axios from 'axios';
import { nextTick, onMounted, ref, watch } from 'vue';
import { convertTime , formatDate } from '@/helpers/convertTime';
import { useApiStore } from '@/store/apiStore';
import { useAuthStore } from '@/store/auth';
import { useRoute } from 'vue-router';

// Sidebar state
const sidebarOpen = ref(false);
const conversation = ref([]);
const friendInfo = ref({});
const apiStore = useApiStore();
const authStore = useAuthStore();
const route = useRoute();
const messagesContainer = ref(null);
const form = ref({
    content: '',
    sender_id: authStore.user.id,
    receiver_id: route.params.id,
})

// Toggle sidebar function
const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value;
};

const sendMessage = async () => {
    
    const response = await axios.post('message/send', form.value);
    if(response.status === 200) {
        form.value.content = ''
        conversation.value.push(response.data.message);
        scrollToBottm();
        if(conversation.value.length <= 1) {
            apiStore.listContacts(false);
        }
    }
}

watch(() => route.params.id, async (newId) => {
    try {
        const response = await axios.get(`contact/${newId}/conversation`);
        conversation.value = response.data.messages
        friendInfo.value = response.data.friend
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

onMounted(() => {
    apiStore.listContacts();

    window.Echo.private(`chat.${authStore.user.id}`)
    .listen('.message.sent', (event) => {
        
        if (event.message.sender_id == route.params.id) {
            console.log(event.message.content);
            
            conversation.value.push(event.message)
        }
    });
})
</script>

<style>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
</style>