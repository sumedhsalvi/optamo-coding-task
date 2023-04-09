import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { FilterSelection } from 'src/app/app-model/filter-selection';
import { MovieAvgRatingData } from 'src/app/app-model/movie-avg-rating-data';
import { MoviesService } from 'src/app/app-services/movie-service';

/** Class defines the action for loading movies filtered by a given selection */
export class LoadMovieFilter {
  static readonly type = '[Movies] Load Movie Filter';
  constructor(public filterSelection: FilterSelection) {}
}

/** Class defines the action for setting the movies in the state */
export class SetMovies {
  static readonly type = '[Movies] Set Movies';
  constructor(public payload: MovieAvgRatingData[]) {}
}

/** Interface represents the data model for the movie state */
export class MovieStateModel {
  movies: MovieAvgRatingData[];
}

/** State to handle movie data */
@State<MovieStateModel>({
  name: 'movies',
  defaults: {
    movies: []
  }
})
@Injectable()
export class MovieState {
  constructor(private moviesService: MoviesService) {}

  /**
   * Selector returns the current list of movies in the state.
   * @param state - The current state of the movie data.
   * @returns The current list of movies in the state.
   */
  @Selector([MovieStateModel])
  static getMovies(state: MovieStateModel) {
    return state.movies;
  }

  /**
   * Action is triggered when the user selects a new filter for the movies.
   * It calls the movies service to get the new list of movies filtered by the selected criteria,
   * and then dispatches a `SetMovies` action to update the state with the new list of movies.
   * @param ctx - The context object containing the current state and dispatch method.
   * @param filterSelection - The filter selection criteria.
   * @returns An observable of the new list of movies.
   */
  @Action(LoadMovieFilter)
  loadMovies(ctx: StateContext<MovieStateModel>, { filterSelection }: LoadMovieFilter) {
    return this.moviesService.getMovieRatings(filterSelection).pipe(
      tap((movies: MovieAvgRatingData[]) => {
        console.log('loadMoview' + JSON.stringify(movies[0]));
        ctx.dispatch(new SetMovies(movies));
      })
    );
  }

  /**
   * Action is triggered by the `LoadMovieFilter` action and sets the new list of movies
   * in the state.
   * @param ctx - The context object containing the current state and dispatch method.
   * @param payload - The new list of movies to set.
   */
  @Action(SetMovies)
  setMovies(ctx: StateContext<MovieStateModel>, { payload }: SetMovies) {
    ctx.patchState({
      movies: payload
    });
  }
}
