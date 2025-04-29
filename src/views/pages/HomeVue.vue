<template>

  <!-- alert success -->
  <AlertComponent />

  <div class="flex text-white">
    <!-- Main Content with Fixed Sidebar Offset -->
    <div class="flex w-full mb-16">
      <!-- Center Content Area -->
      <div class="flex flex-col w-full mt-20 md:mt-0">
        <!-- Fixed Stories Section -->
        <div class="p-4">
          <div class="pt-6 w-full md:w-5/6 mx-auto lg:w-full xl:w-[90%]">
            <h2 class="text-3xl font-semibold mb-4 hidden md:block">Stories</h2>
            <div class="relative">

              <div class="flex gap-4 pb-2 overflow-x-scroll scrollbar-hide stories-container">
                <div v-for="i in 40" :key="`story-${i}`">
                  <div class="w-20 h-20 rounded-full bg-gray-700 cursor-pointer hover:opacity-80 transition-opacity">
                  </div>
                </div>
              </div>

              <!-- Scroll indicators -->
              <div
                class="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-900 bg-opacity-50 p-1 rounded-r-lg cursor-pointer hidden sm:block"
                @click="scrollStories('left')">
                <ChevronLeft :stroke-width="1.5" />
              </div>
              <div
                class="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-900 bg-opacity-50 p-1 rounded-l-lg cursor-pointer hidden sm:block"
                @click="scrollStories('right')">
                <ChevronRight :stroke-width="1.5" />
              </div>
            </div>
          </div>
        </div>

        <div class="flex gap-4 p-4 md:w-5/6 lg:w-full xl:w-[90%] md:mx-auto">
          <div class="w-full lg:w-[60%] xl:w-[70%]">
            <!-- Fixed Create Post Section -->
            <CardCreatePostComponent />

            <!-- Scrollable Posts Section -->
            <div class="overflow-y-auto scrollbar-hide">
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
            <RandomPeoplesComponent />
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>

import PostsComponent from '@/components/PostsComponent.vue';
import CardCreatePostComponent from '@/components/CardCreatePostComponent.vue';
import AlertComponent from '@/components/AlertComponent.vue';
import RandomPeoplesComponent from '@/components/RandomPeoplesComponent.vue';

import {ChevronLeft, ChevronRight } from 'lucide-vue-next';

// Function to scroll the stories container
const scrollStories = (direction) => {
  const container = document.querySelector('.stories-container');
  if (container) {
    const scrollAmount = direction === 'left' ? -300 : 300;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
};

</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>