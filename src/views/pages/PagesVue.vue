<template>
    <div class="mt-20 flex bg-slate-900 w-full md:w-5/6 mx-auto lg:w-full xl:w-[70%] text-white overflow-hidden">

        <!-- Main Content -->
        <div class="w-full p-6">
            <h1 class="text-3xl font-semibold mb-2">Discover Pages</h1>
            <h2 class="text-lg text-gray-400 mb-6">Suggested for you</h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div v-for="(page, index) in pages" :key="index" class="bg-slate-800 rounded-lg overflow-hidden shadow-lg">
                    <div class="overflow-hidden">
                        <img :src="page.cover" :alt="page.name" class="w-full h-40 object-cover hover:scale-[1.1] duration-300">
                    </div>
                    <div class="p-4">
                        <RouterLink :to="`/page/${index+1}`">
                            <h3 class="text-white font-medium cursoer-pointer">{{ page.name }}</h3>
                        </RouterLink>
                        <p class="text-gray-400 text-sm">{{ page.category }}</p>
                        <p class="text-gray-500 text-xs">{{ page.likes }} Likes this page</p>
                        <button class="w-full mt-3 py-1.5 rounded-md transition-colors bg-slate-700 hover:bg-slate-600 transition-colors">
                            Follow
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

const pages = [
    { name: "News Games", category: "Games", likes: "1.3M", cover: "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="},
    { name: "Tech World", category: "Technology", likes: "500K", cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9SRRmhH4X5N2e4QalcoxVbzYsD44C-sQv-w&s"},
    { name: "Music Vibes", category: "Music", likes: "700K", cover: "https://cdn.pixabay.com/photo/2016/11/19/11/11/hands-1838658_1280.jpg"},
    { name: "Fitness Hub", category: "Health & Fitness", likes: "350K", cover: "https://www.befunky.com/images/prismic/4bde886a-0b5d-46b9-8c43-10338e3d1e41_features-sky-replacer.png?auto=avif,webp&format=jpg&width=581"},
    { name: "Artistic Minds", category: "Art", likes: "250K", cover: "https://tinypng.com/static/images/boat.png"},
    { name: "Foodie's Delight", category: "Food", likes: "900K", cover: "https://slp-statics.astockcdn.net/static_assets/staging/23spring/storytelling-blade/illustration_plans_slp.jpg?width=580"}
];
</script>

<style>

</style>