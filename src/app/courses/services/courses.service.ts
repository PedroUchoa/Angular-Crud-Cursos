import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Courses } from './../model/courses';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = 'api/courses';

  constructor(private httpClient: HttpClient) { }

  list(){
    return this.httpClient.get<Courses[]>(this.API);
  }

  post(record: Partial<Courses>){
    return this.httpClient.post<Courses>(this.API, record).pipe(first());
  }

}
