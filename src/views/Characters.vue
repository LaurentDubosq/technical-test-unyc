<script setup>
import CharacterList from '@/components/CharacterList.vue'
import Pagination from '@/components/Pagination.vue'
import SearchFilter from '@/components/SearchFilter.vue'
import SearchForm from '@/components/SearchForm.vue'
import { useFetch } from '@/composables/useFetch'
import { computed, onMounted, ref } from 'vue'
import { useQueryResultsHistoryStore } from '@/stores/queryResultsHistory'
import { useCurrentQueryStateStore } from '@/stores/currentQueryState'

const characterApiUrl = 'https://rickandmortyapi.com/api/character'
const queryResults = ref()
const queryResultsHistoryStore = useQueryResultsHistoryStore()
const currentQueryStateStore = useCurrentQueryStateStore()

const totalPages = computed(() => queryResults.value?.info?.pages)

/******************/
/* Initial Render */
/******************/

onMounted(async () => {
  /////////////////////////////////////////////////////////
  /* Display last query results or fetch initial results */
  /////////////////////////////////////////////////////////

  if (currentQueryStateStore.url) {
    // Get the last result stored
    const result = queryResultsHistoryStore.state.find(
      (query) => query.url === currentQueryStateStore.url,
    ).result

    // Update the view with the data
    queryResults.value = result
  } else {
    const queryURL = characterApiUrl + '?page=1'

    // Get and display "all character(s)" at initial render
    queryResults.value = await useFetch(queryURL)

    // Store the query url and data
    queryResultsHistoryStore.addQueryResults({ url: queryURL, result: queryResults.value })

    // Store the current query state
    currentQueryStateStore.updateURL(queryURL)
  }
})

/*******************/
/* Filtering Logic */
/*******************/

const filterResults = async (queryFilterValue = '', queryFilterType) => {
  ////////////////////////////////
  /* 1. Build the new query URL */
  ////////////////////////////////

  // Get current params
  const params = new URLSearchParams(new URL(currentQueryStateStore.url).search)

  // Update params with new filter informations
  params.set(queryFilterType, queryFilterValue)
  if (queryFilterType === 'name' || queryFilterType === 'status' || queryFilterType === 'gender') {
    params.set('page', '1')
  } // go back to page 1 when search name, status filter or gender filter has been changed

  // Create the new queryURL
  const newQueryUrl = `${characterApiUrl}${params ? '?' + params.toString() : ''}`

  //////////////////////////////////
  /* 2. Get the new query's data  */
  //////////////////////////////////

  let result

  /* Get data from the store or from the API */
  if (queryResultsHistoryStore.state.some((query) => query.url === newQueryUrl)) {
    // Get the data from the store
    result = queryResultsHistoryStore.state.find((query) => query.url === newQueryUrl).result
  } else {
    // Get the data from the API
    result = await useFetch(newQueryUrl)

    // Store the new data
    queryResultsHistoryStore.addQueryResults({ url: newQueryUrl, result })
  }

  ////////////////////////
  /* 3. Update the view */
  ////////////////////////

  queryResults.value = result

  //////////////////////////////////////////////////
  /* 4. Update the current query URL in the store */
  //////////////////////////////////////////////////

  currentQueryStateStore.updateURL(newQueryUrl)
}
</script>

<template>
  <div class="characters">
    <SearchForm
      :currentName="currentQueryStateStore.currentName"
      @submit="(newName) => filterResults(newName, 'name')"
    />
    <div class="characters__filters-container">
      <SearchFilter
        :currentSelectedValue="currentQueryStateStore.currentStatus"
        :options="['alive', 'dead', 'unknow']"
        name="status"
        @updateSelectedValue="(newStatus) => filterResults(newStatus, 'status')"
      />
      <SearchFilter
        :currentSelectedValue="currentQueryStateStore.currentGender"
        :options="['female', 'male', 'genderless', 'unknow']"
        name="gender"
        @updateSelectedValue="(newGender) => filterResults(newGender, 'gender')"
      />
    </div>
    <div class="characters__list-container">
      <p v-if="!queryResults">No data available.</p>
      <p v-else-if="queryResults.error">No characters found.</p>
      <CharacterList v-else-if="queryResults.results" :characters="queryResults.results" />
    </div>
    <Pagination
      v-if="queryResults?.info?.next || queryResults?.info?.prev"
      :currentPage="Number(currentQueryStateStore.currentPage)"
      :totalPages
      @display-prev-page="filterResults(Number(currentQueryStateStore.currentPage) - 1, 'page')"
      @display-next-page="filterResults(Number(currentQueryStateStore.currentPage) + 1, 'page')"
    />
  </div>
</template>

<style scoped lang="scss">
.characters {
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  &__filters-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
    @media screen and (min-width: 480px) {
      flex-direction: row;
      justify-content: center;
    }
  }
}
</style>
