import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MovieAvgRatingData } from '../model/movie-avg-rating-data';

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
export class DataDisplayPanelComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'YOR', 'genres', 'avgRating'];
  dataSource: MatTableDataSource<MovieAvgRatingData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(sampleMovieData);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
