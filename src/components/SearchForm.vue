<script setup>
const { currentName } = defineProps({ currentName: { type: String } })

const emit = defineEmits(['submit']) // use defineEmits to avoid @submit to be used twice with an unwanted value on the second triggering
</script>

<template>
  <form
    class="search-form"
    @submit.prevent="(event) => emit('submit', event.target.querySelector('input').value)"
  >
    <label for="search-input" class="sr-only">Character's name</label>
    <input
      id="search-input"
      class="search-form__input"
      type="text"
      placeholder="character's name"
      :value="currentName"
    />
    <button type="submit" class="btn--primary">search</button>
  </form>
</template>

<style scoped lang="scss">
.search-form {
  display: flex;
  flex-direction: column;
  gap: 5px;

  @media screen and (min-width: 480px) {
    flex-direction: row;
    justify-content: center;
  }

  &__input {
    height: 40px;
    padding: 0 10px;
  }
}
</style>
