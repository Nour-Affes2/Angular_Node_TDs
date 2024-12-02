import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Router} from "@angular/router";
import {UserSettingsService} from '../user-settings.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faHome} from '@fortawesome/free-solid-svg-icons';

interface LessonPackage {
  title: string;
  description: string;
  category: string;
  level: number;
  prerequisite: string[];
  tags: string[];
  copyright: string;
}

@Component({
  selector: 'app-lesson-edit-form',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    FontAwesomeModule
  ],
  templateUrl: './lesson-edit-form.component.html'
})
export class LessonEditFormComponent implements OnInit, OnDestroy {

  lessonForm: FormGroup;

  constructor(private router: Router, private userSettingsService: UserSettingsService , private formBuilder: FormBuilder) {
    // Define form group and validations
    this.lessonForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: [''],
      level: [''],
      prerequisite: [''],
      tags: [''],
      copyright: ['']
    });
  }

  // model: LessonPackage = {
  //   title: '',
  //   description: '',
  //   category: '',
  //   level: 1,
  //   prerequisite: [],
  //   tags: [],
  //   copyright: ''
  // };

  // Form submission handler
  onClickSubmit() {
    if (this.lessonForm.invalid) {
      this.lessonForm.markAllAsTouched();
      console.log('Form is invalid. Please check the required fields.');
    } else {
      console.log('Form data submitted:', this.lessonForm.value);
    }
  }

  ngOnInit(): void {
    console.log("LessonListPageComponent.ngOnInit()");
  }
  ngOnDestroy(): void {
    console.log("LessonListPageComponent.ngOnDestroy()");
  }

  onClickLesson() {
    this.userSettingsService.lastLessonId = 1234;

    // could execute code (send save request to server)... then navigate
    this.router.navigate(['lesson-list']).then(res => {})
  }

  protected readonly faHome = faHome;
}
