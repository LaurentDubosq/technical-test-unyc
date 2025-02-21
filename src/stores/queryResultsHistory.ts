import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

interface QueryResults {
  url: string
  results: CharacterAPIResponse
}

export const useQueryResultsHistoryStore = defineStore('queryResultsHistory', () => {
  // State
  const state: Ref<QueryResults[]> = ref([])

  // Actions
  const addQueryResults = (queryResults: QueryResults) => {
    state.value.push(queryResults)
  }
  const isQueryExists = (queryUrl: string) => {
    return state.value.some((query) => query.url === queryUrl)
  }
  const getQueryResults = (queryUrl: string) => {
    return state.value.find((query) => query.url === queryUrl)?.results
  }

  return { state, addQueryResults, isQueryExists, getQueryResults }
})
