import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Courses } from '../../model/courses';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss'
})
export class CoursesListComponent implements OnInit {

  @Input() courses: Courses[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);

  readonly displayedColumns = ['name', 'category', 'actions'];

  constructor() { }

  ngOnInit(): void {
  }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(course:Courses){
    this.edit.emit(course);
  }

  onDelete(course: Courses) {
    this.delete.emit(course);
  }

}
