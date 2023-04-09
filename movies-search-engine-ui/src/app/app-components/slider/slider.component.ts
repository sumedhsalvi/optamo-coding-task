import { Options } from "@angular-slider/ngx-slider";
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

/** A slider component that allows selecting a range of years within a given range of years */
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  /** Creates a new SliderComponent instance */
  constructor() { }

  /** Angular lifecycle hook called after initialization */
  ngOnInit(): void {
  }

  /** The selected low value of the slider (i.e., the starting year of the selected range). */
  value: number = 2001;

  /** The selected high value of the slider (i.e., the ending year of the selected range). */
  highValue: number = 2018;

  /** The options for the ngx-slider component, defining the range of years available for selection. */
  options: Options = {
    floor: 2000,
    ceil: 2020
  };

  /**
   * Emitter for the selected slider values.
   * Emits an event with an array of two numbers: the low value and the high value of the selected range.
   */
  @Output() readonly valueChanges = new EventEmitter<[number, number]>();

}
