import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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

interface MovieCategory {
  title: string;
  movies: Movie[];
}

export function useMovies() {
  const [categories, setCategories] = useState<MovieCategory[]>([]);
  const [heroMovie, setHeroMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const endpoints = [
        { key: 'trending', title: 'Trending Now' },
        { key: 'popular', title: 'Popular' },
        { key: 'top-rated', title: 'Top Rated' },
        { key: 'upcoming', title: 'Upcoming' },
        { key: 'action', title: 'Action Movies' },
        { key: 'comedy', title: 'Comedy Movies' },
        { key: 'tv-shows', title: 'TV Shows' }
      ];

      const results = await Promise.all(
        endpoints.map(async (endpoint) => {
          const response = await fetch(`${API_URL}/movies/${endpoint.key}`, {
            credentials: 'include'
          });
          
          if (!response.ok) {
            throw new Error(`Failed to fetch ${endpoint.title}`);
          }
          
          const data = await response.json();
          return {
            title: endpoint.title,
            movies: data.results.slice(0, 10)
          };
        })
      );

      setCategories(results);
      
      // Set hero movie from trending
      if (results[0].movies.length > 0) {
        setHeroMovie(results[0].movies[0]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch movies');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return { categories, heroMovie, isLoading, error, refetch: fetchMovies };
}
