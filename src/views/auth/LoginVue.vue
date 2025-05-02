<script setup>
import AlertComponent from '@/components/AlertComponent.vue';
import SpinnerComponent from '@/components/SpinnerComponent.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import { reactive, ref } from 'vue';
import axios from '@/plugins/axios';
import { X as Close } from 'lucide-vue-next';

const router = useRouter();
const authStore = useAuthStore();
const error = reactive({ errors: {} });
const form = reactive({
  email: '',
  password: ''
})
const isLoading = ref(false)

const handleLogin = async () => {
  if(isLoading.value) return;
  isLoading.value = true
  try {
    const response = await axios.post('login', form);

    if (response.status === 200) {
      error.errors = {};
      const role = response.data.user.role;
      const token = response.data.token;
      const user = response.data.user;

      authStore.setRole(role);
      authStore.setToken(token);
      authStore.setUser(user);

      if (role == 'admin') {
        router.push('/dashboard')
      } else {
        router.push('/')
      }

      Object.keys(form).forEach(key => form[key] = "");
    } else {
      error.errors = { error: 'something wrong' };
    }
  } catch (err) {
    if (err.response && err.response.data) {
      error.errors = err.response.data.message
      console.log(error.errors);

    }

  } finally {
    isLoading.value = false
  }
}

const hideError = () => {
  error.errors.userBan = '';
}

</script>

<template>

  <!-- alert success -->
  <AlertComponent />
  <div class="h-full flex items-center justify-center">
    <div class="w-full sm:w-4/6 lg:w-2/6 p-8 flex flex-col items-center">
      <!-- Logo -->
      <div class="mb-8 bg-blue-500/20 p-3 rounded-lg">
        <img width="40" height="40" src="/images/logo-chatwave.png" alt="">
      </div>

      <div v-if="error.errors.userBan"
        class="flex justify-between items-center gap-4 p-4 w-full bg-red-500/20 text-red-500 rounded mb-4">
        <span>{{ error.errors.userBan }}</span>
        <span @click="hideError" class="cursor-pointer">
          <Close />
        </span>
      </div>
      <!-- Form -->
      <form @submit.prevent="handleLogin" class="w-full space-y-4">
        <div class="space-y-4">
          <!-- Email input -->
          <div>
            <input v-model="form.email" type="email" placeholder="Email"
              class="w-full px-4 py-2 rounded bg-navy-800 border border-navy-700 text-gray-300 focus:outline-none" />
            <p class="text-red-600">{{ error.errors.incorrectInput ? error.errors.incorrectInput : '' }}</p>
          </div>

          <!-- Password input -->
          <div>
            <input v-model="form.password" type="password" placeholder="Password"
              class="w-full px-4 py-2 rounded bg-navy-800 border border-navy-700 text-gray-300 focus:outline-none" />
            <p class="text-red-600">{{ error.errors.incorrectInput ? error.errors.incorrectInput : '' }}</p>
          </div>

          <!-- Sign in button -->
          <div>
            <button type="submit"
              class="w-full px-4 py-2 flex items-center justify-center text-white hover:bg-slate-800 rounded cursor-pointer duration-300 transition-all delay-100">
              <SpinnerComponent v-if="isLoading" class="w-6 h-6"/>
              <span v-else>Sign in</span>
            </button>
          </div>
        </div>

        <!-- Register Link -->
        <div class="text-center mt-6 text-gray-400">
          Don't have account? - <RouterLink to="/register" class="text-slate-500 hover:text-slate-700 duration-300">
            Register</RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>