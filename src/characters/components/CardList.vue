<script setup lang="ts">
import { ref } from 'vue';
import CharacterCard from '@/characters/components/CharacterCard.vue';

import rickAndMortyApi from '@/api/rickAndMortyApi';
import type { Character, Result } from '@/characters/interfaces/character';
import { useCharacters } from '@/characters/composables/useCharacters';
import { useQuery } from '@tanstack/vue-query';

//! 1- Normal suspense

// const { data: characters } = await rickAndMortyApi.get<Character>('/character');

//! 2- Composable functions
// const { isLoading, characters, isError, errorMessage } = useCharacters();


//! 3- TanStack Query
const getCharactersSlow = async():Promise<Character> => {
  
  return new Promise( (resolve) => {
    setTimeout( async() => {
      const { data } = await rickAndMortyApi.get<Character>('/character');
      resolve(data);
    }, 1);
  })
  
};

const { isLoading, isError, data: characters, error} = useQuery(
  ['characters'],
  getCharactersSlow,
  {
    cacheTime: 1000 * 60,
    refetchOnReconnect: 'always'
  }
);

</script>

<template>
  <h2 v-if="isLoading">Loading...</h2>
  <h2 v-if="isError">{{ error }}</h2>
  <div class="card-list">
    <CharacterCard 
      v-for="character of characters?.results" 
      :key="character.id" :character="character" 
    />
  </div>
</template>

<style scoped>
.card-list{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>