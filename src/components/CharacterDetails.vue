<script setup>
const { character } = defineProps({ character: { type: Object, required: true } })
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
    <RouterLink to="/characters">
      <button class="character__button btn--primary">Back</button>
    </RouterLink>
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
