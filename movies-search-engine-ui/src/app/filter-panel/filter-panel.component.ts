import { Component, OnInit } from '@angular/core';
import { StarRatingColor } from '../star-rating/star-rating.component';
import { GenreListItem } from '../model/genre-list';
import { FilterSelection } from '../model/filter-selection';
import { FilterSelectionState, FilterSelectionStateModel, SetFilterSelection } from '../app-state/filter-selection-state/filter-selection-state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent implements OnInit {

  ngOnInit(): void {

  }

  averageRating:number = 3;
  starCount:number = 5;
  starColor:StarRatingColor = StarRatingColor.accent;
  starColorP:StarRatingColor = StarRatingColor.primary;
  starColorW:StarRatingColor = StarRatingColor.warn;
  genreList: GenreListItem[] = [];
  yearRange: [number, number] = [1900, 2020];

  constructor(private store: Store) {}

  onRatingChanged(averageRating: number){
    console.log(averageRating);
    this.averageRating = averageRating;
    this.onFilterChange();
  }

  onItemListChange(item: GenreListItem[]) {
    console.log(item);
    this.genreList=item;
    this.onFilterChange();
  }

  onYearChange(yearRange: [number, number]) {
    console.log(yearRange);
    this.yearRange = yearRange;
    this.onFilterChange();
  }

  onFilterChange() {
    const filterSelection: FilterSelection = {
      genres: this.genreList,
      averageRating: this.averageRating,
      yearRange: this.yearRange
    };
    this.store.dispatch(new SetFilterSelection(filterSelection));
  }

}
