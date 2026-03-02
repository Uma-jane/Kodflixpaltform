import { useAuth } from '../context/AuthContext';
import { useMovies } from '../hooks/useMovies';
import Header from '../components/Header';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import './Dashboard.css';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { categories, heroMovie, isLoading, error } = useMovies();

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <h2>Error loading movies</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Header user={user} onLogout={logout} />
      
      {heroMovie && (
        <Hero 
          movie={heroMovie}
          backdropUrl={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
        />
      )}
      
      <div className="movie-rows-container">
        {categories.map((category) => (
          <MovieRow 
            key={category.title}
            title={category.title}
            movies={category.movies}
          />
        ))}
      </div>
    </div>
  );
}
