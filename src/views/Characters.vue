<script setup lang="ts">
import CharacterList from '@/components/CharacterList.vue'
import Pagination from '@/components/Pagination.vue'
import SearchFilter from '@/components/SearchFilter.vue'
import SearchForm from '@/components/SearchForm.vue'
import { useFetch } from '@/composables/useFetch'
import { computed, ref, watch, type ComputedRef, type Ref } from 'vue'
import { useQueryResultsHistoryStore } from '@/stores/queryResultsHistory'
import { useRouter, useRoute } from 'vue-router'
const characterApiBaseUrl: string = import.meta.env.VITE_CHARACTER_API_BASE_URL

/**********/
/* States */
/**********/

const router = useRouter()
const route = useRoute()
const queryResults: Ref<CharacterAPIResponse | undefined> = ref()
const queryResultsHistoryStore = useQueryResultsHistoryStore()

/************/
/* Computed */
/************/

// Compute the total pages number from the current query results
const totalPages: ComputedRef<number | undefined> = computed(() =>
  queryResults.value && 'info' in queryResults.value ? queryResults.value.info.pages : undefined,
)

// Compute the current parameters from the URL
const currentName: ComputedRef<string> = computed(() => route.query.name as string)
const currentStatus: ComputedRef<string> = computed(() => route.query.status as string)
const currentGender: ComputedRef<string> = computed(() => route.query.gender as string)
const currentPage: ComputedRef<string> = computed(() => (route.query.page as string) || '1')

/***********/
/* Methods */
/***********/

const getAndDisplayData = async (params: string) => {
  //////////////////////
  /* 1. Get the data  */
  //////////////////////

  const queryUrl: string = characterApiBaseUrl + params
  let results: CharacterAPIResponse | undefined

  if (queryResultsHistoryStore.isQueryExists(queryUrl)) {
    // Get the data from the store
    results = queryResultsHistoryStore.getQueryResults(queryUrl)
  } else {
    // Get the data from the API
    results = await useFetch(queryUrl)

    // Store the new data
    if (results) {
      queryResultsHistoryStore.addQueryResults({ url: queryUrl, results })
    }
  }

  ////////////////////////
  /* 2. Update the view */
  ////////////////////////

  queryResults.value = results
}

const filterResults = async (filterValue: string, filterType: string) => {
  /////////////////////////////
  /* 1. Build the new params */
  /////////////////////////////

  // Get current params
  const newParams: URLSearchParams = new URLSearchParams(route.query as Record<string, string>)

  // Update new params with new filter informations
  newParams.set(filterType, filterValue)
  if (filterType === 'name' || filterType === 'status' || filterType === 'gender') {
    newParams.delete('page')
  } // ensure page 1 content is displayed

  // Build the complete new query params
  const newQueryParams: string = newParams ? '?' + newParams.toString() : ''

  //////////////////////////////////////////////////////////////////////
  /* 2. Update the route to display the data associated to the params */
  //////////////////////////////////////////////////////////////////////

  router.push(newQueryParams)
}

/*************/
/* Utilities */
/*************/

const isCurrentParamsExists = () => Object.keys(route.query).length > 0

/************/
/* Watchers */
/************/

// Watch the route to display its corresponding data
watch(
  () => route.fullPath,
  async () => {
    ///////////////////////////////
    /* 1. Get the current params */
    ///////////////////////////////

    let params: string = ''

    // Get current params if exits
    if (isCurrentParamsExists()) {
      params = '?' + new URLSearchParams(route.query as Record<string, string>).toString()
    }

    ///////////////////////////////////////////////////
    /* 2. Display the data associated to the params  */
    ///////////////////////////////////////////////////

    getAndDisplayData(params)
  },
  { immediate: true },
)
</script>

<template>
  <div class="characters">
    <SearchForm :currentName @submit="(newName) => filterResults(newName, 'name')" />
    <div class="characters__filters-container">
      <SearchFilter
        :currentSelectedValue="currentStatus"
        :options="['alive', 'dead', 'unknown']"
        name="status"
        @updateSelectedValue="(newStatus: string) => filterResults(newStatus, 'status')"
      />
      <SearchFilter
        :currentSelectedValue="currentGender"
        :options="['female', 'male', 'genderless', 'unknown']"
        name="gender"
        @updateSelectedValue="(newGender: string) => filterResults(newGender, 'gender')"
      />
    </div>
    <div class="characters__list-container">
      <p v-if="!queryResults">No data available.</p>
      <p v-else-if="'error' in queryResults">No characters found.</p>
      <CharacterList v-else-if="'results' in queryResults" :characters="queryResults.results" />
    </div>
    <Pagination
      v-if="totalPages && totalPages > 1"
      :currentPage="Number(currentPage)"
      :totalPages
      @display-prev-page="filterResults(String(Number(currentPage) - 1), 'page')"
      @display-next-page="filterResults(String(Number(currentPage) + 1), 'page')"
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
