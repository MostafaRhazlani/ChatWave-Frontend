<script setup>
  import { useRouter } from 'vue-router';
  import axios from '@/plugins/axios';
  import { reactive } from 'vue';

  const router = useRouter();
  const form = reactive({
    'full_name': '',
    'username': '',
    'email': '',
    'nationality': '',
    'gender': '',
    'date_birth': '',
    'password': '',
    'password_confirmation': '',
  });

  const error = reactive({ errors: {} });

  const handleRegister = async () => {    
    try {
      const response = await axios.post('register', form);
      
      if(response.status == 201) {
        error.errors = {};
        Object.keys(form).forEach(key => form[key] = "");

        router.push('/login');
      } else {
        error.errors = { error: 'something wrong'};
      }
    } catch(err) {
      if(err.response && err.response.data) {
        error.errors = err.response.data.errors
      }
    }
  }
</script>

<template>

  <div class="w-full md:w-3/5 lg:w-2/5  p-8 flex flex-col items-center">
    <!-- Logo -->
    <div class="mb-8 bg-blue-500/20 p-3 rounded-lg">
      <img width="40" height="40" src="/images/logo-chatwave.png" alt="">
    </div>

    <!-- Form -->
    <form @submit.prevent="handleRegister" class="w-full space-y-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <!-- First Row -->
        <div class="col-span-1">
          <input v-model="form.full_name" type="text" placeholder="Full name"
            class="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 text-gray-300 focus:outline-none" />
          <p class="text-red-600">{{ error.errors.full_name ? error.errors.full_name[0] : '' }}</p>
        </div>
        <div class="col-span-1">
          <input v-model="form.username" type="text" placeholder="Username"
            class="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 text-gray-300 focus:outline-none" />
            <p class="text-red-600">{{ error.errors.username ? error.errors.username[0] : '' }}</p>
        </div>

        <!-- Second Row -->
        <div class="col-span-1">
          <input v-model="form.email" type="email" placeholder="Email"
            class="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 text-gray-300 focus:outline-none" />
            <p class="text-red-600">{{ error.errors.email ? error.errors.email[0] : '' }}</p>
        </div>
        <div class="col-span-1">
          <select v-model="form.gender"
            class="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 text-gray-300 focus:outline-none focus:border-blue-500 appearance-none">
            <option value="" disabled selected>Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <p class="text-red-600">{{ error.errors.gender ? error.errors.gender[0] : '' }}</p>
        </div>

        <!-- Third Row -->
        <div class="col-span-1">
          <input v-model="form.nationality" type="text" placeholder="Nationality"
            class="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 text-gray-300 focus:outline-none focus:border-blue-500" />
            <p class="text-red-600">{{ error.errors.nationality ? error.errors.nationality[0] : '' }}</p>
        </div>
        <div class="col-span-1">
          <input v-model="form.date_birth" type="date" placeholder="Date of Birth"
            class="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 text-gray-300 focus:outline-none focus:border-blue-500" />
          <p class="text-red-600">{{ error.errors.date_birth ? error.errors.date_birth[0] : '' }}</p>
        </div>

        <!-- Fourth Row -->
        <div class="col-span-1">
          <input v-model="form.password" type="password" placeholder="Password"
            class="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 text-gray-300 focus:outline-none focus:border-blue-500" />
            <p class="text-red-600">{{ error.errors.password ? error.errors.password[0] : '' }}</p>
        </div>
        <div class="col-span-1">
          <input v-model="form.password_confirmation" type="password" placeholder="Confirm password"
            class="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 text-gray-300 focus:outline-none" />
          <p class="text-red-600">{{ error.errors.password_confirmation ? error.errors.password_confirmation[0] : '' }}</p>
        </div>
      </div>

      <!-- Sign up button -->
      <div>
        <button type="submit"
          class="w-full px-4 py-2 text-white hover:bg-slate-800 rounded cursor-pointer duration-300 transition-all delay-100">
          Sign up
        </button>
      </div>

      <!-- Login Link -->
      <div class="text-center mt-6 text-gray-400">
        I have account - <RouterLink to="/login" class="text-slate-500 hover:text-slate-700 duration-300">Login
        </RouterLink>
      </div>
    </form>
  </div>
</template>
