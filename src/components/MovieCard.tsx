import type { Movie } from "../types/movie";
import { Link } from "react-router-dom";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w342";

interface MovieCardProps {
  movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
  const year = movie.release_date ? movie.release_date.slice(0, 4) : "N/A";

  return (
    <article className="card">
      {movie.poster_path ? (
        <img
          className="poster"
          src={`${IMAGE_BASE}${movie.poster_path}`}
          alt={`${movie.title} poster`}
          loading="lazy"
        />
      ) : (
        <div className="no-poster">No poster</div>
      )}
      <h3>
        <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
      </h3>
      <p>
        {year} · ⭐ {movie.vote_average.toFixed(1)}
      </p>
    </article>
  );
}

export default MovieCard;
