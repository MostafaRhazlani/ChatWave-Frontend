<script setup>
    import { useAuthStore } from '@/store/auth';
    import { useRouter } from 'vue-router';

    const store = useAuthStore();
    const router = useRouter();

    const logout = () => {
        store.logout();
        router.push('/login')
    }
</script>

<template>
    <div class="w-64 absolute md:flex flex-col bg-slate-800 shadow-md rounded-lg overflow-hidden">
        <div class="bg-gradient-to-r from-pink-500 to-rose-500 h-2"></div>
        <div class="p-4 border-b">
            <div class="mb-4 flex flex-col">
                <img src="https://i.pravatar.cc/40?img=12" alt="Profile" class="w-10 h-10 rounded-full mb-2" />
                <span class="font-bold text-lg -mb-1">{{ store.user.full_name }}</span>
                <span class="">{{ store.user.username }}</span>
            </div>
            <div class="flex gap-5 text-sm">
                <p><span class="font-bold">200k</span> following</p>
                <p><span class="font-bold">200k</span> followers</p>
            </div>
        </div>
        <div class="p-2">
            <div class="flex gap-2 px-2 py-1 hover:bg-slate-700 rounded cursor-pointer">
                <span><i class="fa-solid fa-user"></i></span>
                <p>Profile</p>
            </div>
            <div class="flex gap-2 px-2 py-1 hover:bg-slate-700 rounded cursor-pointer">
                <span><i class="fa-solid fa-gear"></i></span>
                <p>Settings</p>
            </div>
            <div @click="logout" class="flex gap-2 px-2 py-1 hover:bg-slate-700 rounded cursor-pointer">
                <span><i class="fa-solid fa-right-from-bracket"></i></span>
                <p>Logout</p>
            </div>
        </div>
    </div>
</template>