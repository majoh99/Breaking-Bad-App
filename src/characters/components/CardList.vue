<script setup lang="ts">
import { ref } from 'vue';
import rickAndMortyApi from '@/api/rickAndMortyApi';
import type { Character, Result } from '../interfaces/character';

const characters = ref<Character[]>([]);

rickAndMortyApi.get<Character[]>('/character')
  .then( resp => {
    characters.value = resp.data;
    console.log(characters.value);
  })

</script>

<template>
  <ul>
    <li>Hola</li>
  </ul>
</template>

<style scoped>

</style>