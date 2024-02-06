import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { Courses } from '../model/courses';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Courses[]>;

  displayedColumns = ['name', 'category', 'actions'];

  constructor(
    private courseService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.courses$ = this.courseService.list()
      .pipe(
        catchError(error => {
          this.onError("Erro nessa porra")
          return of([])
        })
      );
  }

  onError(msg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: msg
    });
  }


  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }


  ngOnInit(): void {
  }


}
