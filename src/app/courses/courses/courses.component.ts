import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';

import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { Courses } from '../model/courses';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit{

  courses$: Observable<Courses[]>;

  displayedColumns = ['name','category'];

  constructor(private courseService: CoursesService, public dialog: MatDialog){
    this.courses$ = this.courseService.list()
    .pipe(
     catchError(error =>{
      this.onError("Erro nessa porra")
      return of([])
     })
    );
  }

  onError(msg:string) {
    this.dialog.open(ErrorDialogComponent, {
      data: msg
    });
  }



  ngOnInit(): void {
  }


}
