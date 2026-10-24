import type {
  GenresResponse,
  MovieDetails,
  MoviesResponse,
  SortOption,
} from "../types/movie";
const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export async function fetchPopularMovies(page = 1): Promise<MoviesResponse> {
  const response = await fetch(`${BASE_URL}/movie/popular?page=${page}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`TMDB request failed (${response.status})`);
  }

  return response.json();
}

// useDebounce

export async function searchMovies(
  query: string,
  page = 1
): Promise<MoviesResponse> {
  const response = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`TMDB request failed (${response.status})`);
  }

  return response.json();
}

// Filter and sort

export async function fetchGenres(): Promise<GenresResponse> {
  const response = await fetch(`${BASE_URL}/genre/movie/list`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`TMDB request failed (${response.status})`);
  }

  return response.json();
}

export async function discoverMovies(
  genreId: number | null,
  sortBy: SortOption,
  page = 1
): Promise<MoviesResponse> {
  const params = new URLSearchParams({
    sort_by: sortBy,
    page: String(page),
    "vote_count.gte": "100",
  });

  if (genreId) params.set("with_genres", String(genreId));

  const response = await fetch(`${BASE_URL}/discover/movie?${params}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`TMDB request failed (${response.status})`);
  }

  return response.json();
}

// Routing

export async function fetchMovieDetails(id: number): Promise<MovieDetails> {
  const response = await fetch(`${BASE_URL}/movie/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`TMDB request failed (${response.status})`);
  }

  return response.json();
}