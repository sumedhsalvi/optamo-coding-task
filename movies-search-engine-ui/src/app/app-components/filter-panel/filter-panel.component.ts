import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { FilterSelection } from 'src/app/app-model/filter-selection';
import { GenreListItem } from 'src/app/app-model/genre-list';
import { StarRatingColor } from 'src/app/app-model/star-rating-color';
import { SetFilterSelection } from 'src/app/app-state/filter-selection-state/filter-selection-state';

/**
 * Component for managing filters in a movie app.
 * Allows users to filter movies by average rating, genre, and year range.
 * Uses Ngxs store to manage and dispatch filter selection to other components.
 */
@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent implements OnInit {

  /** Average rating value for filtering movies */
  averageRating:number = 0;

  /** Number of stars to display for rating */
  starCount:number = 5;

  /** Color of stars for rating */
  starColor:StarRatingColor = StarRatingColor.accent;

  /** Color of primary stars for rating */
  starColorP:StarRatingColor = StarRatingColor.primary;

  /** Color of warning stars for rating */
  starColorW:StarRatingColor = StarRatingColor.warn;

  /** List of genres for filtering movies */
  genreList: GenreListItem[] = [];

  /** Range of years for filtering movies */
  yearRange: [number, number] = [2000, 2020];

  /**
   * Creates a new FilterPanelComponent.
   * @param store The Ngxs store to dispatch filter selection to.
   */
  constructor(private store: Store) {}

  /** Initializes the component by calling onFilterChange() */
  ngOnInit(): void {
    this.onFilterChange();
  }

  /**
   * Event handler for rating change.
   * @param averageRating The new average rating value.
   */
  onRatingChanged(averageRating: number){
    console.log(averageRating);
    this.averageRating = averageRating;
    this.onFilterChange();
  }

  /**
   * Event handler for genre list change.
   * @param item The new list of genre items.
   */
  onItemListChange(item: GenreListItem[]) {
    console.log(item);
    this.genreList=item;
    this.onFilterChange();
  }

  /**
   * Event handler for year range change.
   * @param yearRange The new range of years.
   */
  onYearChange(yearRange: [number, number]) {
    console.log(yearRange);
    this.yearRange = yearRange;
    this.onFilterChange();
  }

  /** Dispatches the current filter selection to the Ngxs store */
  onFilterChange() {
    const filterSelection: FilterSelection = {
      genres: this.genreList,
      averageRating: this.averageRating,
      yearRange: this.yearRange
    };
    this.store.dispatch(new SetFilterSelection(filterSelection));
  }

}
