import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerRangePopupComponent } from './date-picker-range-popup.component';

describe('DatePickerRangePopupComponent', () => {
  let component: DatePickerRangePopupComponent;
  let fixture: ComponentFixture<DatePickerRangePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatePickerRangePopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatePickerRangePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
