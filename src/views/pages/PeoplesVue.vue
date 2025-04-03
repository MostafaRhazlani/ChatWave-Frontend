<template>
    <div class="mt-20 flex bg-slate-900 w-full md:w-5/6 mx-auto lg:w-full xl:w-[70%] text-white overflow-hidden">

        <!-- Main Content -->
        <div class="w-full p-4 pt-6 mb-16">
            <h1 class="text-3xl font-semibold mb-4">Peoples</h1>

            <div class="border-b border-[#2a3142] pb-4 mb-4"></div>

            <!-- People List -->
            <div class="space-y-4">
                <h2 class="text-xl font-semibold mb-4">Friend requests</h2>
                <div v-for="(person, index) in people" :key="index" class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
                            <img :src="person.avatar" :alt="person.name" class="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h3 class="text-white font-medium">{{ person.name }}</h3>
                            <p class="text-gray-400 text-sm">{{ person.followers }} following</p>
                        </div>
                    </div>
                    <div class="flex gap-2 flex-col sm:flex-row">
                        <button
                            class="px-4 py-1.5 bg-[#3a4356] text-white rounded-md hover:bg-[#4a5366] transition-colors">
                            Follow back
                        </button>
                        <button
                            class="px-4 py-1.5 bg-[#e91e63] text-white rounded-md hover:bg-[#d81b60] transition-colors">
                            Message
                        </button>
                    </div>
                </div>
            </div>

            <!-- Suggested People Section -->
            <div class="mt-8">
                <h2 class="text-xl font-semibold mb-4">Suggested People</h2>
                <div class="space-y-4">
                    <div v-for="(person, index) in suggestedPeople" :key="index"
                        class="flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
                                <img :src="person.avatar" :alt="person.name" class="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h3 class="text-white font-medium">{{ person.name }}</h3>
                                <p class="text-gray-400 text-sm">{{ person.followers }} following</p>
                            </div>
                        </div>
                        <div class="flex gap-2 flex-col sm:flex-row">
                            <button
                                class="px-4 py-1.5 bg-[#3a4356] text-white rounded-md hover:bg-[#4a5366] transition-colors">
                                Follow
                            </button>
                            <button
                                class="px-4 py-1.5 bg-[#e91e63] text-white rounded-md hover:bg-[#d81b60] transition-colors">
                                Message
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {
    Home as HomeIcon,
    Video as VideoIcon,
    Search as SearchIcon,
    MessageSquare as MessageSquareIcon,
    Bell as BellIcon,
    Users as UsersIcon,
    Layers as LayersIcon,
    User as UserIcon
} from 'lucide-vue-next';

// Navigation menu items
const menuItems = [
    { icon: HomeIcon, label: "Home" },
    { icon: VideoIcon, label: "Videos" },
    { icon: SearchIcon, label: "Search" },
    { icon: MessageSquareIcon, label: "Messages" },
    { icon: BellIcon, label: "Notification" },
    { icon: UsersIcon, label: "People" },
    { icon: LayersIcon, label: "Pages" },
    { icon: UserIcon, label: "Profile" },
];

// People who followed me
const people = [
    {
        name: "Othmane Rhazlani",
        followers: "30k",
        avatar: "/placeholder.svg?height=50&width=50"
    },
    {
        name: "Othmane Rhazlani",
        followers: "100k",
        avatar: "/placeholder.svg?height=50&width=50"
    },
    {
        name: "Othmane Rhazlani",
        followers: "599",
        avatar: "/placeholder.svg?height=50&width=50"
    },
    {
        name: "Othmane Rhazlani",
        followers: "30k",
        avatar: "/placeholder.svg?height=50&width=50"
    },
    {
        name: "Othmane Rhazlani",
        followers: "100k",
        avatar: "/placeholder.svg?height=50&width=50"
    }
];

// Suggested people
const suggestedPeople = [
    {
        name: "Othmane Rhazlani",
        followers: "599",
        avatar: "/placeholder.svg?height=50&width=50"
    },
    {
        name: "Othmane Rhazlani",
        followers: "30k",
        avatar: "/placeholder.svg?height=50&width=50"
    },
    {
        name: "Othmane Rhazlani",
        followers: "100k",
        avatar: "/placeholder.svg?height=50&width=50"
    },
    {
        name: "Othmane Rhazlani",
        followers: "599",
        avatar: "/placeholder.svg?height=50&width=50"
    }
];
</script>

<style>
/* Add any additional styles here if needed */
</style>