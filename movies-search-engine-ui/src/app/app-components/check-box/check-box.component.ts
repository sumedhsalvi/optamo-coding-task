import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GenreListItem } from 'src/app/app-model/genre-list';

/**
 * The component emits an `itemChange` event whenever the user checks or unchecks a checkbox. The
 * event payload is an array of `GenreListItem` objects representing the current state of the
 * checkboxes.
 */
@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss']
})
export class CheckBoxComponent implements OnInit {

  /** Initializes the component */
  ngOnInit(): void {
  }

  /** The array of genre items to be displayed as checkboxes */
  @Input() items: GenreListItem[] = [
    {
      label: 'Action',
      checked: false
    },
    {
      label: 'Adventure',
      checked: false
    },
    {
      label: 'Animation',
      checked: false
    },
    {
      label: 'Children',
      checked: false
    },
    {
      label: 'Comedy',
      checked: false
    },
    {
      label: 'Crime',
      checked: false
    },
    {
      label: 'Documentary',
      checked: false
    },
    {
      label: 'Drama',
      checked: false
    },
    {
      label: 'Fantasy',
      checked: false
    },
    {
      label: 'Film-Noir',
      checked: false
    },
    {
      label: 'Horror',
      checked: false
    },
    {
      label: 'IMAX',
      checked: false
    },
    {
      label: 'Musical',
      checked: false
    },
    {
      label: 'Mystery',
      checked: false
    },
    {
      label: 'Romance',
      checked: false
    },
    {
      label: 'Sci-Fi',
      checked: false
    },
    {
      label: 'Thriller',
      checked: false
    },
    {
      label: 'War',
      checked: false
    },
    {
      label: 'Western',
      checked: false
    }
  ];

  /**
   * An event emitter that fires whenever a checkbox is checked or unchecked.
   * The event payload is an array of `GenreListItem` objects representing the
   * current state of the checkboxes.
   */
  @Output() itemChange: EventEmitter<GenreListItem[]> = new EventEmitter();

  /**
   * Handles the change event for a checkbox.
   * Emits the `itemChange` event with the current state of the checkboxes.
   */
  onItemChange() {
    this.itemChange.emit(this.items);
  }
}
