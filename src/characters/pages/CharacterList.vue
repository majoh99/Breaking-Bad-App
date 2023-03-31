<script setup lang="ts">

import useCharacters from '@/characters/composables/useCharacters';
import CardList from '@/characters/components/CardList.vue';


const props = defineProps<{ title: string, visible: boolean }>();

const { 
  isLoading, 
  hasError, 
  errorMessage,
  characters,
  count, 
} = useCharacters();

</script>


<template>
  <div v-if="characters">
    
    <h2 v-if="isLoading">Loading...</h2>
    <h2 v-else-if="hasError">{{ errorMessage }}</h2>
    <template v-else>
      <h2>{{ title }} - ({{ count }})</h2>
      <CardList :characters="characters" />
    </template>
    
  </div>
</template>

<style scoped>

</style>