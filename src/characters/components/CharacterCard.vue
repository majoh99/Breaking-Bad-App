<script setup lang="ts">
import { toRef } from 'vue';
import type { Result } from '@/characters/interfaces/character';

const props = defineProps<{
  character: Result;
}>();

const character = toRef(props, 'character');

</script>

<template>
  <div class="character-card">
    <img :src="character.image" :alt="character.name">
    <h3>{{ character.name }}</h3>
  </div>
</template>

<style scoped>
.character-card{
    align-items: center;
    display: flex;
    flex-direction: column;
    margin: 0 5px 10px 5px;
}

img{
    border-radius: 5px 5px 0 0;
    box-shadow: 0px 2px 10px rgba(255, 255, 255, 0.1);
    width: 150px;
}
</style>