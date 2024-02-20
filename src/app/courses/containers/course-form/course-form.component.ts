import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { Courses } from '../../model/courses';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent implements OnInit {

  form = this.formBuilder.group({
    _id:[''],
    name: [''],
    category: ['']
  });

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location:Location,
    private route:ActivatedRoute) {}


  ngOnInit(): void {
    const course: Courses = this.route.snapshot.data['course'];
    this.form.setValue({
      _id:course._id,
      name: course.name,
      category: course.category
    });
  }


  onSubmit() {
    this.service.save(this.form.value).subscribe({
      next:(result) => this.onSucess(),
      error: (error) => this.onError(),
    })
  }

  onCancel() {
    this.location.back();
  }

  private onError(){
    this.snackBar.open('Erro ao salvar curso', '', { duration: 5000 });

  }

  private onSucess(){
    this.snackBar.open('Curso Salvo com sucesso!', '', { duration: 5000 });
    this.onCancel();
  }

}
