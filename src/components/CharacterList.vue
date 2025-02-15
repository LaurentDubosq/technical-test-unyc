<script setup>
import CharacterItem from './CharacterItem.vue'
const { characters } = defineProps({ characters: { type: Array, required: true } })
</script>

<template>
  <ul class="character-list">
    <CharacterItem v-for="character in characters" :key="character.id" :character />
  </ul>
</template>

<style scoped lang="scss">
.character-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media screen and (min-width: 480px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
}
</style>
