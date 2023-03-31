<script setup lang="ts">
import { watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useCharacter from '../composables/useCharacter';

const router = useRouter();
const route = useRoute();

const { id } = route.params as { id: string };
const { character, hasError, errorMessage, isLoading } = useCharacter( id );

watchEffect( () => {
  if ( !isLoading.value && hasError.value){
    router.replace('/characters');
  }
})

</script>

<template>
  <h2 v-if="isLoading">Loading...</h2>
  <h2 v-else-if="hasError">{{ errorMessage }}</h2>
  <div v-else-if="character">
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