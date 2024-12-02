import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-number-display',
  standalone: true,
  imports: [],
  // templateUrl: './number-display.component.html',
  template: '<div> number display value component: {{value}} </div>',
  styleUrl: './number-display.component.css'
})
export class NumberDisplayComponent {

  @Input()
  value: number = 0;

}
