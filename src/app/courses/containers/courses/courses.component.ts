import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import { catchError, Observable, of } from 'rxjs';

import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { Courses } from '../../model/courses';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Courses[]> | null = null;

  constructor(
    private courseService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
    this.refresh();
  }

  ngOnInit(): void {
  }

  onError(msg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: msg
    });
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }

  onEdit(course: Courses) {
    this.router.navigate(['edit', course._id], { relativeTo: this.route })
  }

  refresh() {
    this.courses$ = this.courseService.list()
      .pipe(
        catchError(error => {
          this.onError("Erro aqui")
          return of([])
        })
      );

  }

  onDelete(course: Courses) {
    this.courseService.delete(course._id).subscribe(
      () => {
        this.refresh()
        this.snackBar.open('Curso removido com sucesso!', 'X', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      },
      error=> this.onError('Erro ao tentar remover curso')
      );
  }

}
