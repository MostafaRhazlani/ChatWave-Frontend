<template>
    <div class="flex h-screen bg-gray-900 text-white">

        <!-- Main Content -->
        <div class="w-full p-6 mt-20 mb-16 md:my-0">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-semibold">All Users</h2>
            </div>

            <!-- Filters and Search -->
            <div class="bg-slate-800 p-4 rounded-lg mb-6">
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex-1">
                        <div class="relative">
                            <SearchIcon
                                class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input type="text" placeholder="Search users..."
                                class="w-full bg-slate-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-pink-500"/>
                        </div>
                    </div>

                    <div class="flex gap-3">
                        <select
                            class="bg-slate-700 rounded-lg px-3 py-2 w-44 cursor-pointer text-white focus:outline-none focus:ring-2 focus:ring-cyan-500">
                            <option value="">All Status</option>
                            <option value="Published">Banned</option>
                            <option value="Draft">Not Banned</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Posts Table -->
            <div class="bg-slate-800 rounded-lg overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr class="bg-slate-700">
                                <th class="py-3 px-4 text-left">User</th>
                                <th class="py-3 px-4 text-left">Username</th>
                                <th class="py-3 px-4 text-left">Email</th>
                                <th class="py-3 px-4 text-left">Date Birth</th>
                                <th class="py-3 px-4 text-left">Country</th>
                                <th class="py-3 px-4 text-left">Is Banned</th>
                                <th class="py-3 px-4 text-left">Status</th>
                                <th class="py-3 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                class="border-b border-gray-700 hover:bg-gray-750">
                                <td class="py-3 px-4 flex items-center gap-2">
                                    <div class="w-9 h-9 rounded-full bg-gray-600"></div>
                                    Mostafa Rhazlani
                                </td>
                                <td class="py-3 px-4">mostafa_rhazlani</td>
                                <td class="py-3 px-4">mo@gmail.com</td>
                                <td class="py-3 px-4 min-w-36">Feb 03, 2003</td>
                                <td class="py-3 px-4 min-w-36">Morocco</td>
                                <td class="py-3 px-4 min-w-32">
                                    <span class="px-2 py-1 rounded-full text-xs bg-purple-500/20 text-purple-500">
                                        Not Banned
                                    </span>
                                </td>
                                <td class="py-3 px-4">
                                    <span class="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">
                                        Published
                                    </span>
                                </td>
                                <td class="py-3 px-4">
                                    <div class="flex gap-2">
                                        <button class="p-1 rounded hover:bg-gray-700" title="View">
                                            <EyeIcon class="w-5 h-5 text-gray-400 hover:text-white" />
                                        </button>
                                        <button class="p-1 rounded hover:bg-gray-700" title="Delete">
                                            <Trash2Icon class="w-5 h-5 text-gray-400 hover:text-red-500" />
                                        </button>
                                    </div>
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
    import { FileTextIcon, SearchIcon, EyeIcon, Trash2Icon } from 'lucide-vue-next';
</script>


<style>
</style>