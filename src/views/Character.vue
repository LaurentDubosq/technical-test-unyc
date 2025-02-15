<script setup>
import CharacterDetails from '@/components/CharacterDetails.vue'
import { useFetch } from '@/composables/useFetch'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const characterApiUrl = 'https://rickandmortyapi.com/api/character'

// Get the character ID
const route = useRoute()
const characterID = route.params.id

// Get the character's data
const character = ref()
onMounted(async () => {
  character.value = await useFetch(characterApiUrl + '/' + characterID)
})
</script>

<template>
  <div class="character">
    <p v-if="!character">No data available.</p>
    <p v-else-if="character.error">No characters found.</p>
    <CharacterDetails v-else-if="character.id" :character />
  </div>
</template>

<style scoped lang="scss">
.character {
  padding: 15px;
}
</style>
