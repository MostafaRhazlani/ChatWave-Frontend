<script setup>
import CreatePostComponent from '@/components/CreatePostComponent.vue';
import { SquarePlay, Image } from 'lucide-vue-next';
import { reactive, ref } from 'vue';

const modelType = ref(null);
const isModelCreateOpen = ref(false);

const toggleModelCreate = (type) => {
  modelType.value = type
  isModelCreateOpen.value = true
}
</script>

<template>
    <div class="mb-4">
        <div class="bg-slate-800 border border-gray-700 rounded-lg p-4">
            <div class="flex items-center gap-3">
                <button @click="toggleModelCreate('image')" :modelType="modelType"
                    class="bg-slate-700 text-white hover:bg-slate-600 rounded-lg px-4 py-2 text-sm w-full transition-colors">
                    What do you have in mind?
                </button>
                <button @click="toggleModelCreate('image')" :modelType="modelType"
                    class="p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                    <Image :stroke-width="1.5" />
                </button>
                <button @click="toggleModelCreate('video')" :modelType="modelType"
                    class="p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                    <SquarePlay :stroke-width="1.5" />
                </button>
            </div>
        </div>
    </div>

    <transition name="fade">
        <CreatePostComponent v-if="isModelCreateOpen" v-model:modelCreate="isModelCreateOpen" v-model:modelType="modelType" />
    </transition>
</template>

<style></style>