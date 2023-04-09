import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Options } from "@angular-slider/ngx-slider";

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  value: number = 1990;
  highValue: number = 2020;
  options: Options = {
    floor: 1900,
    ceil: 2020
  };

  /** Emitter for slider values */
  @Output() readonly valueChanges = new EventEmitter<[number, number]>();

}
