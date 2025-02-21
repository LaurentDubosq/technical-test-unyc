<script setup lang="ts">
import CharacterDetails from '@/components/CharacterDetails.vue'
import { useFetch } from '@/composables/useFetch'
import { onMounted, ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'
const characterApiBaseUrl: string = import.meta.env.VITE_CHARACTER_API_BASE_URL

/* Get the character ID */
const route = useRoute()
const characterID: string = route.params.id as string

/* Get the character's data */
const queryResults: Ref<Character | CharacterAPIResponseError | undefined> = ref()
onMounted(async () => {
  queryResults.value = await useFetch(characterApiBaseUrl + '/' + characterID)
})
</script>

<template>
  <div class="character">
    <p v-if="!queryResults">No data available.</p>
    <p v-else-if="'error' in queryResults">No characters found.</p>
    <CharacterDetails v-else-if="'id' in queryResults" :character="queryResults" />
  </div>
</template>

<style scoped lang="scss">
.character {
  padding: 15px;
}
</style>
