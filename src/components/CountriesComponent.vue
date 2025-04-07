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
    const response = await fetch('/src/countries.json');

    if(!response.ok) {
        console.log("Network response was not ok");
    }
    const data = await response.json();
    countries.value = data.countries.map(el => el.name).sort((a,b) => a.localeCompare(b));
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