import { Component, Input, OnInit } from '@angular/core';
import { Courses } from '../model/courses';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss'
})
export class CoursesListComponent implements OnInit{

   @Input() courses: Courses[] = [];

  readonly displayedColumns = ['name', 'category', 'actions'];

  constructor(private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }
}