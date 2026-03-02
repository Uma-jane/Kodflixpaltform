import { useRef, useState } from 'react'
import './MovieRow.css'

interface Movie {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
}

interface MovieRowProps {
  title: string
  movies: Movie[]
  isLargeRow?: boolean
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

const MovieRow: React.FC<MovieRowProps> = ({ title, movies, isLargeRow = false }) => {
  const rowRef = useRef<HTMLDivElement>(null)
  const [isMoved, setIsMoved] = useState(false)

  const handleClick = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth 
        : scrollLeft + clientWidth
      
      rowRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      })
      
      setIsMoved(scrollTo > 0)
    }
  }

  const getImageUrl = (path: string, size: string = 'w500'): string => {
    return `${IMAGE_BASE_URL}/${size}${path}`
  }

  const getMovieTitle = (movie: Movie): string => {
    return movie.title || movie.name || 'Unknown'
  }

  return (
    <div className="movie-row">
      <h2 className="row-title">{title}</h2>
      <div className="row-container">
        <button 
          className={`row-arrow row-arrow-left ${!isMoved ? 'hidden' : ''}`}
          onClick={() => handleClick('left')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 19L8 12L15 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="row-posters" ref={rowRef}>
          {movies.map((movie) => {
            const imagePath = isLargeRow ? movie.poster_path : movie.backdrop_path
            const imageUrl = getImageUrl(imagePath, isLargeRow ? 'w500' : 'w300')
            
            if (!imagePath) return null
            
            return (
              <div 
                key={movie.id} 
                className={`row-poster ${isLargeRow ? 'row-poster-large' : ''}`}
              >
                <img 
                  src={imageUrl} 
                  alt={getMovieTitle(movie)}
                  loading="lazy"
                />
                <div className="poster-overlay">
                  <div className="poster-actions">
                    <button className="poster-btn play-btn">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 5V19L19 12L8 5Z" fill="white"/>
                      </svg>
                    </button>
                    <button className="poster-btn add-btn">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                    <button className="poster-btn like-btn">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 10H20.8C21.9201 10 22.4802 10 22.908 10.218C23.2843 10.4097 23.5903 10.7157 23.782 11.092C24 11.5198 24 12.0799 24 13.2V14.8C24 15.9201 24 16.4802 23.782 16.908C23.5903 17.2843 23.2843 17.5903 22.908 17.782C22.4802 18 21.9201 18 20.8 18H18L14.2976 21.4453C13.5521 22.1099 12.1782 21.6283 12.1782 20.6618V18H9.2C8.0799 18 7.51984 18 7.09202 17.782C6.71569 17.5903 6.40973 17.2843 6.21799 16.908C6 16.4802 6 15.9201 6 14.8V13.2C6 12.0799 6 11.5198 6.21799 11.092C6.40973 10.7157 6.71569 10.4097 7.09202 10.218C7.51984 10 8.0799 10 9.2 10H10M14 10V4C14 2.89543 13.1046 2 12 2C10.8954 2 10 2.89543 10 4V10H14Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                  <div className="poster-info">
                    <span className="poster-match">{Math.round(movie.vote_average * 10)}% Match</span>
                    <span className="poster-duration">2h 15m</span>
                  </div>
                  <div className="poster-genres">
                    <span>Suspenseful</span>
                    <span>•</span>
                    <span>Exciting</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        
        <button 
          className="row-arrow row-arrow-right"
          onClick={() => handleClick('right')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 5L16 12L9 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default MovieRow
