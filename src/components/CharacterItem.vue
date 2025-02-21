<script setup lang="ts">
const { character } = defineProps<{ character: Character }>()
</script>

<template>
  <li class="character">
    <RouterLink :to="`/characters/${character.id}`">
      <img class="character__image" :src="character.image" :alt="character.name" loading="lazy" />
      <div class="character__name">
        <strong>{{ character.name }}</strong>
      </div>
    </RouterLink>
  </li>
</template>

<style scoped lang="scss">
.character {
  display: flex;
  flex-direction: column;

  &__image {
    width: 100%;
    @media screen and (min-width: 480px) {
      max-width: 182px;
    }
  }

  &__name {
    text-align: center;
    font-size: 0.6rem;
  }
}
</style>
