<template>
  <div class="flex text-white">
    <!-- Main Content with Fixed Sidebar Offset -->
    <div class="flex w-full mb-16">
      <!-- Center Content Area -->
      <div class="flex flex-col w-full mt-20 md:mt-0">

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
            <OnlineFriendsComponent />

            <!-- People You Might Know -->
            <RandomPeoplesComponent />
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
import OnlineFriendsComponent from '@/components/OnlineFriendsComponent.vue';
import CardCreatePostComponent from '@/components/CardCreatePostComponent.vue';
import RandomPeoplesComponent from '@/components/RandomPeoplesComponent.vue';

</script>

<style>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>