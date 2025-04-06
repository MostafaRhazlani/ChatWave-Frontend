<script setup>
    import { Search as SearchIcon } from 'lucide-vue-next';

    const search = [
        { name: 'Othmane Rhazlani', username: "@othmane"},
        { name: 'Othmane Rhazlani', username: "@othmane"},
        { name: 'Othmane Rhazlani', username: "@othmane"},
        { name: 'Sport', username: "@sport-channel"},
        { name: 'Sport', username: "@sport-channel"},
        { name: 'Othmane Rhazlani', username: "@othmane"},
        { name: 'Sport', username: "@sport-channel"},
        { name: 'Othmane Rhazlani', username: "@othmane"},
        { name: 'Sport', username: "@sport-channel"},
        { name: 'Sport', username: "@sport-channel"},
    ]
</script>

<template>
    <div class="h-full border-r md:border-x border-gray-700 flex flex-col bg-slate-800 transition-transform duration-300 ease-in-out">
        <div class="p-4">
            <h2 class="text-white text-2xl font-semibold mb-2">Search </h2>
            <div class="relative">
                <SearchIcon class="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input type="text" placeholder="Search"
                    class="w-full pl-8 py-2 bg-slate-700 border border-gray-700 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
        </div>

        <!-- Notifications -->
        <div class="overflow-y-auto p-2 space-y-1">
            <div v-for="(res, index) in search" :key="index" class="p-2 cursor-pointer hover:bg-slate-700 transition ease-in-out rounded-lg">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0">
                        <img src="" alt=""
                            class="w-full h-full rounded-full" />
                    </div>
                    <div class="min-w-52">
                        <div class="flex justify-between items-center">
                            <h3 class="text-white font-medium text-sm truncate">{{ res.name }}</h3>
                        </div>
                        <p class="text-gray-400 text-sm truncate">{{ res.username }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    
</style>