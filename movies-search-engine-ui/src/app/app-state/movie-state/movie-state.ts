import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { FilterSelection } from 'src/app/model/filter-selection';
import { MovieAvgRatingData } from 'src/app/model/movie-avg-rating-data';
import { MoviesService } from 'src/app/services/movie-service';


export class LoadMovieFilter {
  static readonly type = '[Movies] Load Movie Filter';
  constructor(public filterSelection: FilterSelection) {}
}

export class SetMovies {
  static readonly type = '[Movies] Set Movies';
  constructor(public payload: MovieAvgRatingData[]) {}
}

export class MovieStateModel {
  movies: MovieAvgRatingData[];
}

@State<MovieStateModel>({
  name: 'movies',
  defaults: {
    movies: []
  }
})
@Injectable()
export class MovieState {
  constructor(private moviesService: MoviesService) {}

  @Selector([MovieStateModel])
  static getMovies(state: MovieStateModel) {
    return state.movies;
  }

  @Action(LoadMovieFilter)
  loadMovies(ctx: StateContext<MovieStateModel>, { filterSelection }: LoadMovieFilter) {
    return this.moviesService.getMovieRatings(filterSelection).pipe(
      tap((movies: MovieAvgRatingData[]) => {
        console.log('loadMoview' + JSON.stringify(movies[0]));
        ctx.dispatch(new SetMovies(movies));
      })
    );
  }

  @Action(SetMovies)
  setMovies(ctx: StateContext<MovieStateModel>, { payload }: SetMovies) {
    ctx.patchState({
      movies: payload
    });
  }
}
