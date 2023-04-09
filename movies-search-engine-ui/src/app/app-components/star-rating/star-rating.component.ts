import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

/** component for displaying star ratings */
@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {

  /** The initial rating value. Defaults to 3 */
  @Input('rating') rating: number = 3;

  /** The total number of stars to display. Defaults to 5 */
  @Input('starCount') starCount: number = 5;

  /** The color of the star icons. Defaults to 'accent' */
  @Input('color') color: string = 'accent';

  /** An event emitter that emits the new rating when a user clicks on a star. */
  @Output() private ratingUpdated = new EventEmitter();

  /** The duration in milliseconds to display the snackbar message when a user clicks on a star. */
  private snackBarDuration: number = 2000;

  /** An array of rating values to display as stars. */
  ratingArr: number[] = [];

/**
 * Constructs a new instance of the StarRatingComponent.
 * @param {MatSnackBar} snackBar - The snackbar service used to display a message when a user clicks on a star.
 */
  constructor(private snackBar: MatSnackBar) { }

  /** Initializes the component and creates an array of rating values to display as stars. */
  ngOnInit(): void {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }

  /**
   * Handles the click event on a star and emits the new rating to the parent component.
   * @param {number} rating - The new rating value.
   * @returns {boolean} - Always returns false to prevent default browser behavior.
   */
  onClick(rating:number) {
    this.snackBar.open('You selected ' + rating + ' & Up ', '', {
      duration: this.snackBarDuration
    });
    this.ratingUpdated.emit(rating);
    return false;
  }

  /**
   * Determines which star icon to display based on the current rating value.
   * @param {number} index - The index of the star to display.
   * @returns {string} - Returns 'star' if the index is less than or equal to the current rating value, otherwise returns 'star_border'.
   */
  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
}
