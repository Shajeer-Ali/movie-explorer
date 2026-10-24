export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
  overview: string;
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// filter and sort

export interface Genre {
  id: number;
  name: string;
}

export interface GenresResponse {
  genres: Genre[];
}

export type SortOption =
  | "popularity.desc"
  | "vote_average.desc"
  | "primary_release_date.desc";

//   Routing

export interface MovieDetails extends Movie {
  tagline: string;
  runtime: number | null;
  genres: Genre[];
}