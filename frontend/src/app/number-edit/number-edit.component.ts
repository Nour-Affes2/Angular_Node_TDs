import {Component, Input, Output} from '@angular/core';
import {Subject} from "rxjs";
import {FormsModule} from '@angular/forms';
@Component({
  selector: 'app-number-edit',
  standalone: true,
  imports: [
    FormsModule
  ],
  template: 'Number Edit Component <input [(ngModel)]="value" (ngModelChange)="onInputChange()">'
})
export class NumberEditComponent {
  @Input()
  value: number = 0;
  @Output()
  valueChange = new Subject<number>();
  onInputChange() {
    this.valueChange.next(this.value);
  }
}
