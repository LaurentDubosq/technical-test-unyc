<script setup>
const { currentPage, totalPages } = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true },
})
</script>

<template>
  <nav class="pagination">
    <button
      class="pagination__button"
      @click="$emit('display-prev-page')"
      aria-label="previous set of pages"
      :disabled="currentPage === 1"
    >
      &lt;
    </button>
    <div class="pagination__text" :aria-label="`Page ${currentPage} of ${totalPages}`">
      {{ currentPage + ' of ' + totalPages }}
    </div>
    <button
      class="pagination__button"
      @click="$emit('display-next-page')"
      aria-label="next set of pages"
      :disabled="currentPage === totalPages"
    >
      &gt;
    </button>
  </nav>
</template>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  &__button {
    height: 40px;
  }
}
</style>
