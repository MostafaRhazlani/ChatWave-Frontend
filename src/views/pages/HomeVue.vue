<template>
  <div class="flex text-white">
    <!-- Main Content with Fixed Sidebar Offset -->
    <div class="flex w-full">
      <!-- Center Content Area -->
      <div class="flex flex-col w-full mt-20 md:mt-0">
        <!-- Fixed Stories Section -->
        <div class="p-4">
          <div class="pt-6 w-full md:w-5/6 mx-auto lg:w-full xl:w-[90%]">
            <h2 class="text-3xl font-semibold mb-4">Stories</h2>
            <div class="relative">

              <div class="flex gap-4 pb-2 overflow-x-scroll scrollbar-hide stories-container">
                <div v-for="i in 40" :key="`story-${i}`">
                  <div class="w-20 h-20 rounded-full bg-gray-700 cursor-pointer hover:opacity-80 transition-opacity">
                  </div>
                </div>
              </div>
              
              <!-- Scroll indicators -->
              <div class="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-900 bg-opacity-50 p-1 rounded-r-lg cursor-pointer hidden sm:block"
                @click="scrollStories('left')">
                <ChevronLeft :stroke-width="1.5"/>
              </div>
              <div
                class="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-900 bg-opacity-50 p-1 rounded-l-lg cursor-pointer hidden sm:block"
                @click="scrollStories('right')">
                <ChevronRight :stroke-width="1.5"/>
              </div>
            </div>
          </div>
        </div>

        <div class="flex gap-4 p-4 md:w-5/6 lg:w-full xl:w-[90%] md:mx-auto">
          <div class="w-full lg:w-[60%] xl:w-[70%]">
            <!-- Fixed Create Post Section -->
            <div class="mb-4">
              <div class="bg-slate-800 border border-gray-700 rounded-lg p-4">
                <div class="flex items-center gap-3">
                  <input type="text" placeholder="What do you have in mind?"
                    class="bg-gray-700 text-white rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-cyan-400" />
                  <button class="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                    <Image :stroke-width="1.5"/>
                  </button>
                  <button class="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                    <SquarePlay :stroke-width="1.5"/>
                  </button>
                </div>
              </div>
            </div>

            <!-- Scrollable Posts Section -->
            <div class="overflow-y-auto scrollbar-hide">
              <div class="space-y-6">
                <!-- Multiple Posts -->
                <div v-for="post in 5" :key="`post-${post}`" class="bg-slate-800 rounded-lg overflow-hidden border border-gray-700">
                  <!-- Post Header -->
                  <div class="p-4 flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_2025-03-16_182245839-i1J7mYAoXkpTavJKv8DDojaSWO3XQh.png"
                        alt="Profile" class="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p class="font-medium">Mostafa Rhazlani</p>
                      <p class="text-xs text-gray-400">2 hours ago</p>
                    </div>
                  </div>

                  <!-- Post Content -->
                  <div class="p-4 pt-0">
                    <div class="bg-slate-700 rounded-lg h-[350px] w-full"></div>
                    <div class="mt-6">
                      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique mollitia quam, optio incidunt tenetur voluptate sit dolor nemo, doloribus animi quas nostrum ex nihil assumenda earum molestiae harum, eum exercitationem.</p>
                    </div>
                    <div class="mt-6 space-x-2 text-blue-500">
                      <span class="hover:text-blue-400">#sport</span>
                      <span class="hover:text-blue-400">#football</span>
                      <span class="hover:text-blue-400">#ronaldo</span>
                      <span class="hover:text-blue-400">#messi</span>
                    </div>
                  </div>

                  <!-- Post Actions -->
                  <div class="px-4 py-2 border-t border-slate-700 flex items-center justify-between">
                    <div class="flex items-center gap-6">
                      <div class="flex items-center gap-1">
                        <button class="p-2 bg-slate-700 hover:bg-slate-500 cursor-pointer duration-150 flex items-center justify-center rounded-full">
                          <Heart :size="18"/>
                        </button>
                        <span class="text-sm">1,335</span>
                      </div>
                      <div class="flex items-center gap-1">
                        <button class="p-2 bg-slate-700 hover:bg-slate-500 cursor-pointer duration-150 flex items-center justify-center rounded-full">
                          <MessageCircleMore :size="18"/>
                        </button>
                        <span class="text-sm">237</span>
                      </div>
                    </div>
                    <div class="flex items-center gap-1">
                      <button class="p-2 bg-slate-700 hover:bg-slate-500 cursor-pointer duration-150 flex items-center justify-center rounded-full">
                        <Star :size="18"/>
                      </button>
                      <span class="text-sm ml-1">237</span>
                    </div>
                  </div>

                  <!-- Comments -->
                  <div class="px-4 py-3 border-t border-gray-700">
                    <div class="p-2 space-y-3 rounded-md">
                      <div class="flex items-start gap-2">
                        <div class="w-8 h-8 rounded-full bg-slate-700 flex-shrink-0 overflow-hidden">
                          <img
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_2025-03-16_182245839-i1J7mYAoXkpTavJKv8DDojaSWO3XQh.png"
                            alt="Profile" class="w-full h-full object-cover" />
                        </div>
                        <div class="flex flex-col">
                          <p class="font-medium">Mostafa Rhazlani</p>
                          <span class="text-xs text-gray-400">Hello guys how are you</span>
                        </div>
                      </div>
                      <div class="flex items-start gap-2">
                        <div class="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0 overflow-hidden">
                          <img
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_2025-03-16_182245839-i1J7mYAoXkpTavJKv8DDojaSWO3XQh.png"
                            alt="Profile" class="w-full h-full object-cover" />
                        </div>
                        <div class="flex flex-col">
                          <p class="font-medium">Mostafa Rhazlani</p>
                          <span class="text-xs text-gray-400">Hello guys how are you</span>
                        </div>
                      </div>
                      <div class="flex items-start gap-2">
                        <div class="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0 overflow-hidden">
                          <img
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_2025-03-16_182245839-i1J7mYAoXkpTavJKv8DDojaSWO3XQh.png"
                            alt="Profile" class="w-full h-full object-cover" />
                        </div>
                        <div class="flex flex-col">
                          <p class="font-medium">Mostafa Rhazlani</p>
                          <span class="text-xs text-gray-400">Hello guys how are you</span>
                        </div>
                      </div>

                      <div>
                        <span class="text-gray-300 cursor-pointer hover:text-gray-200">show more...</span>
                      </div>
                    </div>

                    <!-- Add Comment -->
                    <div class="flex items-center gap-2 pt-4 border-t border-gray-700">
                      <div class="w-8 h-8 rounded-full bg-slate-700 overflow-hidden">
                        <img
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_2025-03-16_182245839-i1J7mYAoXkpTavJKv8DDojaSWO3XQh.png"
                          alt="Profile" class="w-full h-full object-cover" />
                      </div>
                      <div class="w-full relative">
                        <input type="text" placeholder="Add comment..."
                          class="bg-slate-700 text-white rounded-full px-4 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-cyan-400 pr-16" />
                        <button
                          class="absolute right-2 top-1/2 -translate-y-1/2 bg-cyan-500 text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-cyan-600 transition-colors">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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

import { Heart, MessageCircleMore, Star, ChevronLeft, ChevronRight, SquarePlay, Image } from 'lucide-vue-next';

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

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>