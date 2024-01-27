import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Courses } from './../model/courses';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = '/assets/cursos.json';

  constructor(private httpClient: HttpClient) { }

  list(){
    return this.httpClient.get<Courses[]>(this.API);
  }
}
