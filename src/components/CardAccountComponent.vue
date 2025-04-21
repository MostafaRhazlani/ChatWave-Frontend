<script setup>
    import { User, Settings, LogOut } from 'lucide-vue-next';
    import { useAuthStore } from '@/store/auth';
    import { useRouter } from 'vue-router';

    const authStore = useAuthStore();
    const router = useRouter();

    const logout = () => {
        authStore.logout();
        router.push('/login')
    }
</script>

<template>
    <div class="w-64 md:flex absolute flex-col bg-slate-800 shadow-md rounded-lg overflow-hidden border border-gray-700">
        <div class="bg-gradient-to-r from-pink-500 to-rose-500 h-2"></div>
        <div class="p-4 border-b">
            <div class="mb-4 flex flex-col">
                <img :src="`http://127.0.0.1:8000/storage/images/${authStore.user.image}`" alt="Profile" class="w-10 h-10 object-cover rounded-full mb-2" />
                <span class="font-bold text-lg -mb-1">{{ authStore.user.full_name }}</span>
                <span class="">{{ authStore.user.username }}</span>
            </div>
            <div class="flex gap-5 text-sm">
                <p><span class="font-bold">200k</span> following</p>
                <p><span class="font-bold">200k</span> followers</p>
            </div>
        </div>
        <div class="p-2">
            <div class="flex gap-2 px-2 py-2 hover:bg-slate-700 rounded cursor-pointer">
                <User :size="22"/>
                <RouterLink :to="`/profile/${authStore.user.id}`" >Profile</RouterLink>
            </div>
            <div class="flex gap-2 px-2 py-2 hover:bg-slate-700 rounded cursor-pointer">
                <Settings :size="22"/>
                <RouterLink to="/account/settings" >Account Settings</RouterLink>
            </div>
            <div @click="logout" class="flex gap-2 px-2 py-2 hover:bg-slate-700 rounded cursor-pointer">
                <LogOut :size="22"/>
                <p>Logout</p>
            </div>
        </div>
    </div>
</template>