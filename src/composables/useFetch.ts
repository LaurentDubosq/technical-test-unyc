// Composable to fetch external data
export const useFetch = async <T>(url: string, options?: RequestInit): Promise<T | undefined> => {
  try {
    const response = await fetch(url, options)
    // Handle both successful responses and 'not found' responses
    if (response.ok || response.status === 404) {
      const data = await response.json()
      return data as T
    } else {
      const errorMessage = `${response.status} - ${response.statusText}`
      throw new Error(errorMessage)
    }
  } catch (error) {
    if (error instanceof TypeError) {
      console.log('Network error: Please check your internet connection or the request URL.')
    } else {
      console.log('Error encountered after the Fetch execution :', error)
    }
  }
}
