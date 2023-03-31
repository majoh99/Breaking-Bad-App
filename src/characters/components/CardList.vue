<script setup lang="ts">
import { toRef } from 'vue';

import CharacterCard from '@/characters/components/CharacterCard.vue';
import type { Result } from '@/characters/interfaces/character';

//! 1- Normal suspense

// const { data: characters } = await rickAndMortyApi.get<Character>('/character');

//! 2- Composable functions
// const { isLoading, characters, isError, errorMessage } = useCharacters();

//! 3- TanStack Query
// const getCharactersSlow = async():Promise<Character> => {
  
//   return new Promise( (resolve) => {
//     setTimeout( async() => {
//       const { data } = await rickAndMortyApi.get<Character>('/character');
//       resolve(data);
//     }, 1);
//   })
  
// };

// const { isLoading, isError, data: characters, error} = useQuery(
//   ['characters'],
//   getCharactersSlow,
// );

interface Props {
  characters: Result[],
}

const props = defineProps<Props>();

const characters = toRef(props, 'characters');

</script>

<template>
  <div class="card-list">
    <CharacterCard 
      v-for="character of characters" 
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