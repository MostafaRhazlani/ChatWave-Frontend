<template>
  <div class="flex text-white">
    <!-- Main Content with Fixed Sidebar Offset -->
    <div class="flex w-full">
      <!-- Center Content Area -->
      <div class="flex flex-col w-full mt-20 md:mt-0">
        <!-- Fixed Stories Section -->
        <div class="md:pt-10 ">
          <div class="md:p-4 w-full md:w-5/6 mx-auto lg:w-full xl:w-[90%]">
            <h2 class="text-3xl font-semibold mb-4 hidden md:block">Videos</h2>
          </div>
        </div>

        <div class="flex gap-4 p-4 md:w-5/6 lg:w-full xl:w-[90%] md:mx-auto">
          <div class="w-full lg:w-[60%] xl:w-[70%]">
            <!-- Fixed Create Post Section -->
            <CardCreatePostComponent />
            
            <!-- Scrollable Posts Section -->
            <div class="overflow-y-auto scrollbar-hide">
                <!-- Multiple Posts -->
                <PostsComponent />
            </div>
          </div>
          <!-- Fixed Right Sidebar -->
          <div class="hidden lg:block md:w-[40%] xl:w-[30%] h-screen sticky top-0">
            <!-- Online Friends -->
            <div class="mb-4 bg-slate-800 p-4 rounded-lg border border-gray-700">
              <h3 class="text-sm font-semibold mb-3">Online Friends</h3>
              <div class="relative">
                <div class="flex gap-2 overflow-x-scroll scrollbar-hide stories-container">
                  <div v-for="i in 20" :key="`friend-${i}`" class="">
                    <div class="w-10 h-10 rounded-full bg-gray-700 relative cursor-pointer">
                      <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- People You Might Know -->
            <div class="bg-slate-800 p-4 rounded-lg w-full border border-gray-700">
              <h3 class="text-sm font-semibold mb-3">People You might know</h3>
              <div class="space-y-3">
                <div v-for="i in 5" :key="`suggestion-${i}`" class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-full bg-gray-700"></div>
                    <div>
                      <p class="text-sm font-medium">Othman Rhazlani</p>
                      <p class="text-xs text-gray-400">@Othman</p>
                    </div>
                  </div>
                  <button
                    class="bg-gray-700 text-white text-xs px-3 py-1 rounded-full hover:bg-gray-600 transition-colors">
                    Follow
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { Heart, MessageCircleMore, Star } from 'lucide-vue-next';
import PostsComponent from '@/components/PostsComponent.vue';
import CreatePostComponent from '@/components/CreatePostComponent.vue';
import CardCreatePostComponent from '@/components/CardCreatePostComponent.vue';

</script>

<style>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>