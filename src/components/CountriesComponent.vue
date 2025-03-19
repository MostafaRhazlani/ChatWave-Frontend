<script setup>

import axios from 'axios';
import { onMounted, reactive } from 'vue';

const countries = reactive([]);
const fetchCountries = async () => {
    const response = await axios.get('https://restcountries.com/v3.1/all');

    const countriesData = response.data;

    countriesData.forEach(el => {
        let name = el.name.common;

        countries.push(name);
    });
    return countries.sort((a,b) => a.localeCompare(b))
}

onMounted(() => {
    fetchCountries();
})
</script>

<template>
    <option v-for="(country, index) in countries" :key="index" :value="country">
        {{ country }}
    </option>
</template>

<style>
    
</style>