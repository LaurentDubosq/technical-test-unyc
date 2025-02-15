import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useQueryResultsHistoryStore = defineStore('queryResultsHistory', () => {
  // State
  const state = ref([])

  // Actions
  const addQueryResults = (queryResults) => {
    state.value.push(queryResults)
  }

  return { state, addQueryResults }
})
