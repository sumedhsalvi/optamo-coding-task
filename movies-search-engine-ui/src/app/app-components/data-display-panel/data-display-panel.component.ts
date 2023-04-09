import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { StarRatingColor } from 'src/app/app-model/star-rating-color';
import { MovieState, MovieStateModel } from 'src/app/app-state/movie-state/movie-state';

/** This component represents a data display panel that shows a table of movies with average ratings */
@Component({
  selector: 'app-data-display-panel',
  templateUrl: './data-display-panel.component.html',
  styleUrls: ['./data-display-panel.component.scss']
})
export class DataDisplayPanelComponent implements AfterViewInit  {
  /** The list of columns to display in the table */
  displayedColumns: string[] = ['name', 'year', 'genre', 'average_rating'];

  /** The data source for the table */
  dataSource: MatTableDataSource<any>;

  /** The number of stars to display for each movie's rating */
  starCount:number = 5;

  /** The accent color for the ratings */
  starColor:StarRatingColor = StarRatingColor.accent;

  /** The primary color for the ratings */
  starColorP:StarRatingColor = StarRatingColor.primary;

  /** The warn color for the ratings */
  starColorW:StarRatingColor = StarRatingColor.warn;

  /** The paginator for the table */
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /** The sort for the table */
  @ViewChild(MatSort) sort: MatSort;

  /** The observable that provides the movie data with their average ratings */
  @Select(MovieState)
  movieAvgRatingData$: Observable<MovieStateModel>;

  /** Called after the component's view has been initialized */
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.movieAvgRatingData$.subscribe((movieStateModel: MovieStateModel) => {
      this.dataSource.data = movieStateModel.movies;
    });
  }

  constructor() { }
}

