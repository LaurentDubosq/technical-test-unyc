<script setup lang="ts">
const { currentName } = defineProps<{ currentName?: string }>()

const emit = defineEmits(['submit'])

const handleSubmit = (event: Event) => {
  // Assert the event target is a form
  const form: HTMLFormElement = event.target as HTMLFormElement

  // Get the name field value
  const input: HTMLInputElement = form.querySelector('input') as HTMLInputElement

  // Emit its value
  if (input) {
    emit('submit', input.value)
  }
}
</script>

<template>
  <form class="search-form" @submit.prevent="handleSubmit">
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
