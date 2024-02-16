import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent implements OnInit {

  form = this.formBuilder.group({
    name: [''],
    category: ['']
  });;

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location:Location) {}


  ngOnInit(): void {}


  onSubmit() {
    this.service.post(this.form.value).subscribe({
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
