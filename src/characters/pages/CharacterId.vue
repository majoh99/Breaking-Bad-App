<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useQuery } from '@tanstack/vue-query';

import rickAndMortyApi from '@/api/rickAndMortyApi';
import characterStore from '@/store/characters.store';
import type { Result } from '@/characters/interfaces/character';


const route = useRoute();

const { id } = route.params as { id: string };

const getCharacterFirst = async( characterId: string ):Promise<Result> => {
  if ( characterStore.checkIdInStore(characterId) ){
    return characterStore.ids.list[characterId];
  }
  const { data } = await rickAndMortyApi.get<Result>(`/character/${characterId}`);
  return data;
}

const { data: character } = useQuery(
  ['character', id],
  () => getCharacterFirst(id),
  {
    onSuccess( character ){
      console.log('onSuccess');
      characterStore.loadedCharacter(character as Result);
    }
  }
)

</script>

<template>
  <h2 v-if="!character">Loading...</h2>
  <div v-else>
    <h1>{{ character.name }}</h1>
    <div class="character-container">
      <img :src="character.image" :alt="character.name">
      <ul>
        <li>Género: {{ character.gender }}</li>
        <li>Especie: {{ character.species }}</li>
        <li>Origen: {{ character.origin.name }}</li>
        <li>Ubicación: {{ character.location.name }}</li>
        <li>Episodios: {{ character.episode.length }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.character-container {
  display: flex;
  flex-direction: row;
}

img {
  width: 150px;
  border-radius: 5px;
}
</style>