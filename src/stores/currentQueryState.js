import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useCurrentQueryStateStore = defineStore('currentQueryState', () => {
  // States
  const url = ref()
  const currentName = ref()
  const currentStatus = ref()
  const currentGender = ref()
  const currentPage = ref()

  // Update the query state whenever the query URL changes
  watch(
    () => url.value,
    () => {
      // Get the params from the URL
      const params = new URLSearchParams(new URL(url.value).search)

      // Update the query state
      currentName.value = params.get('name')
      currentStatus.value = params.get('status')
      currentGender.value = params.get('gender')
      currentPage.value = params.get('page')
    },
  )

  // Actions
  const updateURL = (newUrl) => {
    url.value = newUrl
  }

  return {
    url,
    currentName,
    currentStatus,
    currentGender,
    currentPage,
    updateURL,
  }
})
