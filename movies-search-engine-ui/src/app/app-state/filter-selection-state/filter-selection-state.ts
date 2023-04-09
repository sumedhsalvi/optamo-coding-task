import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { LoadMovieFilter } from '../movie-state/movie-state';
import { FilterSelection } from 'src/app/app-model/filter-selection';

/** Interface represents the data model for the filter selection state */
export interface FilterSelectionStateModel {
  filterSelection: FilterSelection;
}

/** Class defines the action for setting the filter selection */
export class SetFilterSelection {
  static readonly type = '[FilterSelection] Set';

  constructor(public filterSelection: FilterSelection) {}
}

/** State for the filter selection feature */
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
  /**
   * Action is triggered when a new filter selection is set.
   * @param patchState - The method to update the current state.
   * @param dispatch - The method to dispatch an action to the store.
   * @param filterSelection - The new filter selection to set.
   */
  @Action(SetFilterSelection)
  setFilterSelection(
    { patchState , dispatch }: StateContext<FilterSelectionStateModel>,
    { filterSelection }: SetFilterSelection
  ) {
    patchState({ filterSelection });
    dispatch(new LoadMovieFilter(filterSelection));
  }

  /**
   * Selector returns the current filter selection state.
   * @param state - The current state of the filter selection feature.
   * @returns The current filter selection state.
   */
  @Selector()
  static getFilterSelection(state: FilterSelectionStateModel) {
    return state.filterSelection;
  }
}
