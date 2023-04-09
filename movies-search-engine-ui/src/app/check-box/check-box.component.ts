import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GenreListItem } from '../model/genre-list';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss']
})
export class CheckBoxComponent implements OnInit {

  ngOnInit(): void {
  }

  items: GenreListItem[] = [
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

  // @Input() items: GenreListItem[] = [];
  @Output() itemChange: EventEmitter<GenreListItem[]> = new EventEmitter();

  onItemChange() {
    this.itemChange.emit(this.items);
  }
}
