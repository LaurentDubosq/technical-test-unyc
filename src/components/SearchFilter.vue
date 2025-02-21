<script setup lang="ts">
const { currentSelectedValue, options, name } = defineProps<{
  currentSelectedValue?: string
  options: CharacterStatus[] | CharacterGender[]
  name: string
}>()

const emit = defineEmits(['update-selected-value'])

const handleChange = (event: Event) => {
  // Assert the event target is a select
  const select: HTMLSelectElement = event.target as HTMLSelectElement

  // Emit its value
  if (select) {
    emit('update-selected-value', select.value)
  }
}
</script>

<template>
  <div class="search-filter">
    <label :for="`${name}-select`">Filter by {{ name }}:</label>
    <select
      class="search-filter__select"
      :value="currentSelectedValue"
      @change="handleChange"
      :name="name"
      :id="`${name}-select`"
    >
      <option value="" selected>--Please choose an option--</option>
      <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
    </select>
  </div>
</template>

<style scoped lang="scss">
.search-filter {
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 480px) {
    flex-direction: row;
    align-items: center;
    gap: 5px;
  }

  &__select {
    height: 40px;
  }
}
</style>
