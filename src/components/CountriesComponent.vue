<script setup>

import axios from 'axios';
import { onMounted, reactive, defineEmits, defineProps, watch, ref } from 'vue';

const countries = ref([]);


const props = defineProps({
    modelValue: String
})
const emit = defineEmits();
const selectedCountry = ref(props.modelValue);

watch(selectedCountry, (newValue) => {
    emit("update:modelValue", newValue);
});

const fetchCountries = async () => {
    const response = await axios.get('https://restcountries.com/v3.1/all');

    countries.value = response.data.map(el => el.name.common).sort((a,b) => a.localeCompare(b));
}

onMounted(() => {
    fetchCountries();
})
</script>

<template>
    <select v-model="selectedCountry" id="" class="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 text-gray-300 focus:outline-none focus:border-blue-500 appearance-none">
        <option value="" disabled>Select Country</option>
        <option v-for="(country, index) in countries" :key="index" :value="country">
            {{ country }}
        </option>
    </select>
</template>

<style>
    
</style>