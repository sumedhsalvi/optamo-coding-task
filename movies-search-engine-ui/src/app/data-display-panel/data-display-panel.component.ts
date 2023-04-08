import { AfterViewInit, Component, OnChanges, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MovieAvgRatingData } from '../model/movie-avg-rating-data';
import { MovieService } from '../services/movie-service';
import { HttpParams } from '@angular/common/http';

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
  displayedColumns: string[] = ['name', 'year', 'genre', 'average_rating'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  filterByGenre: string = '';
  filterByYear: number = 0;
  filterByRating: number = 0;
  filterByName: string = '';


  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadData();
  }

  loadData() {
    let params = new HttpParams()
      .set('filter_by_genre', this.filterByGenre)
      .set('filter_by_year',  this.filterByYear.toString())
      .set('filter_by_rating', this.filterByRating.toString())
      .set('filter_by_name', this.filterByName);
    this.movieService.getMovieRatings(params).subscribe(
      data => {
        console.log('data load:' + JSON.stringify(data));
        this.dataSource.data = data.map((movie: { name: any; year: any; genre: any; average_rating: any; }) => ({
          name: movie.name,
          year: Number(movie.year),
          genre: movie.genre,
          average_rating: movie.average_rating
        }));
      },
      error => {
        console.log(error);
      }
    );
  }

  applyFilter() {
    this.loadData();
  }

  searchMovie: string = '';
  movieRatings: any[] = []; //to do

  constructor(private movieService: MovieService) { }

}
