interface PageInfo {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

interface LocationInfo {
  name: string
  url: string
}

type CharacterStatus = 'alive' | 'dead' | 'unknown'
type CharacterGender = 'female' | 'male' | 'genderless' | 'unknown'

interface Character {
  id: number
  name: string
  status: CharacterStatus
  species: string
  type: string
  gender: CharacterGender
  origin: LocationInfo
  location: LocationInfo
  image: string
  episode: string[]
  url: string
  created: string
}

interface CharacterAPIResponseSuccess {
  info: PageInfo
  results: Character[]
}

interface CharacterAPIResponseError {
  error: string
}

// Union type: CharacterAPIResponse can be either a success or an error
type CharacterAPIResponse = CharacterAPIResponseSuccess | CharacterAPIResponseError
