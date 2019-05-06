import {
  Component,
  OnChanges,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'pm-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges {
  @Input() rating: number;
  @Output() ratingClicked = new EventEmitter<string>();
  starWidth: number;

  OnClick(): void {
    this.ratingClicked.emit(`The rating ${this.rating} was clicked`);
  }

  ngOnChanges(): void {
    this.starWidth = (this.rating * 75) / 5;
  }
}
