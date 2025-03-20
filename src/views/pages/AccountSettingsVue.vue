<template>

    <!-- alert success -->
    <AlertComponent/>

    <div class="mt-20 md:mt-0 text-white p-4 md:p-6">
        <div class="w-full md:w-4/5 lg:w-4/5 xl:w-3/5 mx-auto mb-16">
            <div class="bg-slate-800 rounded-lg mb-8 border border-gray-700">
                <!-- Profile Header -->
                <div class="flex gap-4 items-center p-10">
                    <div class="relative group">
                        <div @click="selectFile" class="w-20 h-20 rounded-full overflow-hidden bg-gray-800 border-4 border-gray-800">
                            <img :src="profileImage"
                                alt="Profile" class="w-full h-full object-cover" />
                        </div>
                        <div @click="selectFile" class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 rounded-full transition-opacity cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                class="text-white">
                                <path
                                    d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                                <circle cx="12" cy="13" r="3" />
                            </svg>
                        </div>
                        <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="uploadFile">
                    </div>
                    <div>
                        <h1 class="text-2xl font-bold">{{ authStore.user.full_name }}</h1>
                        <p class="text-blue-400">@{{ authStore.user.username }}</p>
                    </div>
                </div>

                <!-- Navigation Tabs -->
                <div class="border-t border-gray-700">
                    <nav class="flex space-x-8 px-4 pt-1">
                        <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="[
                            'py-3 px-1 font-medium text-sm whitespace-nowrap border-b-2 transition-colors',
                            activeTab === tab.id
                                ? 'border-blue-500 text-blue-400'
                                : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'
                        ]">
                            {{ tab.name }}
                        </button>
                    </nav>
                </div>
            </div>

            <!-- Settings Content -->
            <div class="bg-slate-800 rounded-lg p-6 border border-gray-700">
                <!-- General Settings -->
                <div v-if="activeTab === 'general'" class="space-y-6">
                    <h2 class="text-xl font-semibold mb-4">Personal Details</h2>
                    <div class="bg-gray-900 rounded-lg p-4">
                        <h2 class="text-lg font-medium mb-4">Change Your Information</h2>
                        <form @submit.prevent="handleUpdate" method="post" class="space-y-6">
                            <div class="md:flex gap-4">
                                <!-- Username -->
                                <div class="grid gap-2 w-full mb-6 md:mb-0">
                                    <label for="username" class="text-sm font-medium text-gray-300">Username</label>
                                    <input v-model="formData.username" id="username" type="text" placeholder="Username"
                                        class="bg-slate-800 border border-gray-700 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow" />
                                </div>

                                <!-- Full name -->
                                <div class="grid gap-2 w-full">
                                    <label for="full_name" class="text-sm font-medium text-gray-300">Full name</label>
                                    <input v-model="formData.full_name" id="full_name" type="text" placeholder="Full name"
                                        class="bg-slate-800 border border-gray-700 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow" />
                                </div>
                            </div>

                            <!-- Email -->
                            <div class="grid gap-2">
                                <label for="email" class="text-sm font-medium text-gray-300">Email</label>
                                <input v-model="formData.email" id="email" type="email" placeholder="Email"
                                    class="bg-slate-800 border border-gray-700 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow" />
                            </div>

                            <!-- Bio -->
                            <div class="grid gap-2">
                                <label for="bio" class="text-sm font-medium text-gray-300">Bio</label>
                                <textarea id="bio" rows="4" placeholder="Enter your bio" v-model="formData.description"
                                    class="bg-slate-800 border border-gray-700 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow resize-none"></textarea>
                            </div>

                            <div class="md:flex gap-4">
                                <!-- Dte birth -->
                                <div class="grid gap-2 w-full mb-6 md:mb-0">
                                    <label for="date_birth" class="text-sm font-medium text-gray-300">Date Birth</label>
                                    <input v-model="formData.date_birth" id="date_birth" type="date"
                                        class="bg-slate-800 border border-gray-700 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow" />
                                </div>

                                <!-- Nationality -->
                                <div class="grid gap-2 w-full">
                                    <label for="nationality" class="text-sm font-medium text-gray-300">Nationality</label>
                                    <div class="relative">
                                        <CountriesComponent v-model="formData.nationality"/>
                                        <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                            <ChevronDown :size="20" class="opacity-60"/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="md:flex gap-4">
                                <!-- Gender -->
                                <div class="grid gap-2 w-full mb-6 md:mb-0">
                                    <label for="gender" class="text-sm font-medium text-gray-300">Gender</label>
                                    <div class="relative">
                                        <select id="gender" v-model="formData.gender"
                                            class="appearance-none bg-slate-800 border border-gray-700 rounded-md px-4 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow">
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                        <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                            <ChevronDown :size="20" class="opacity-60"/>
                                        </div>
                                    </div>
                                </div>

                                <!-- Relationship Status -->
                                <div class="grid gap-2 w-full">
                                    <label for="relationship" class="text-sm font-medium text-gray-300">Relationship</label>
                                    <div class="relative">
                                        <select v-model="formData.relationship" id="relationship"
                                            class="appearance-none bg-slate-800 border border-gray-700 rounded-md px-4 py-2.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow">
                                            <option value="none">None</option>
                                            <option value="single">Single</option>
                                            <option value="in-relationship">In a relationship</option>
                                            <option value="married">Married</option>
                                            <option value="complicated">It's complicated</option>
                                        </select>
                                        <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                            <ChevronDown :size="20" class="opacity-60"/>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <!-- Action Buttons -->
                            <div class="flex items-center justify-end space-x-4 pt-4">
                                <button type="button"
                                    class="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white bg-slate-600 rounded-md transition-colors">
                                    Cancel
                                </button>
                                <button type="submit"
                                    class="px-4 py-2 text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 rounded-md transition-colors">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Password and security -->
                <div v-if="activeTab === 'security'" class="space-y-6">
                    <h2 class="text-xl font-semibold mb-4">Password and security</h2>

                    <!-- Change Password -->
                    <div class="bg-gray-900 rounded-lg p-4">
                        <h3 class="text-lg font-medium mb-4">Change Password</h3>
                        <form @submit.prevent="changePassword" class="space-y-4">
                            <div class="grid gap-2">
                                <label for="current-password" class="text-sm font-medium text-gray-300">Current
                                    Password</label>
                                <input id="current-password" type="password"
                                    class="bg-slate-800 border border-gray-700 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow" />
                            </div>

                            <div class="grid gap-2">
                                <label for="new-password" class="text-sm font-medium text-gray-300">New Password</label>
                                <input id="new-password" type="password"
                                    class="bg-slate-800 border border-gray-700 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow" />
                            </div>

                            <div class="grid gap-2">
                                <label for="confirm-password" class="text-sm font-medium text-gray-300">Confirm New
                                    Password</label>
                                <input id="confirm-password" type="password"
                                    class="bg-slate-800 border border-gray-700 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow" />
                            </div>

                            <div class="flex justify-end">
                                <button type="submit"
                                    class="px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-md transition-colors">
                                    Update Password
                                </button>
                            </div>
                        </form>
                    </div>

                    <!-- Danger Zone -->
                    <div class="bg-gray-900 rounded-lg p-4 border border-red-800">
                        <h3 class="text-lg font-medium text-red-500 mb-4">Danger Zone</h3>
                        <p class="text-sm text-gray-400 mb-4">Once you delete your account, there is no going back.
                            Please be
                            certain.</p>
                        <button
                            class="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors">
                            Delete Account
                        </button>
                    </div>
                </div>

                <!-- Privacy Settings -->
                <div v-if="activeTab === 'privacy'" class="space-y-6">
                    <h2 class="text-xl font-semibold mb-4">Privacy Settings</h2>

                    <!-- Blocked Accounts -->
                    <div class="bg-gray-900 rounded-lg p-4">
                        <h3 class="text-lg font-medium mb-4">Blocked Accounts</h3>

                        <div class="space-y-3">
                            <div class="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-full bg-gray-700"></div>
                                    <div>
                                        <p class="font-medium">John Smith</p>
                                        <p class="text-xs text-gray-400">@johnsmith</p>
                                    </div>
                                </div>
                                <button
                                    class="px-2 py-1 text-xs font-medium text-white bg-cyan-500 hover:bg-cyan-600 rounded-full transition-colors">
                                    Unblock
                                </button>
                            </div>

                            <div class="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-full bg-gray-700"></div>
                                    <div>
                                        <p class="font-medium">Jane Doe</p>
                                        <p class="text-xs text-gray-400">@janedoe</p>
                                    </div>
                                </div>
                                <button
                                    class="px-2 py-1 text-xs font-medium text-white bg-cyan-500 hover:bg-cyan-600 rounded-full transition-colors">
                                    Unblock
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import CountriesComponent from '@/components/CountriesComponent.vue';
import AlertComponent from '@/components/AlertComponent.vue';
import { ChevronDown } from 'lucide-vue-next';
import { useAuthStore } from '@/store/auth';
import { useAlertStore } from '@/store/alert';
import { ref } from 'vue'
import axios from 'axios';

const authStore = useAuthStore();
const alertStore = useAlertStore();
const tabs = [
    { id: 'general', name: 'General' },
    { id: 'security', name: 'Security' },
    { id: 'privacy', name: 'Privacy' },
]

const formData = ref({
    'username': authStore.user.username,
    'full_name': authStore.user.full_name,
    'email': authStore.user.email,
    'description': authStore.user.description,
    'date_birth': authStore.user.date_birth,
    'nationality': authStore.user.nationality,
    'gender': authStore.user.gender,
    'relationship': authStore.user.relationship,
});
const activeTab = ref('general');

// upload file
const profileImage = ref(authStore.user.image ? `/images/${authStore.user.image}` : '/images/default_image.jpg');
const fileInput = ref(null);

const selectFile = () => {
    fileInput.value.click();
}

const uploadFile = (event) => {
    const file = event.target.files[0];
    if(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            profileImage.value = e.target.result
            
        }
        reader.readAsDataURL(file);
    }
}

const handleUpdate = async () => {
    const response = await axios.put('user/update', formData.value);
    
    try {
        if(response.status === 200) {
            alertStore.triggerAlert('User updated successfully', 'success');
            authStore.setUser(response.data.user);
        }
    } catch (error) {
        console.log(error);    
    }
}

</script>