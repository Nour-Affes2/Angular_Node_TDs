import {Component, Output} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-number-steps',
  standalone: true,
  imports: [],
  templateUrl: './number-steps.component.html',
  styleUrl: './number-steps.component.css'
})
export class NumberStepsComponent {

  @Output()
  decr10 = new Subject<number>();
  @Output()
  decr1 = new Subject<number>();
  @Output()
  incr1 = new Subject<number>();
  @Output()
  incr10 = new Subject<number>();

  onClickDecr10() {
    this.decr10.next(-10);
  }
  onClickDecr1() {
    this.decr1.next(-1);
  }
  onClickIncr1() {
    this.incr1.next(+1);
  }
  onClickIncr10() {
    this.incr10.next(+10);
  }

}
