import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {LessonEditFormComponent} from "./lesson-edit-form/lesson-edit-form.component";
import {LessonSearchPageComponent} from "./lesson-search-page/lesson-search-page.component";
import {MenuNavBarComponent} from "./menu-nav-bar/menu-nav-bar.component";
import {NgbDropdown, NgbDropdownMenu, NgbDropdownToggle} from '@ng-bootstrap/ng-bootstrap';
import {TestPage1Component} from './test-page1/test-page1.component';
import {NumberDisplayComponent} from './number-display/number-display.component';
import {NumberStepsComponent} from './number-steps/number-steps.component';
import {NumberEditComponent} from './number-edit/number-edit.component';

@Component({
    selector: 'app-root',
    standalone: true,
  imports: [RouterOutlet, TestPage1Component, LessonEditFormComponent, LessonSearchPageComponent, MenuNavBarComponent, NgbDropdown, NgbDropdownToggle, NgbDropdownMenu, RouterLink, NumberDisplayComponent, NumberStepsComponent, NumberEditComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'app';

    constructor() {
        console.log('AppComponent.constructor');
    }

    ngOnInit(): void {
        console.log('AppComponent.ngOnInit');
    }
    ngOnDestroy(): void {
        console.log('AppComponent.ngOnDestroy');
    }
}
