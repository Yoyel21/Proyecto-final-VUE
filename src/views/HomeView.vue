<template>
  <div class="p-6">
    <h1 class="text-xl font-bold text-right text-blue-700 mb-6">
      Bienvenido, {{ username }}
    </h1>
    <h1 class="text-3xl font-bold text-center text-red-700 mb-6">Lista de Pokémon</h1>

    <!-- Input de búsqueda -->
    <input type="text" v-model="searchQuery" placeholder="Buscar Pokémon..."
      class="w-full p-2 border rounded-lg mb-4" />

    <p v-if="filteredPokemon.length === 0" class="text-center text-red-600">
      No hay coincidencias
    </p>

    <!-- Grid con Pokémon -->
    <div v-if="!loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      <PokemonItem v-for="poke in filteredPokemon" :key="poke.id" :pokemon="poke" @click="selectPokemon(poke)" />
    </div>

    <!--Grid favoritos-->
    <h1 class="mt-24 mb-2 text-2xl font-bold text-red-700">Tus pokemon favoritos:</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      <p v-if="favorites.favorites.length === 0" class="text-center text-red-600">
        No tienes Pokémon favoritos. ¿Cuál es tu favorito?
      </p>
      <PokemonItem v-for="poke in favorites.favorites" :key="poke.id" :pokemon="poke" @click="selectPokemon(poke)" />
    </div>

    <!-- Modal de detalles -->
    <div v-if="selectedPokemon" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg w-96">
        <h2 class="text-2xl font-bold text-center text-blue-700 capitalize">{{ selectedPokemon.name }}</h2>
        <img :src="selectedPokemon.sprite" class="mx-auto my-4" />
        <p><strong>Experiencia Base:</strong> {{ selectedPokemon.experience }}</p>
        <p><strong>Altura:</strong> {{ selectedPokemon.height }}</p>
        <p><strong>Peso:</strong> {{ selectedPokemon.weight }}</p>
        <p><strong>Movimientos:</strong> {{ selectedPokemon.moves.slice(0, 4).map(m => m.move.name).join(", ") }}</p>
        <div v-if="!favorites.favorites.includes(selectedPokemon)">
          <button @click="addFavorito(selectedPokemon)">💗</button>
        </div>
        <button @click="selectedPokemon = null" class="mt-4 w-full bg-red-500 text-white p-2 rounded-lg">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import PokemonItem from '../components/PokemonItem.vue';
import { usePokemonStore } from '../stores/usePokemonStore.js';

const favorites = usePokemonStore();

const pokemonList = ref([]);
const searchQuery = ref("");
const loading = ref(true);
const username = ref(localStorage.getItem('username') || 'Usuario');
const selectedPokemon = ref(null);

const selectPokemon = (pokemon) => {
  selectedPokemon.value = pokemon;
};

onMounted(async () => {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
    const data = await res.json();

    const responses = await Promise.all(data.results.map(poke => fetch(poke.url)));
    const pokemonDetails = await Promise.all(responses.map(res => res.json()));

    pokemonList.value = pokemonDetails.map(poke => ({
      id: poke.id,
      name: poke.name,
      sprite: poke.sprites.front_default,
      experience: poke.base_experience,
      height: poke.height,
      weight: poke.weight,
      moves: poke.moves
    }));
  } catch (error) {
    console.error("Error al obtener los datos", error);
  } finally {
    loading.value = false;
  }
});

// Filtrado con computed()
const filteredPokemon = computed(() => {
  return pokemonList.value.filter(poke =>
    poke.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

//Funciones de favoritos
const addFavorito = (pokemon) => {
  favorites.addFavorite(pokemon);
}

</script>