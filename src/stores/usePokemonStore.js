import { defineStore } from 'pinia';

export const usePokemonStore = defineStore('pokemonStore', {
  state: () => ({
    favorites: [],
  }),
  actions: {
    addFavorite(pokemon) {
      if (!this.favorites.some(poke => poke.id === pokemon.id)) {
        this.favorites.push(pokemon);
      }
    },
    removeFavorite(pokemon) {
      if (this.favorites.some(poke => poke.id === pokemon.id)) {
        this.favorites.splice(pokemon);
      }

    }
  },
});
