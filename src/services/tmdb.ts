const API_KEY = import.meta.env.VITE_TMDB_API_KEY || ''
const BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

export interface Movie {
  id: number
  name?: string
  title?: string
  original_name?: string
  original_title?: string
  overview: string
  backdrop_path: string | null
  poster_path: string | null
  media_type?: string
  first_air_date?: string
  release_date?: string
  vote_average: number
  vote_count: number
  genre_ids?: number[]
}

interface TMDBResponse {
  results: Movie[]
  page: number
  total_pages: number
  total_results: number
}

// Image sizes
export const IMAGE_SIZES = {
  small: `${IMAGE_BASE_URL}/w200`,
  medium: `${IMAGE_BASE_URL}/w300`,
  large: `${IMAGE_BASE_URL}/w500`,
  original: `${IMAGE_BASE_URL}/original`,
  backdrop: `${IMAGE_BASE_URL}/w1280`,
}

// Helper function to construct image URL
export const getImageUrl = (path: string | null, size: string = IMAGE_SIZES.large): string => {
  if (!path) return ''
  return `${size}${path}`
}

// Helper function to get movie title
export const getMovieTitle = (movie: Movie): string => {
  return movie.title || movie.name || movie.original_title || movie.original_name || 'Unknown'
}

// Fetch function
const fetchFromTMDB = async (endpoint: string): Promise<Movie[]> => {
  // Check if endpoint already has query parameters
  const separator = endpoint.includes('?') ? '&' : '?'
  const url = `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}&language=en-US`
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data: TMDBResponse = await response.json()
    return data.results
  } catch (error) {
    console.error('Error fetching from TMDB:', error)
    return []
  }
}

// API endpoints
export const fetchNetflixOriginals = (): Promise<Movie[]> => {
  return fetchFromTMDB('/discover/tv')
}

export const fetchTrending = (): Promise<Movie[]> => {
  return fetchFromTMDB('/trending/all/week')
}

export const fetchTopRated = (): Promise<Movie[]> => {
  return fetchFromTMDB('/movie/top_rated')
}

export const fetchActionMovies = (): Promise<Movie[]> => {
  return fetchFromTMDB('/discover/movie?with_genres=28')
}

export const fetchComedyMovies = (): Promise<Movie[]> => {
  return fetchFromTMDB('/discover/movie?with_genres=35')
}

export const fetchHorrorMovies = (): Promise<Movie[]> => {
  return fetchFromTMDB('/discover/movie?with_genres=27')
}

export const fetchRomanceMovies = (): Promise<Movie[]> => {
  return fetchFromTMDB('/discover/movie?with_genres=10749')
}

export const fetchDocumentaries = (): Promise<Movie[]> => {
  return fetchFromTMDB('/discover/movie?with_genres=99')
}

export default {
  fetchNetflixOriginals,
  fetchTrending,
  fetchTopRated,
  fetchActionMovies,
  fetchComedyMovies,
  fetchHorrorMovies,
  fetchRomanceMovies,
  fetchDocumentaries,
  getImageUrl,
  getMovieTitle,
  IMAGE_SIZES,
}
