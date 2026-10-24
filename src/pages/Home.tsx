import { useEffect, useState } from "react";
import { discoverMovies, fetchGenres, searchMovies } from "../api/tmdb";
import ErrorMessage from "../components/ErrorMessage";
import GenreFilter from "../components/GenreFilter";
import MovieGrid from "../components/MovieGrid";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import Skeleton from "../components/Skeleton";
import { useDebounce } from "../hooks/useDebounce";
import type { Genre, Movie, SortOption } from "../types/movie";

const MAX_PAGES = 500;

function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [search, setSearch] = useState("");
  const [genreId, setGenreId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("popularity.desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const debouncedSearch = useDebounce(search.trim(), 500);

  useEffect(() => {
    fetchGenres()
      .then((data) => setGenres(data.genres))
      .catch(() => {
        // The filter just stays empty if genres fail to load
      });
  }, []);

  useEffect(() => {
    let cancelled = false;

    const request = debouncedSearch
      ? searchMovies(debouncedSearch, page)
      : discoverMovies(genreId, sortBy, page);

    request
      .then((data) => {
        if (!cancelled) {
          setMovies(data.results);
          setTotalPages(Math.min(data.total_pages, MAX_PAGES));
          setError("");
        }
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
  }, [debouncedSearch, genreId, sortBy, page, attempt]);

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
    setLoading(true);
  }

  function handleGenreChange(id: number | null) {
    setGenreId(id);
    setPage(1);
    setLoading(true);
  }

  function handleSortChange(sort: SortOption) {
    setSortBy(sort);
    setPage(1);
    setLoading(true);
  }

  function handlePageChange(newPage: number) {
    setPage(newPage);
    setLoading(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleRetry() {
    setLoading(true);
    setError("");
    setAttempt((a) => a + 1);
  }

  return (
    <div>
      <h1>
        {debouncedSearch ? `Results for "${debouncedSearch}"` : "Discover Movies"}
      </h1>
      <SearchBar value={search} onChange={handleSearchChange} />
      <GenreFilter
        genres={genres}
        genreId={genreId}
        sortBy={sortBy}
        onGenreChange={handleGenreChange}
        onSortChange={handleSortChange}
        disabled={search.trim() !== ""}
      />
      {loading && <Skeleton />}
      {error && <ErrorMessage message={error} onRetry={handleRetry} />}
      {!loading && !error && movies.length === 0 && <p>No movies found.</p>}
      {!loading && !error && movies.length > 0 && (
        <>
          <MovieGrid movies={movies} />
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

export default Home;