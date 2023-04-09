/** Represents data for a movie's average rating */
export interface MovieAvgRatingData {
  /** The name of the movie */
  name: string;
  /** The year the movie was released */
  year: string;
  /** An array of genre names associated with the movie */
  genre: string[];
  /** The average rating of the movie */
  average_rating: number;
}
