<script setup lang="ts">
import { useRouter } from 'vue-router'

const { character } = defineProps<{ character: Character }>()

/**************/
/* Navigation */
/**************/

const router = useRouter()

const goBackOrDefault = () => {
  // Go back in history if the previous page is part of our app (e.g., "/characters").
  // If not, redirect to the "/characters" page (the homepage of our app).
  console.log(window.history.state)
  if (window.history.state?.back?.includes('/characters')) {
    router.back()
  } else {
    router.push('/characters') // Redirect to the "/characters" page (home page).
  }
}
</script>

<template>
  <div class="character">
    <img class="character__image" :src="character.image" :alt="character.name" />
    <ul>
      <li class="character__name">
        <strong>Name : {{ character.name }}</strong>
      </li>
      <li class="character__status">
        <strong>Status : {{ character.status }}</strong>
      </li>
      <li class="character__species">
        <strong>Species : {{ character.species }}</strong>
      </li>
      <li class="character__gender">
        <strong>Gender : {{ character.gender }}</strong>
      </li>
      <li class="character__origin">
        <strong>Origin : {{ character.origin.name }}</strong>
      </li>
      <li class="character__location">
        <strong>Location : {{ character.location.name }}</strong>
      </li>
    </ul>
    <button class="character__button btn--primary" @click="goBackOrDefault">Back</button>
  </div>
</template>

<style scoped lang="scss">
.character {
  display: flex;
  flex-direction: column;
  gap: 15px;

  &__image {
    width: 100%;
  }

  &__button {
    width: 100%;
  }
}
</style>
