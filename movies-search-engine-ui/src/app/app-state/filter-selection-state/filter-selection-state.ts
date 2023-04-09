import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { FilterSelection } from 'src/app/model/filter-selection';
import { LoadMovieFilter, MovieState } from '../movie-state/movie-state';


export interface FilterSelectionStateModel {
  filterSelection: FilterSelection;
}

export class SetFilterSelection {
  static readonly type = '[FilterSelection] Set';

  constructor(public filterSelection: FilterSelection) {}
}

@State<FilterSelectionStateModel>({
  name: 'filterSelection',
  defaults: {
    filterSelection: {
      genres: [],
      averageRating: 0,
      yearRange: [0, 0]
    }
  }
})
@Injectable()
export class FilterSelectionState {
  @Action(SetFilterSelection)
  setFilterSelection(
    { patchState , dispatch }: StateContext<FilterSelectionStateModel>,
    { filterSelection }: SetFilterSelection
  ) {
    patchState({ filterSelection });
    dispatch(new LoadMovieFilter(filterSelection));
    console.log('state update'+  filterSelection);
  }

  @Selector()
  static getFilterSelection(state: FilterSelectionStateModel) {
    return state.filterSelection;
  }
}
