import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import MovieRow from './components/MovieRow'
import type { Movie } from './services/tmdb'
import { fetchNetflixOriginals, fetchTrending, fetchTopRated, fetchActionMovies, fetchComedyMovies, fetchHorrorMovies, fetchRomanceMovies, fetchDocumentaries } from './services/tmdb'
import './App.css'

function App() {
  const [netflixOriginals, setNetflixOriginals] = useState<Movie[]>([])
  const [trending, setTrending] = useState<Movie[]>([])
  const [topRated, setTopRated] = useState<Movie[]>([])
  const [actionMovies, setActionMovies] = useState<Movie[]>([])
  const [comedyMovies, setComedyMovies] = useState<Movie[]>([])
  const [horrorMovies, setHorrorMovies] = useState<Movie[]>([])
  const [romanceMovies, setRomanceMovies] = useState<Movie[]>([])
  const [documentaries, setDocumentaries] = useState<Movie[]>([])
  const [heroMovie, setHeroMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          netflixData,
          trendingData,
          topRatedData,
          actionData,
          comedyData,
          horrorData,
          romanceData,
          documentaryData
        ] = await Promise.all([
          fetchNetflixOriginals(),
          fetchTrending(),
          fetchTopRated(),
          fetchActionMovies(),
          fetchComedyMovies(),
          fetchHorrorMovies(),
          fetchRomanceMovies(),
          fetchDocumentaries()
        ])

        setNetflixOriginals(netflixData)
        setTrending(trendingData)
        setTopRated(topRatedData)
        setActionMovies(actionData)
        setComedyMovies(comedyData)
        setHorrorMovies(horrorData)
        setRomanceMovies(romanceData)
        setDocumentaries(documentaryData)

        // Set a random Netflix original as the hero movie
        if (netflixData.length > 0) {
          const randomIndex = Math.floor(Math.random() * Math.min(10, netflixData.length))
          setHeroMovie(netflixData[randomIndex])
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  return (
    <div className="app">
      <Header />
      {heroMovie && <Hero movie={heroMovie} />}
      <div className="movie-rows">
        <MovieRow title="Netflix Originals" movies={netflixOriginals} isLargeRow />
        <MovieRow title="Trending Now" movies={trending} />
        <MovieRow title="Top Rated" movies={topRated} />
        <MovieRow title="Action Movies" movies={actionMovies} />
        <MovieRow title="Comedy Movies" movies={comedyMovies} />
        <MovieRow title="Horror Movies" movies={horrorMovies} />
        <MovieRow title="Romance Movies" movies={romanceMovies} />
        <MovieRow title="Documentaries" movies={documentaries} />
      </div>
    </div>
  )
}

export default App
