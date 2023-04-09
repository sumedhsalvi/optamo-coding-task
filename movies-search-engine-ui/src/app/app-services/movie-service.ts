import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FilterSelection } from '../app-model/filter-selection';

/** Service to interact with the movies API and retrieve movie ratings based on filter selections */
@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  /** The base URL of the movies API */
  private baseUrl = 'http://localhost:5000/movies';

  /**
   * Creates a new MoviesService instance.
   * @param http The HTTP client used to make requests to the movies API.
   */
  constructor(private http: HttpClient) { }

  /**
   * Retrieves the movie ratings based on the provided filter selections.
   * @param filterSelection The filter selections to use when retrieving the movie ratings.
   * @returns An Observable that emits the movie ratings data.
   */
  getMovieRatings(filterSelection: FilterSelection): Observable<any> {
    /** Construct the HTTP request parameters based on the provided filter selections */
    let params = new HttpParams()
    filterSelection.genres
      .filter(genre => genre.checked) // Only include checked genres
      .forEach(genre => {
        params = params.append('genres', genre.label);
      });
      if(filterSelection.averageRating !== 0){
        params = params.append('averageRating', filterSelection.averageRating.toString());
      }
    params = params.append('yearRange', filterSelection.yearRange.join(','));
    /** Make the HTTP GET request to the movies API with the constructed parameters */
    return this.http.get(this.baseUrl, { params: params});
  }
}
