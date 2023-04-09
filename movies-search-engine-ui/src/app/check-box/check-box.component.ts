import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GenreListItem } from '../model/genre-list';

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
      label: 'Comedy',
      checked: false
    },
    {
      label: 'Crime',
      checked: false
    },
    {
      label: 'Drama',
      checked: false
    },
    {
      label: 'Film-Noir',
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
