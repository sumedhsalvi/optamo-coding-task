import { GenreListItem } from "./genre-list";

export interface FilterSelection {
  genres: GenreListItem[];
  averageRating: number;
  yearRange: [number, number];
}
