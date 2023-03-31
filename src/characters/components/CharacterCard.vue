<script setup lang="ts">
import { toRef } from 'vue';
import { useRouter } from 'vue-router';
import type { Result } from '@/characters/interfaces/character';

const props = defineProps<{
  character: Result;
}>();

const character = toRef(props, 'character');

const router = useRouter();

const goTo = () => {
  router.push(`by/${character.value.id}`);
};

</script>

<template>
  <div class="character-card" @click="goTo()">
    <img :src="character.image" :alt="character.name">
    <h3>{{ character.name }}</h3>
  </div>
</template>

<style scoped>
.character-card{
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin: 0 5px 10px 5px;
}

img{
  border-radius: 5px 5px 0 0;
  box-shadow: 0px 2px 10px rgba(255, 255, 255, 0.1);
  width: 150px;
  transition: all .5s;
}

img:hover{
  box-shadow: 0px 2px 10px rgba(255, 255, 255, 0.5);
  transition: all .5s;
}
</style>