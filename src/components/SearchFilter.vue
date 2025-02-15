<script setup>
const { currentSelectedValue, options, name } = defineProps({
  currentSelectedValue: { type: String },
  options: { type: Array, required: true },
  name: { type: String, required: true },
})
</script>

<template>
  <div class="search-filter">
    <label :for="`${name}-select`">Filter by {{ name }}:</label>
    <select
      class="search-filter__select"
      :value="currentSelectedValue"
      @change="(event) => $emit('update-selected-value', event.target.value)"
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
