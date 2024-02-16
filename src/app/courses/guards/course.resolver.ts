import { ResolveFn } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import { inject } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Courses } from '../model/courses';

export const courseResolver: ResolveFn<Observable<Courses>> = (route, state, service:CoursesService = inject(CoursesService)) => {
  if (route.params?.['id']) {
    return service.loadById(route.params['id']);
  }

  return of({ _id: '', name: '', category: '' });
};
