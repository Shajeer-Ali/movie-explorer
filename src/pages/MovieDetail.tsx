import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchMovieDetails } from "../api/tmdb";
import ErrorMessage from "../components/ErrorMessage";
import type { MovieDetails } from "../types/movie";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;

    fetchMovieDetails(Number(id))
      .then((data) => {
        if (!cancelled) setMovie(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id, attempt]);

  function handleRetry() {
    setLoading(true);
    setError("");
    setAttempt((a) => a + 1);
  }

  return (
    <div>
      <Link to="/">← Back to movies</Link>
      {loading && <p aria-busy="true">Loading...</p>}
      {error && <ErrorMessage message={error} onRetry={handleRetry} />}
      {!loading && !error && movie && (
        <article className="detail">
          {movie.poster_path ? (
            <img
              className="poster"
              src={`${IMAGE_BASE}${movie.poster_path}`}
              alt={`${movie.title} poster`}
            />
          ) : (
            <div className="no-poster" style={{ maxWidth: 300 }}>
              No poster
            </div>
          )}
          <div className="detail-info">
            <h1>{movie.title}</h1>
            {movie.tagline && (
              <p>
                <em>{movie.tagline}</em>
              </p>
            )}
            <p>
              {movie.release_date ? movie.release_date.slice(0, 4) : "N/A"} ·{" "}
              {movie.runtime ? `${movie.runtime} min` : "Runtime unknown"} · ⭐{" "}
              {movie.vote_average.toFixed(1)}
            </p>
            <p>
              Genres: {movie.genres.map((g) => g.name).join(", ") || "None"}
            </p>
            <h2>Overview</h2>
            <p>{movie.overview || "No overview available."}</p>
          </div>
        </article>
      )}
    </div>
  );
}

export default MovieDetail;
