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

  loadById(id:string){
    return this.httpClient.get<Courses>(`${this.API}/${id}`);
  }

  save(record: Partial<Courses>) {
    if(record._id){
      return this.update(record);
    }
   return this.create(record);
  }

  private create(record: Partial<Courses>){
    return this.httpClient.post<Courses>(this.API, record).pipe(first());
  }

  update(record: Partial<Courses>) {
    return this.httpClient.put<Courses>(`${this.API}/${record._id}`, record).pipe(first());
  }


}
