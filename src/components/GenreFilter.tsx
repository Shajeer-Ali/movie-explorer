import type { Genre, SortOption } from "../types/movie";

interface GenreFilterProps {
  genres: Genre[];
  genreId: number | null;
  sortBy: SortOption;
  onGenreChange: (id: number | null) => void;
  onSortChange: (sort: SortOption) => void;
  disabled?: boolean;
}

function GenreFilter({
  genres,
  genreId,
  sortBy,
  onGenreChange,
  onSortChange,
  disabled = false,
}: GenreFilterProps) {
  return (
    <div className="controls">
      <div className="field">
        <label htmlFor="genre">Genre</label>
        <select
          id="genre"
          value={genreId ?? ""}
          disabled={disabled}
          onChange={(e) =>
            onGenreChange(e.target.value ? Number(e.target.value) : null)
          }
        >
          <option value="">All genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="sort">Sort by</label>
        <select
          id="sort"
          value={sortBy}
          disabled={disabled}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
        >
          <option value="popularity.desc">Most popular</option>
          <option value="vote_average.desc">Highest rated</option>
          <option value="primary_release_date.desc">Newest</option>
        </select>
      </div>
    </div>
  );
}

export default GenreFilter;