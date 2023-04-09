import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { MovieState, MovieStateModel } from '../app-state/movie-state/movie-state';
import { StarRatingColor } from '../model/star-rating-color';

const sampleMovieData = [{
  name: 'RRR',
  YOR: '2023',
  genres: 'Action',
  avgRating: 5
}]

@Component({
  selector: 'app-data-display-panel',
  templateUrl: './data-display-panel.component.html',
  styleUrls: ['./data-display-panel.component.scss']
})
export class DataDisplayPanelComponent implements AfterViewInit  {
  displayedColumns: string[] = ['name', 'year', 'genre', 'average_rating'];
  dataSource: MatTableDataSource<any>;

  starCount:number = 5;
  starColor:StarRatingColor = StarRatingColor.accent;
  starColorP:StarRatingColor = StarRatingColor.primary;
  starColorW:StarRatingColor = StarRatingColor.warn;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Select(MovieState)
  movieAvgRatingData$: Observable<MovieStateModel>;

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.movieAvgRatingData$.subscribe((movieStateModel: MovieStateModel) => {
      // console.log('ngOnInit' + JSON.stringify(movieStateModel.movies));
      this.dataSource.data = movieStateModel.movies;
    });
  }

  constructor() { }
}

