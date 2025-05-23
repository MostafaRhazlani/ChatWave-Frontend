<script setup>
  import CountriesComponent from '@/components/CountriesComponent.vue';
  import SpinnerComponent from '@/components/SpinnerComponent.vue';
  import { useRouter } from 'vue-router';
  import { ChevronDown } from 'lucide-vue-next';
  import axios from '@/plugins/axios';
  import { reactive, ref } from 'vue';
  import { useAlertStore } from '@/store/alert';

  const alertStore = useAlertStore();
  const router = useRouter();
  const form = reactive({
    'full_name': '',
    'username': '',
    'email': '',
    'nationality': '',
    'gender': '',
    'date_birth': '',
    'relationship': 'none',
    'password': '',
    'password_confirmation': '',
  });
  const isLoading = ref(false)
  

  const error = reactive({ errors: {} });

  const handleRegister = async () => { 
    if(isLoading.value) return; 
    isLoading.value = true  
    try {
      const response = await axios.post('register', form);
      
      if(response.status == 201) {
        error.errors = {};
        Object.keys(form).forEach(key => form[key] = "");

        alertStore.triggerAlert('User created successfully', 'success' );
        router.push('/login');
      } else {
        error.errors = { error: 'something wrong'};
      }
    } catch(err) {
      if(err.response && err.response.data) {
        error.errors = err.response.data.errors
      }
    } finally {
      isLoading.value = false
    }
  }
</script>

<template>
  <div class="h-full flex items-center justify-center">
    <div class="w-full md:w-3/5 lg:w-2/5 p-8 flex flex-col items-center">
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
            <div class="relative">
                <CountriesComponent v-model="form.nationality"/>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown :size="20" class="opacity-60"/>
              </div>
            </div>

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
            class="w-full px-4 py-2 flex items-center justify-center text-white hover:bg-slate-800 rounded cursor-pointer duration-300 transition-all delay-100">
            <SpinnerComponent v-if="isLoading" class="w-6 h-6"/>
            <span v-else>Sign up</span>
          </button>
        </div>

        <!-- Login Link -->
        <div class="text-center mt-6 text-gray-400">
          I have account - <RouterLink to="/login" class="text-slate-500 hover:text-slate-700 duration-300"> Log in
          </RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>
