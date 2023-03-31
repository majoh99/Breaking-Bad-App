<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import characterStore from '@/store/characters.store';

// import { useCharacters } from '@/characters/composables/useCharacters';
import CardList from '@/characters/components/CardList.vue';
import rickAndMortyApi  from '@/api/rickAndMortyApi';
import type { Character, Result } from '@/characters/interfaces/character';


/* const getCharactersSlow = async():Promise<Character> => {
  
  return new Promise( (resolve) => {
    setTimeout( async() => {
      const { data } = await rickAndMortyApi.get<Character>('/character');
      resolve(data);
    }, 1);
  })
  
}; */

// const { isLoading, isError, characters, errorMessage} = useCharacters();


// ---- OLD ---- 
// const { isLoading, isError, error, data: characterResp } = useQuery(
//   ['characters'],
//   () => rickAndMortyApi.get<Character>('/character'),
// );

const props = defineProps<{ title: string, visible: boolean }>();

const getCharactersCacheFirst = async(): Promise<Result[]> => {
  
  if ( characterStore.characters.count > 0 ) {
    return characterStore.characters.list;
  }
  
  const { data } = await rickAndMortyApi.get<Character>('/character');
  return data.results;
};

useQuery(
  ['characters'],
  getCharactersCacheFirst,
  {
    onSuccess( data: Character ){
      characterStore.loadedCharacters(data);
    }
  }
);

characterStore.characters

</script>


<template>
  <div v-if="characterStore.characters.list">
    
    <h2 v-if="characterStore.characters.isLoading">Loading...</h2>
    <h2 v-else-if="characterStore.characters.hasError">{{ characterStore.characters.errorMessage }}</h2>
    <template v-else>
      <h2>{{ props.title }}</h2>
      <CardList :characters="characterStore.characters.list" />
    </template>
    
  </div>
</template>

<style scoped>

</style>