import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FilterSelection } from '../model/filter-selection';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private baseUrl = 'http://localhost:5000/movies';

  constructor(private http: HttpClient) { }

  getMovieRatings(filterSelection: FilterSelection): Observable<any> {
    console.log( 'MOVIE SERIVES'+ JSON.stringify(filterSelection));
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
    return this.http.get(this.baseUrl, { params: params});
  }
}
