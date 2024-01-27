import { Component, OnInit } from '@angular/core';

import { Courses } from '../model/courses';
import { CoursesService } from '../services/courses.service';
import { Observable, first, tap } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit{

  courses: Observable<Courses[]>;

  displayedColumns = ['name','category'];

  constructor(private courseService: CoursesService){
    this.courses = this.courseService.list()
    .pipe(
      first()
    );
  }

  ngOnInit(): void {
  }


}
