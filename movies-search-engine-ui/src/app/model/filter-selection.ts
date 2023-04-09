import { GenreListItem } from "./genre-list";

/** Represents a filter selection. */
export interface FilterSelection {
  /** An array of genre items to filter by */
  genres: GenreListItem[];
  /** The minimum average rating for the filtered items */
  averageRating: number;
  /**
   * A tuple representing the range of years to filter by.
   * The first element is the minimum year, the second element is the maximum year.
   */
  yearRange: [number, number];
}
