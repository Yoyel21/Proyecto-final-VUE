<template>
  <div v-if="pokemon && pokemon.sprite"
    class="bg-white p-4 rounded-xl shadow-lg flex flex-col items-center border hover:scale-105 transition-transform cursor-pointer">
    <img :src="pokemon.sprite" :alt="pokemon.name" class="w-24 h-24" />
    <h3 class="text-lg font-bold mt-2 capitalize text-blue-700">{{ pokemon.name }}</h3>
  </div>
</template>

<script setup>
defineProps({
  pokemon: Object
});


</script>
