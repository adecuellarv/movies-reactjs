import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { IMovie } from "../../interfaces/IMovies";
import "./styles.scss";

const Sliders = () => {
  const [currentMovie, setCurrentMovie] = useState<IMovie | null>(null);
  const [fade, setFade] = useState(true);
  const [movies, setMovies] = useState<IMovie[]>([]);

  const handleThumbnailClick = (movie: IMovie) => {
    setFade(false);
    setTimeout(() => {
      setCurrentMovie(movie);
      setFade(true);
    }, 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!currentMovie || !movies.length) return;

      setFade(false);
      setTimeout(() => {
        const currentIndex = movies.findIndex(
          (movie) => movie.movieId === currentMovie.movieId
        );
        const nextIndex = (currentIndex + 1) % movies.length;
        setCurrentMovie(movies[nextIndex]);
        setFade(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentMovie, movies]);

  useEffect(() => {
    const getAllMovies = async () => {
      const apiUrl = process.env.REACT_APP_API_URL;
      const resp: any = await axios(`${apiUrl}/movies`);
      if (resp) {
        setMovies(resp.data);
        if (resp.data.length > 0) {
          setCurrentMovie(resp.data[0]);
        }
      }
    };
    getAllMovies();
  }, []);

  return (
    <Fragment>
      {!!movies.length && currentMovie && (
        <div className="movie-slider">
          <div className="main-slider">
            <div
              className={`main-slide ${fade ? "fade-in" : "fade-out"}`}
              style={{ backgroundImage: `url(${currentMovie.movieImage})` }}
            >
              <div className="overlay"></div>
              <div className="movie-info">
                <h1>{currentMovie.movieTitle}</h1>
                <p>
                  <span className="rating-stars">
                    {Array.from({ length: 5 }, (_, index) => (
                      <i
                        key={index}
                        className={`fa fa-star ${index < Math.floor(currentMovie.movieRaiting)
                            ? "filled"
                            : "empty"
                          }`}
                      />
                    ))}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="thumbnail-slider">
            {movies.map((movie) => (
              <div
                key={movie.movieId}
                className={`thumbnail ${movie.movieId === currentMovie.movieId ? "active" : ""
                  }`}
                onClick={() => handleThumbnailClick(movie)}
              >
                <img src={movie.movieImage} alt={movie.movieTitle} />
              </div>
            ))}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Sliders;
