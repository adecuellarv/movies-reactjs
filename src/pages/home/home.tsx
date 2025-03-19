import React, { useState, useEffect } from 'react';
import './styles.scss';

interface Movie {
  id: number;
  title: string;
  rating: number;
  actor: string;
  image: string;
}

const movies: Movie[] = [
  {
    id: 1,
    title: 'Movie 1',
    rating: 8.5,
    actor: 'Actor 1',
    image: 'https://via.placeholder.com/800x600',
  },
  {
    id: 2,
    title: 'Movie 2',
    rating: 7.8,
    actor: 'Actor 2',
    image: 'https://via.placeholder.com/800x600',
  },
  {
    id: 3,
    title: 'Movie 3',
    rating: 9.0,
    actor: 'Actor 3',
    image: 'https://via.placeholder.com/800x600',
  },
];

const Home = () => {
  const [currentMovie, setCurrentMovie] = useState<Movie>(movies[0]);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        const currentIndex = movies.findIndex(movie => movie.id === currentMovie.id);
        const nextIndex = (currentIndex + 1) % movies.length;
        setCurrentMovie(movies[nextIndex]);
        setFade(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentMovie]);

  const handleThumbnailClick = (movie: Movie) => {
    setFade(false);
    setTimeout(() => {
      setCurrentMovie(movie);
      setFade(true);
    }, 500);
  };
  return (
    <div className="movie-slider">
      <div className="main-slider">
        <div
          className={`main-slide ${fade ? 'fade-in' : 'fade-out'}`}
          style={{ backgroundImage: `url(${currentMovie.image})` }}
        >
          <div className="overlay"></div>
          <div className="movie-info">
            <h1>{currentMovie.title}</h1>
            <p>Rating: {currentMovie.rating}</p>
            <p>Starring: {currentMovie.actor}</p>
          </div>
        </div>
      </div>
      <div className="thumbnail-slider">
        {movies.map(movie => (
          <div
            key={movie.id}
            className={`thumbnail ${movie.id === currentMovie.id ? 'active' : ''}`}
            onClick={() => handleThumbnailClick(movie)}
          >
            <img src={movie.image} alt={movie.title} />
          </div>
        ))}
      </div>
    </div>
  )
};

export default Home;