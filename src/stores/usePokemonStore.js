import { defineStore } from 'pinia';

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    favorites: [],
  }),
  actions: {
    addFavorite(pokemon) {
      if (!this.favorites.some(p => p.id === pokemon.id)) {
        this.favorites.push(pokemon);
      }
    },
    removeFavorite(pokemonId) {
      this.favorites = this.favorites.filter(p => p.id !== pokemonId);
    }
  },
});
