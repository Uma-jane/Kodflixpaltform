import { useState } from 'react'
import './Hero.css'

interface Movie {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
}

interface HeroProps {
  movie: Movie;
  backdropUrl: string;
}

const Hero: React.FC<HeroProps> = ({ movie, backdropUrl }) => {
  const [isTruncated, setIsTruncated] = useState(true)

  const title = movie.title || movie.name || 'Unknown'
  const year = movie.release_date?.substring(0, 4) || movie.first_air_date?.substring(0, 4) || '2024'
  
  // Truncate overview to 150 characters
  const truncateOverview = (text: string, maxLength: number = 150): string => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength).trim() + '...'
  }



  return (
    <div className="hero" style={{ backgroundImage: `url(${backdropUrl})` }}>
      <div className="hero-gradient-top"></div>
      <div className="hero-gradient-bottom"></div>
      
      <div className="hero-content">
        <div className="hero-title-section">
          <h1 className="hero-title">{title}</h1>
          
          <div className="hero-meta">
            <span className="hero-rating">{Math.round(movie.vote_average * 10)}% Match</span>
            <span className="hero-year">{year}</span>
          </div>
          
          <p className="hero-description">
            {isTruncated ? truncateOverview(movie.overview) : movie.overview}
            {movie.overview.length > 150 && (
              <button 
                className="more-info-btn" 
                onClick={() => setIsTruncated(!isTruncated)}
              >
                {isTruncated ? 'More' : 'Less'}
              </button>
            )}
          </p>
          
          <div className="hero-buttons">
            <button className="hero-btn hero-btn-play">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5V19L19 12L8 5Z" fill="black"/>
              </svg>
              Play
            </button>
            <button className="hero-btn hero-btn-more">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2"/>
                <path d="M12 8V12M12 16H12.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
