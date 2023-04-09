import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

/** A component that displays a star rating system with customizable number of stars, color, and rating value */
@Component({
  selector: 'app-star-button',
  templateUrl: './star-button.component.html',
  styleUrls: ['./star-button.component.scss']
})
export class StarButtonComponent implements OnInit {

  /** The rating value to be displayed as a number of filled stars. Default is 3. */
  @Input('rating') rating: number = 3;

  /** The number of stars to be displayed. Default is 5. */
  @Input('starCount') starCount: number = 5;

  /** The color of the stars. Default is 'accent'. */
  @Input('color') color: string = 'accent';

  /** Emitter for the updated rating value. Emits an event when the user clicks on a star to update the rating. */
  @Output() private ratingUpdated = new EventEmitter();

  /** An array of numbers from 0 to starCount-1, used to generate the star icons. */
  ratingArr: number[] = [];

  /** Creates a new StarButtonComponent instance */
  constructor() { }

  /**
   * Angular lifecycle hook called after initialization.
   * Initializes the ratingArr array with numbers from 0 to starCount-1.
   */
  ngOnInit(): void {
    console.log("a "+this.starCount)
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }

  /**
   * Returns the name of the icon to be displayed for the given star index, based on the current rating value.
   * If the rating is greater than or equal to the index+1, returns 'star'; otherwise, returns 'star_border'.
   */
  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
}
